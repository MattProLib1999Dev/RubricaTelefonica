import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { Request, Response, NextFunction } from 'express';
import { join } from 'node:path';

// Cartella contenente i file statici del browser (compilati da Angular)
const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Esempio di endpoint API REST.
 * Definire qui le rotte API prima della gestione del rendering Angular.
 */
app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    message: 'API Express perfettamente funzionante!',
    timestamp: new Date().toISOString()
  });
});

/**
 * Serve i file statici dalla cartella /browser (JS, CSS, Immagini)
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y', // Cache a lungo termine per file immutabili
    index: false,
    redirect: false,
  }),
);

/**
 * Gestisce tutte le altre richieste renderizzando l'applicazione Angular (SSR).
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  angularApp
    .handle(req)
    .then((response) => {
      // Se Angular genera una risposta, la scrive nella risposta Node, altrimenti passa oltre
      if (response) {
        return writeResponseToNodeResponse(response, res);
      }
      return next();
    })
    .catch(next);
});

/**
 * Avvia il server se questo modulo è il punto di ingresso principale o gestito da PM2.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT'] || 4000);

  app.listen(port, () => {
    console.log(`🚀 Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler utilizzato da Angular CLI o Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

import { tap } from 'rxjs';

export function Log(logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info') {
  return function (_target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const logger = (this as any).logger;

      const className = this.constructor.name;
      const methodName = propertyName;

      if (logger) {
        logger[logLevel](`[${className}::${methodName}] Called with:`, args);
      }

      try {
        const result = method.apply(this, args);

        // Gestione Promise
        if (result instanceof Promise) {
          return result
            .then((response) => {
              if (logger) {
                logger[logLevel](`[${className}::${methodName}] Promise resolved:`, response);
              }
              return response;
            })
            .catch((error) => {
              if (logger) {
                logger.error(`[${className}::${methodName}] Promise rejected:`, error);
              }
              throw error;
            });
        }

        // Gestione Observable
        if (result && typeof result.subscribe === 'function') {
          return result.pipe(
            tap({
              next: (data) => {
                if (logger) {
                  logger[logLevel](`[${className}::${methodName}] Observable next:`, data);
                }
              },
              error: (error) => {
                if (logger) {
                  logger.error(`[${className}::${methodName}] Observable error:`, error);
                }
              },
              complete: () => {
                if (logger) {
                  logger[logLevel](`[${className}::${methodName}] Observable completed`);
                }
              }
            })
          );
        }

        if (logger) {
          logger[logLevel](`[${className}::${methodName}] Synchronous result:`, result);
        }
        return result;

      } catch (error) {
        if (logger) {
          logger.error(`[${className}::${methodName}] Synchronous error:`, error as Error);
        }
        throw error;
      }
    };
  };
}

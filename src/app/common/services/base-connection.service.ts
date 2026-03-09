import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, defer, map, catchError, of } from 'rxjs';
import { QueryUtility } from '../utilities/queryUtility';
import { MessageService } from './message.service';
import { SpinnerService } from './spinner.service';
import { COMMON_CONFIG } from '@/common-config';
import { environment } from '@/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseConnectionService {

  constructor(private http: HttpClient) {
  }

  protected messageService = inject(MessageService);
  protected spinnerService = inject(SpinnerService);
  protected commonConfig = inject(COMMON_CONFIG);



  public errorDictionary: any = {};
  public unAuthorized: any = {};


  public get<T>(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean} = {spinner: true, headers: [], doLog: true}): Observable<T> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options ? !!options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      if (data)
        url += "?" + QueryUtility.ToQuery(data);

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");
      return this.http.get<T>(baseurl + url, { headers: head })
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            return of();
          })
        );
    });
  }



  public getError<T>(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean} = {spinner: true, headers: [], doLog: true}): Observable<T> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options ? !!options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      if (data)
        url += "?" + QueryUtility.ToQuery(data);

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");

      return this.http.get<T>(baseurl + url, { headers: head })
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            throw err;
          })
        );
    });
  }

  public getQuery<T>(url: string, data: any, options: {spinner?: boolean, headers?: string[], doLog?: boolean} = {spinner: true, headers: [], doLog: true}): Observable<T> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options ? !!options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      let query = QueryUtility.base64(data);
      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");

      return this.http.get<T>(baseurl + url + "?q=" + query.toString(), {headers: head})
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            return of();
          })
        );
    });
  }

  public post<T>(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean} = {spinner: true, headers: [], doLog: true}): Observable<T> {
    url = url.toLowerCase();

    return defer(() => {

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");

      const headers = options?.headers || [];
      const spinner = !!options ? !!options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      return this.http.post<T>(baseurl + url, data, { headers: head })
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            return of();
          })
        );
    });
  }

  public postError<T>(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean} = {spinner: true, headers: [], doLog: true}): Observable<T> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options && options.spinner != undefined ? options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      return this.http.post<T>(baseurl + url, data, { headers: head })
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            throw err;
          })
        );
    });
  }

  public put<T>(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean} = {spinner: true, headers: [], doLog: true}): Observable<T> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options ? !!options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");

      return this.http.put<T>(baseurl + url, data, {headers: head})
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            return of();
          })
        );
    });
  }

  public putError<T>(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean} = {spinner: true, headers: [], doLog: true}): Observable<T> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options && options.spinner != undefined ? options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      return this.http.put<T>(baseurl + url, data, { headers: head })
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            throw err;
          })
        );
    });
  }

  public delete<T>(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean} = {spinner: true, headers: [], doLog: true}): Observable<T> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options ? !!options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      if (data)
        url += "?" + QueryUtility.ToQuery(data);

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");

      return this.http.delete<T>(baseurl + url, {headers: head})
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            return of();
          })
        );
    });
  }

  public getFile(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean, skipError?: boolean} = {spinner: true, headers: [], doLog: true, skipError: false}): Observable<any> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options ? !!options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;
      const skipError = !!options && options.skipError != undefined ? options.skipError: true;


      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      if(skipError) {
        head = head.append("skip_error", "1");
      }

      if (data)
        url += "?" + QueryUtility.ToQuery(data);

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");
      return this.http.get(baseurl + url, { headers: head, responseType: 'blob' })
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            return of();
          })
        );
    });
  }

  public postFile(url: string, data: any | null = null, options: {spinner?: boolean, headers?: string[], doLog?: boolean, skipError?: boolean} = {spinner: true, headers: [], doLog: true, skipError: false}): Observable<any> {
    url = url.toLowerCase();

    return defer(() => {

      const headers = options?.headers || [];
      const spinner = !!options ? !!options.spinner : true;
      const doLog = !!options && options.doLog != undefined ? options.doLog: true;
      const skipError = !!options && options.skipError != undefined ? options.skipError: true;

      let head = new HttpHeaders();
      for (var i = 0; i < headers.length; i++) {
        let s = headers[i].split(':');
        head = head.append(s[0], s[1]);
      }

      if(spinner) {
        // this.spinnerService.incrementSpinner();
      } else {

        let noSpinner = SpinnerService.noSpinner().headers;

        head = head.append("sh_spinner", noSpinner.sh_spinner);
      }

      if(skipError) {
        head = head.append("skip_error", "1");
      }

      let baseurl = this.commonConfig.baseConfig.baseUrl.replace("http://", "//");
      return this.http.post(baseurl + url, data, { headers: head, responseType: 'blob' })
        .pipe(
          map(x => {
            // this.spinnerService.decrementSpinner();
            return x;
          }),
          catchError(err => {
            // this.spinnerService.decrementSpinner();
            if(doLog) {
              this.logError(err);
            }
            return of();
          })
        );
    });
  }

  public getAssets<T>(name: string): Observable<T> {
    // this.spinnerService.incrementSpinner();
    return this.http.get<T>(`assets/${name}`).pipe(
      map(x => {
        // this.spinnerService.decrementSpinner();
        return x;
      }),
      catchError(err => {
        // this.spinnerService.decrementSpinner();
        return of();
      })
    );
  }

  public downloadFile(filename: string, data: Blob) {
    let downloadLink = document.createElement('a');

    downloadLink.href = window.URL.createObjectURL(data);
    downloadLink.setAttribute('download', filename);
    //document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  private logError(err: HttpErrorResponse, url: string = '') {
    if (err && err.status)
      switch (err.status) {
        case 0:
          this.messageService.showMessage("", "Errore di rete");
          break;
        case 200:
          break;
        case 416:
          if (this.unAuthorized.message) {
            this.messageService.showMessage(environment.appname, this.unAuthorized.message);
          }
          // if (this.unAuthorized.message.url) {
          //   this.navigate(this.unAuthorized.url);
          // }
          break;
        default:
          if (err.error && err.error.textMessage) {
            var message = this.errorDictionary[err.error.textMessage];
            if (!message)
              message = err.error.textMessage;
              this.messageService.showMessage(environment.appname, message);
          } else {
            this.messageService.showMessage(environment.appname, err.message);
          }
          break;
      }
  }

}

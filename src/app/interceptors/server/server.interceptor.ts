import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {delay, Observable, of, throwError} from 'rxjs';
import {environment} from "../../environments/environment";
import {CrudHttpMethods} from "../../modules/enums/crud-http-methods.enum";
import {CrudErrorTexts} from "../../modules/enums/crud-error-texts.enum";
import {v4 as uuid} from 'uuid';

@Injectable()
export class ServerInterceptor implements HttpInterceptor {
  notes: any[] = [];

  constructor() {
    const localStorageNotes = localStorage.getItem('notes');
    if (localStorageNotes) {
      this.notes = JSON.parse(localStorageNotes);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const {url, method} = request;
    if (url.endsWith(environment.BASE_URL) && method === CrudHttpMethods.GET) {
      return this.getNotes();
    } else if (url.endsWith(environment.BASE_URL) && method === CrudHttpMethods.POST) {
      return this.addNot(request);
    } else {
      return throwError(() => this.generateCustomHttpErrorResponse(CrudErrorTexts.WRONG));
    }

    return next.handle(request);
  }

  private getNotes(): Observable<HttpResponse<any[]>> {
    if (!this.canThrowError()) {
      return of(new HttpResponse({status: 200, body: this.notes})).pipe(delay(300));
    }
    return throwError(() => this.generateCustomHttpErrorResponse(CrudErrorTexts.GET));
  }

  private addNot(request: any): Observable<HttpResponse<any[]>> {
    if (!this.canThrowError()) {
      const newNote = {...request.body, id: uuid()};
      this.notes.push(newNote);
      this.setNotesToLocalStorage(this.notes);
      return of(new HttpResponse({status: 200, body: newNote})).pipe(delay(300));
    }
    return throwError(() => this.generateCustomHttpErrorResponse(CrudErrorTexts.POST));
  }

  private setNotesToLocalStorage(notes: any[]): void {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  private generateCustomHttpErrorResponse(message: string) {
    return new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      error: {message}
    });
  }

  private canThrowError(): boolean {
    // this function throw an error for error demonstration purposes
    // return true; //you can open the line if you want to check the case of error
    return false;
  }
}

export const ServerProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ServerInterceptor,
  multi: true,
};

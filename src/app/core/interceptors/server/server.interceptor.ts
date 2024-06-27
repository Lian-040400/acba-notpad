import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {delay, Observable, of, throwError} from 'rxjs';
import {environment} from "../../../../environments/environment";
import {CrudHttpMethods} from "../../../modules/notes/enums/crud-http-methods.enum";
import {CrudErrorTexts} from "../../../modules/notes/enums/crud-error-texts.enum";
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
      return this.addNote(request);
    } else if (this.isNoteUrl(url) && method === CrudHttpMethods.PUT) {
      return this.editNote(request, url);
    } else if (this.isNoteUrl(url) && method === CrudHttpMethods.DELETE) {
      return this.deleteNote(url);
    } else {
      return throwError(() => this.generateCustomHttpErrorResponse(CrudErrorTexts.WRONG));
    }
  }

  private getNotes(): Observable<HttpResponse<any[]>> {
    if (!this.canThrowError()) {
      return of(new HttpResponse({status: 200, body: this.notes})).pipe(delay(300));
    }
    return throwError(() => this.generateCustomHttpErrorResponse(CrudErrorTexts.GET));
  }

  private addNote(request: any): Observable<HttpResponse<any[]>> {
    if (!this.canThrowError()) {
      const newNote = {...request.body, id: uuid()};
      this.notes.push(newNote);
      this.setNotesToLocalStorage(this.notes);
      return of(new HttpResponse({status: 200, body: newNote})).pipe(delay(300));
    }
    return throwError(() => this.generateCustomHttpErrorResponse(CrudErrorTexts.POST));
  }

  private editNote(request: any, url: string): Observable<HttpResponse<any>> {
    const id = this.getIdFromUrl(url);
    const index = this.findIndexById(this.notes, id);

    if (index !== -1) {
      this.notes[index] = {...request.body, date: this.notes[index].date, id};
      this.setNotesToLocalStorage(this.notes);
      return of(new HttpResponse({status: 200, body: this.notes[index]})).pipe(delay(300));
    }
    return throwError(() => this.generateCustomHttpErrorResponse(CrudErrorTexts.PUT))
  }

  private deleteNote(url: string) {
    const id = this.getIdFromUrl(url);
    const index = this.findIndexById(this.notes, id);

    if (index !== -1) {
      this.notes.splice(index, 1);
      this.setNotesToLocalStorage(this.notes);
      return of(new HttpResponse({status: 200, body: index})).pipe(delay(500));
    }
    return throwError(() => this.generateCustomHttpErrorResponse(CrudErrorTexts.DELETE))
  }

  private isNoteUrl(url: string): boolean {
    return url.includes(environment.BASE_URL) && !!this.getIdFromUrl(url);
  }

  private setNotesToLocalStorage(notes: any[]): void {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  private findIndexById(notes: any[], id: string) {
    return notes.findIndex((i: any) => i.id === id);
  }

  private generateCustomHttpErrorResponse(message: string) {
    return new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      error: {message}
    });
  }

  private getIdFromUrl(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 1]
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

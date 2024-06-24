import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {first, map, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Note} from "../../../models/note.model";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<any>(environment.BASE_URL, {observe: 'response'})
      .pipe(
        first(),
        map((response) => Note.transformCollection(response.body))
      );
  }

  addNote(note: any): Observable<Note> {
    return this.http.post(environment.BASE_URL, note, {observe: 'response'})
      .pipe(
        first(),
        map((response) => Note.transform(response.body))
      );
  }
}

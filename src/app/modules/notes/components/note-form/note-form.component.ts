import {Component, EventEmitter, Output} from '@angular/core';
import {NotesService} from "../../services/notes/notes.service";
import {Note} from "../../../models/note.model";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {
  @Output() addNewNote: EventEmitter<any> = new EventEmitter();
  constructor(private noteService: NotesService) {
}
  addNote() {
    const newNote = {name: 'New note', declaration: 'description description description ', date: (new Date().toString())};
    this.noteService.addNote(newNote).subscribe((response: Note) => {
      this.addNewNote.emit();
    });
  }

}

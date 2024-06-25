import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Note} from "../../../models/note.model";
import {NotesService} from "../../services/notes/notes.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() note!: Note;
  @Output() triggerEditedNote: EventEmitter<any> = new EventEmitter();
  @Output() triggerDeletedNoteId: EventEmitter<any> = new EventEmitter();
  hideEditModal = true;

  constructor(private noteService: NotesService) {
  }

  editNote(noteId: string): void {
    const editedNote = {name: 'Updated Note'};
    this.noteService.editNote(noteId, editedNote).subscribe((response) => {
      this.triggerEditedNote.emit(response);

    });
  }

  deleteNote(noteId: string): void {
    this.noteService.deleteNote(noteId).subscribe((response) => {
      this.triggerDeletedNoteId.emit(noteId);
    });
  }

  toggleEditModal() {
    this.hideEditModal = !this.hideEditModal;
  }
}

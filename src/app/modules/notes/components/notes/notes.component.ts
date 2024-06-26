import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes/notes.service";
import {Note} from "../../../../core/models/note.model";
import {DynamicChartDataService} from "../../../../core/services/dynamic-chart-data/dynamic-cart-data.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  hideConfirmationModal = true;

  constructor(
    private noteService: NotesService,
    private dynamicChartDataService: DynamicChartDataService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe((response) => {
      this.notes = response;
      this.dynamicChartDataService.notes = this.notes;
    });
  }

  editNote(editedNote: Note) {
    const index = this.notes.findIndex((note: Note) => note.id === editedNote.id);
    if (index !== -1) {
      this.notes[index] = editedNote;
    }
  }

  deleteNote(deletedNoteId: string): void {
    const index = this.notes.findIndex(note => note.id === deletedNoteId);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  closeConfirmationModal(): void {
    this.hideConfirmationModal = true;
  }

  openOfConfirmModal() {
    this.hideConfirmationModal = false;
  }
}

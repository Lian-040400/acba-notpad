import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes/notes.service";
import {Note} from "../../../../core/models/note.model";
import {DynamicChartDataService} from "../../../../core/services/dynamic-chart-data/dynamic-cart-data.service";
import {BehaviorSubject, debounceTime} from "rxjs";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  hideConfirmationModal = true;
  removingNoteId = '';
  visibleNotes: Note[] = [];
  searchInputValue = new BehaviorSubject('');
  removeSearchValue = false;

  constructor(
    private noteService: NotesService,
    private dynamicChartDataService: DynamicChartDataService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getSearchInputValue(value: string): void {
    this.searchInputValue.next(value);
    this.searchInputValue
      .pipe(debounceTime(500),
        untilDestroyed(this))
      .subscribe(value => {
        let inputValue = value.trim().toLowerCase();
        this.visibleNotes = this.notes.filter(note => (note.title.toLowerCase()).includes(inputValue) || (note.note.toLowerCase()).includes(inputValue))
        this.dynamicChartDataService.notes = this.visibleNotes;
        this.removeSearchValue = false;
      });
  }

  getNotes(): void {
    this.noteService.getNotes()
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        this.notes = response.reverse();
        this.visibleNotes = this.notes;
        this.dynamicChartDataService.notes = this.notes;
        this.removeSearchValue = true;
      });
  }

  editNote(editedNoteDetail: any) {
    this.noteService.editNote(editedNoteDetail.value, editedNoteDetail.id)
      .pipe(untilDestroyed(this))
      .subscribe(response => {
        console.log(response, 'resp')
        const index = this.notes.findIndex((note: Note) => note.id === editedNoteDetail.id);
        if (index !== -1) {
          this.notes[index] = response;
          this.visibleNotes = this.notes;
        }
      });
  }

  deleteNote(): void {
    this.noteService.deleteNote(this.removingNoteId)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
      const index = this.notes.findIndex(note => note.id === this.removingNoteId);
      if (index !== -1) {
        this.notes.splice(index, 1);
        this.dynamicChartDataService.notes = this.notes;
        this.visibleNotes = this.notes;
      }
    });
  }

  closeConfirmationModal(): void {
    this.hideConfirmationModal = true;
  }

  openOfConfirmModal(noteId: string) {
    this.removingNoteId = noteId;
    this.hideConfirmationModal = false;
  }
}

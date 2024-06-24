import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes/notes.service";
import {Note} from "../../../models/note.model";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NotesService) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe((response) => {
      this.notes = response;
    });
  }
}

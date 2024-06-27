import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotesService} from "../../services/notes/notes.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  @Output() addNewNote: EventEmitter<any> = new EventEmitter()
  noteForm!: FormGroup;

  constructor(
    private noteService: NotesService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.noteFormInitialisation();
  }

  noteFormInitialisation(): void {
    this.noteForm = this.formBuilder.group({
      title: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      note: this.formBuilder.control('', [
        Validators.required,
      ]),
    });
  }

  addNote(): void {
    if (this.noteForm.valid) {
      let date = new Date();
      date.setSeconds(0)
      let newNote = {...this.noteForm.value, date: date.toString()}
      this.noteService.addNote(newNote).subscribe(() => {
        this.addNewNote.emit();
        this.noteForm.reset();
      });
    } else {
      this.noteForm.markAllAsTouched();
    }
  }
}

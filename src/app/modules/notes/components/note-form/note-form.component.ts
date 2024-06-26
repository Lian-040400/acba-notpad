import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NotesService} from "../../services/notes/notes.service";
import {Note} from "../../../../core/models/note.model";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  addNote() {
    let date = new Date();
    date.setSeconds(0)
    let c = {...this.noteForm.value, date: date.toString()}
    this.noteService.addNote(c).subscribe((response: Note) => {
      this.addNewNote.emit();
    });
  }

  checkForErrorsIn(formControl: AbstractControl): string {
    console.log(formControl)
    if (formControl.hasError('required')) {
      return 'Min value is required'
    }

    if (formControl.hasError('min') || formControl.hasError('max')) {
      return 'Value must be between 0 and 255';
    }
    return ''
  }

}

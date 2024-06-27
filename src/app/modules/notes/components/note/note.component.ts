import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../../../../core/models/note.model";
import {NotesService} from "../../services/notes/notes.service";
import {Validators, FormBuilder, FormGroup,} from "@angular/forms";
import {Subscription} from "rxjs";
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note!: Note;
  @Output() triggerEditedNote: EventEmitter<any> = new EventEmitter();
  @Output() triggerDeletedNoteId: EventEmitter<any> = new EventEmitter();
  @Output() openOfConfirmModal: EventEmitter<any> = new EventEmitter();
  noteEditFormInitialValues: any;
  formChanged: boolean = false;
  noteEditFormValueChangesSubscription!: Subscription;
  noteEditForm!: FormGroup;
  hideEditModal = true;

  constructor(
    private noteService: NotesService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.noteFormInitialisation();
  }

  noteFormInitialisation(): void {
    this.noteEditForm = this.formBuilder.group({
      title: this.formBuilder.control(this.note.title, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      note: this.formBuilder.control(this.note.note, [
        Validators.required,
      ]),
    });

    this.noteEditFormInitialValues = this.noteEditForm.value;

    this.noteEditFormValueChangesSubscription = this.noteEditForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(values => {
        this.formChanged = !this.areFormValuesChanged(this.noteEditFormInitialValues, values);
      });
  }

  areFormValuesChanged(initialValues: any, currentValues: any): boolean {
    return JSON.stringify(initialValues) === JSON.stringify(currentValues);
  }

  editNote(): void {
    this.toggleEditModal();
    if (!this.formChanged) {
      return
    }
    this.triggerEditedNote.emit({value: this.noteEditForm.value, id: this.note.id});
  }

  deleteNote(): void {
    this.openOfConfirmModal.emit(this.note.id);
  }

  toggleEditModal() {
    this.hideEditModal = !this.hideEditModal;
    if (!this.hideEditModal) {
      this.noteFormInitialisation();
    }
  }
}

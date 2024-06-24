import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './components/notes/notes.component';
import {HeaderModule} from "../header/header.module";
import {SearchModule} from "../search/search.module";
import { NoteComponent } from './components/note/note.component';
import { NoteFormComponent } from './components/note-form/note-form.component';


@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    NoteFormComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    HeaderModule,
    SearchModule
  ]
})
export class NotesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'notes',
    loadChildren: () => import('./modules/notes/notes.module').then(mod => mod.NotesModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'notes',
  },
  { path: '**', redirectTo: 'notes' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

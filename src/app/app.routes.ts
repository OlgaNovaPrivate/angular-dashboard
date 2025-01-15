import { Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { TodosComponent } from './todos/todos.component';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent, data: { tabIndex: 0 } },
  { path: 'todos', component: TodosComponent, data: { tabIndex: 1 } },
  { path: 'notes', component: NotesComponent, data: { tabIndex: 2 } },
];

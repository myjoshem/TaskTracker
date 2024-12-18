import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./tasks/tasks.component').then((m) => m.TasksComponent),
  },
  {
    path: 'task/new',
    loadComponent: () =>
      import('./task-form/task-form.component').then(
        (m) => m.TaskFormComponent
      ),
  },
  {
    path: 'task/edit/:id',
    loadComponent: () =>
      import('./task-form/task-form.component').then(
        (m) => m.TaskFormComponent
      ),
  },
  { path: '**', redirectTo: '/tasks' }, // Wildcard route for unmatched paths
];

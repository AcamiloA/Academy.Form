import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student/list/student-list/student-list.component';
import { StudentEditComponent } from './components/student/edit/student-edit/student-edit.component';
import { StudentViewComponent } from './components/student/view/student-view/student-view.component';

export const routes: Routes = [
    {path: '', redirectTo: 'ListaEstudiantes', pathMatch: 'full'},
    {path: 'ListaEstudiantes', component: StudentListComponent},
    {path: 'AgregarEstudiante', component: StudentEditComponent},
    {path: 'VerEstudiante/:id', component: StudentViewComponent},
    {path: 'EditarEstudiante/:id', component: StudentEditComponent},
    {path: '**', redirectTo: 'ListaEstudiantes', pathMatch: 'full'},

];

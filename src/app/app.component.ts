import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


//Components
import { StudentListComponent } from "./components/student/list/student-list/student-list.component";
import { StudentEditComponent } from './components/student/edit/student-edit/student-edit.component';
import { StudentViewComponent } from './components/student/view/student-view/student-view.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        StudentListComponent,
        StudentEditComponent,
        StudentViewComponent
    ]
})
export class AppComponent {
  title = 'Academy.Form';
}

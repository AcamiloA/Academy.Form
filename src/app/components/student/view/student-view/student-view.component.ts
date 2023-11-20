import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { Student } from '../../../../interfases/student';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-view',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.css'
})
export class StudentViewComponent {
  id!: number;
  student!: Student;
  loading: boolean = false;

  routeSub!: Subscription;

  constructor(private _studentService: StudentService,
    private aRoute: ActivatedRoute) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getStudentById();
  }

  getStudentById() {
    this.loading = true;
    this._studentService.getStudentById(this.id).subscribe(data => {
      this.student = data;
      this.loading = false;
    })
  }
}

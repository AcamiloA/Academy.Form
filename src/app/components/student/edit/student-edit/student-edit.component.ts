import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../services/student.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Student } from '../../../../interfases/student';
import { SharedModule } from '../../../../shared/shared.module';
import { generateKey } from 'crypto';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [
    CommonModule,   
    SharedModule,
    RouterModule
   ],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})

export class StudentEditComponent implements OnInit {
  loading: boolean = false;
  form : FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
              private _studentService: StudentService,
              private router: Router,
              private aRoute: ActivatedRoute) 
  {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      career: ['', Validators.required],
    })

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0) {
      this.operacion = 'Editar';
      this.getStudentById(this.id)
    }
  }

  getStudentById(id: number) {
    this.loading = true;
    this._studentService.getStudentById(id).subscribe(data => {
      this.form.setValue({
        firstname: data.firstName,
        lastname: data.lastName,
        age: data.age,
        career: data.career,
      })
      this.loading = false;
    })
  }

  AddOrEditStudent() {
    const student: Student = {
      username : "",
      firstName: this.form.value.firstname,
      lastName: this.form.value.lastname,
      age: this.form.value.age,
      career: this.form.value.career
    }

    if(this.id != 0) {
      student.Id = this.id;
      this.editStudent(this.id, student);
    } else {
      this.addStudent(student);
    }
  }

  editStudent(id: number, student: Student) {
    this.loading = true;
    this._studentService.updateStudent(id, student).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/ListaEstudiantes']);
    })
  }

  addStudent(student: Student) {
      this._studentService.addStudent(student).subscribe();
      this.router.navigate(['/ListaEstudiantes']);
  }
}

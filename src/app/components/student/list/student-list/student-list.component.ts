import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../../../interfases/student';
import { SharedModule } from '../../../../shared/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,   
    SharedModule,
    RouterModule
  ],
  providers:[HttpClient],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit, AfterViewInit {

  constructor(private _studentService: StudentService,
              private _snackBar: MatSnackBar){}
  loading: boolean = false;
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getListStudent();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Items por página'
  }
  displayedColumns: string[] = ['id','username', 'firstName', 'lastName', 'age', 'career', 'actions'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListStudent(){
    this.loading = true;
    this._studentService.getStudents().subscribe(_ => {
      this.loading = false;
      this.dataSource.data = _;
    });
  }

  deleteStudent(id: number) {
    this.loading = true;

    this._studentService.deleteStudent(id).subscribe(() => {
     this.mensajeExito();
     this.loading = false;
     this.getListStudent();
    });    
  }
  
  mensajeExito() {
    this._snackBar.open('el estudiante fue eliminado con exito','', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interfases/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private RouteWebApi: string = "https://localhost:7091/";
  private RouteMethod: string = "api/Student/";

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.RouteWebApi}${this.RouteMethod}`)
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.RouteWebApi}${this.RouteMethod}${id}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.RouteWebApi}${this.RouteMethod}`, student);
  }

  updateStudent(id: number, student: Student): Observable<void> {
    return this.http.put<void>(`${this.RouteWebApi}${this.RouteMethod}${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.RouteWebApi}${this.RouteMethod}${id}`);
  }
}

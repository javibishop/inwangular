import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, 


export interface Student {
  //$key: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: Number;
}
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  studentsRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFireObject<Student>;   // Reference to Student object, its an Observable too  

  constructor(private db: AngularFireDatabase) {
    this.listarDatos();
  }

  listarDatos() {
    this.studentsRef = this.db.list('students');
    return this.studentsRef.valueChanges();
} 
// https://medium.com/@ahsanalisiddique878/angular-10-crud-with-firebase-realtime-database-6ad8ba9eb5f5


  GetStudent(id: string) {
    this.studentRef = this.db.object('students-list/' + id);
    return this.studentRef;
  }
  UpdateStudent(student: Student) {
    this.studentRef.update({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    this.studentRef = this.db.object('students-list/'+id);
    this.studentRef.remove();
  }

  AddStudent(student: Student) {
    
    this.studentsRef.push({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      mobileNumber: student.mobileNumber
    });
  }
}

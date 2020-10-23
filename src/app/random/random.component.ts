import { Component, OnInit } from '@angular/core';
import { RandomService } from '../service/random.service';
import { FirebaseService } from '../usuarios/firebase.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
  // providers: [RandomService]
})
export class RandomComponent implements OnInit {
  students : any [];
  constructor( public randomService: RandomService, private firebaseService: FirebaseService) {  }

  ngOnInit() {
     this.firebaseService.listarDatos().subscribe(r => { 
      this.students = r;
    });
  }

  adduser(){
    let student = {firstName: 'karmona', lastName: 'perez', email: 'jjjj@mail.com', mobileNumber:88888};
    this.firebaseService.AddStudent(student);
  }

  
}

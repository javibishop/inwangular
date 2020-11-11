import { Component, inject, Inject, OnInit } from '@angular/core';
import { configDataServiceProvider, CONFIG_TOKEN, DatosConfiguracion } from '../config';
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
  random:string;
  tokens:any;
  constructor(private randomService: RandomService, private firebaseService: FirebaseService,
    @Inject(CONFIG_TOKEN) private token: DatosConfiguracion) {  }

  ngOnInit() {
     this.firebaseService.listarDatos().subscribe(r => { 
      this.students = r;
    });
    this.tokens = this.token;
    this.random = this.randomService.random;
  }

  adduser(){
    let student = {firstName: 'karmona', lastName: 'perez', email: 'jjjj@mail.com', mobileNumber:88888};
    this.firebaseService.AddStudent(student);
  }

  
}

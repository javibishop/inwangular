import { Component, OnInit } from '@angular/core';
import { RandomService } from '../service/random.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css'],
  providers: [RandomService]
})
export class RandomComponent implements OnInit {

  constructor( public randomService: RandomService) {  }

  ngOnInit() {
  }

}

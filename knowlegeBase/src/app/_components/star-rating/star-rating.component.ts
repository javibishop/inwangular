import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() rating: number;
  @Input() itemId: number;
  @Input() readOnly: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      id: this.itemId,
      rating: rating
    });
  }

}

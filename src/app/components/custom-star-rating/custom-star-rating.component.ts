import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-star-rating',
  templateUrl: './custom-star-rating.component.html',
  styleUrls: ['./custom-star-rating.component.scss']
})
export class CustomStarRatingComponent implements OnInit {
  ratings = [0, 1, 2];
  @Input('rating') givenrating: number = 0;
  @Output() private onRatingChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectStart(rating: number) {
    this.onRatingChange.emit(rating);
    return false;
  }
}

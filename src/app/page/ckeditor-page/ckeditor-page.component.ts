import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-ckeditor-page',
  templateUrl: './ckeditor-page.component.html',
  styleUrls: ['./ckeditor-page.component.scss']
})
export class CkeditorPageComponent implements OnInit {
  @ViewChild('ckeditortable') ckeditortable: any;
  systemRatingForm: any;
  wallRatingForm: any;
  AllSystemRatings: any[] = [];
  AllWallRatings: any[] = [];
  ckeditorContent: any = "";
  AllCombineRatings: any[] = [];
  webUrl = environment.webUrl;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.systemRatingForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Rating: [1, []]
    });
    this.wallRatingForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Rating: [1, []]
    });
  }

  onSystemRatingChanged(rating: number) {
    this.systemRatingForm.value.Rating = rating;
  }

  onWallRatingChanged(rating: number) {
    this.wallRatingForm.value.Rating = rating;
  }


  prepareArray(Rating: any) {
    return Array(Rating).fill(1)
  }

  AddSystemRating() {
    const objRating = {
      id: this.AllSystemRatings.length + 1,
      Name: this.systemRatingForm.value.Name,
      Rating: this.systemRatingForm.value.Rating,
      RatingArray: this.prepareArray(this.systemRatingForm.value.Rating),
    };
    const existRating = this.AllSystemRatings.find(x => x.Name == objRating.Name);
    if (!existRating) {
      this.AllSystemRatings.push(objRating)
    } else {
      existRating.Rating = objRating.Rating;
      existRating.RatingArray = objRating.RatingArray;
    }

    this.systemRatingForm.reset();
  }

  AddWallRating() {
    const objRating = {
      id: this.AllWallRatings.length + 1,
      Name: this.wallRatingForm.value.Name,
      Rating: this.wallRatingForm.value.Rating,
      RatingArray: this.prepareArray(this.wallRatingForm.value.Rating),
    };
    const existRating = this.AllWallRatings.find(x => x.Name == objRating.Name);
    if (!existRating) {
      this.AllWallRatings.push(objRating)
    } else {
      existRating.Rating = objRating.Rating;
      existRating.RatingArray = objRating.RatingArray;
    }
    this.wallRatingForm.reset();
  }

  AddtoCkEditor() {
    this.AllCombineRatings = [];
    const len = this.AllSystemRatings.length > this.AllWallRatings.length ? this.AllSystemRatings.length : this.AllWallRatings.length;
    for (let index = 0; index < len; index++) {
      var obj = {
        sys_name: this.AllSystemRatings[index]?.Name || "",
        sys_Ratting: this.AllSystemRatings[index]?.RatingArray || [],
        wall_name: this.AllWallRatings[index]?.Name || "",
        wall_Ratting: this.AllWallRatings[index]?.RatingArray || [],
      }
      this.AllCombineRatings.push(obj);
    }
    console.log(this.AllCombineRatings)
    // this.AllCombineRatings = [...this.AllSystemRatings, ...this.AllWallRatings];
    setTimeout(() => {
      this.ckeditorContent = this.ckeditortable.nativeElement.innerHTML;
    });
  }

}

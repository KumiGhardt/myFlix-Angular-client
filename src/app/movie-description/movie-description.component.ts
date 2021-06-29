import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class MovieDescriptionComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
      director: string;
      genre: string;
    }
  ) {}

  ngOnInit(): void {
  }

}

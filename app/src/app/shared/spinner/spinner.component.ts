import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  public dots: number[] = new Array(12);

  constructor() {
  }

  ngOnInit() {
  }

}

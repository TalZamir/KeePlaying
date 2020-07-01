import {Component, OnInit} from '@angular/core';
import {AppDispatcher} from './ngrx/app-dispatchers';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private appDispatcher: AppDispatcher, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.appDispatcher.loadPlaylistFromStorage();
  }

}

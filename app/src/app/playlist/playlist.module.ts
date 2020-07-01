import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {PlaylistComponent} from './playlist.component';

@NgModule({
  declarations: [PlaylistComponent],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule.forRoot()
  ]
})
export class PlaylistModule { }

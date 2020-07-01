import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { SongPreviewComponent } from './song-preview/song-preview.component';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {SpinnerModule} from '../shared/spinner/spinner.module';

@NgModule({
  declarations: [LibraryComponent, SongPreviewComponent],
    imports: [
        CommonModule,
        NgxYoutubePlayerModule.forRoot(),
        SpinnerModule

    ]
})
export class LibraryModule { }

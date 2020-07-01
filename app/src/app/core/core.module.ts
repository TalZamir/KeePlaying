import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { CarouselComponent } from './carousel/carousel.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { PlaylistOverlayComponent } from './playlist-overlay/playlist-overlay.component';
import { BackgroundComponent } from './background/background.component';

@NgModule({
  declarations: [NavComponent, CarouselComponent, PlaylistOverlayComponent, BackgroundComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
    exports: [NavComponent, CarouselComponent, PlaylistOverlayComponent, BackgroundComponent]
})
export class CoreModule { }

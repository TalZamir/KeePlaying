import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LibraryComponent} from './library/library.component';
import {LIBRARY_TYPE} from './shared/enums/LIBRARY_TYPE';
import {PlaylistComponent} from './playlist/playlist.component';
import {HomepageComponent} from './homepage/homepage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'playlist', component: PlaylistComponent},
  {path: '70s', component: LibraryComponent, data: {type: LIBRARY_TYPE.YEARS70}},
  {path: '80s', component: LibraryComponent, data: {type: LIBRARY_TYPE.YEARS80}},
  {path: '90s', component: LibraryComponent, data: {type: LIBRARY_TYPE.YEARS90}},
  {path: '00s', component: LibraryComponent, data: {type: LIBRARY_TYPE.YEARS00}},
  {path: '10s', component: LibraryComponent, data: {type: LIBRARY_TYPE.YEARS10}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

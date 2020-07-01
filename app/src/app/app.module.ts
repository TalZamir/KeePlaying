import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {LibraryModule} from './library/library.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {PlaylistComponent} from './playlist/playlist.component';
import {PlaylistModule} from './playlist/playlist.module';
import {HomepageComponent} from './homepage/homepage.component';
import {HomepageModule} from './homepage/homepage.module';
import {StoreModule} from '@ngrx/store';
import {AppReducers} from './ngrx/app-reducers';
import {AppSelector} from './ngrx/app-selectors';
import {AppDispatcher} from './ngrx/app-dispatchers';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './ngrx/app-effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LibraryModule,
    PlaylistModule,
    HomepageModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('KeePlaying', AppReducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AppEffects])
  ],
  providers: [
    AppSelector,
    AppDispatcher,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

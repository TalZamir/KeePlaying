import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as AppActions from './app-actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AppDispatcher} from './app-dispatchers';
import {SongsApiService} from './services/songs-api.service';
import {of} from 'rxjs';

@Injectable()
export class AppEffects {

  constructor(private store: Store,
              private actions$: Actions,
              private songsApiService: SongsApiService,
              private appDispatcher: AppDispatcher) {
  }

  @Effect()
  fetchSongsLibrary$ = this.actions$.pipe(ofType(AppActions.fetchSongsLibrary))
    .pipe(mergeMap(requestData => {
      this.appDispatcher.requestStarted();
      return this.songsApiService.fetchSongsByLibraryType(requestData.libraryType)
        .pipe(map(res => {
            this.appDispatcher.setSongsLibrary(requestData.libraryType, res);
            return AppActions.requestEnded({});
          }),
          catchError(error => {
            return of(AppActions.requestEnded({}));
          })
        );
    }));

}

import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as AppActions from './app-actions';
import {Song} from '../shared/models/song';
import {LIBRARY_TYPE} from '../shared/enums/LIBRARY_TYPE';


@Injectable()
export class AppDispatcher {
  constructor(private store: Store) {
  }

  fetchSongsLibrary(libraryType: LIBRARY_TYPE) {
    this.store.dispatch(AppActions.fetchSongsLibrary({libraryType}));
  }

  setSongsLibrary(libraryType: LIBRARY_TYPE, songs: Song[]) {
    this.store.dispatch(AppActions.setSongsLibrary({libraryType, songs}));
  }

  playPreviewSong(song: Song) {
    this.store.dispatch(AppActions.playPreviewSong({song}));
  }

  changeLibrary(libraryType: LIBRARY_TYPE) {
    this.store.dispatch(AppActions.changeLibraryType({libraryType}));
  }

  addSongsToPlaylist(songs: Song[]) {
    this.store.dispatch(AppActions.addSongsToPlaylist({songs}));
  }

  removeSongFromPlaylist(song) {
    this.store.dispatch(AppActions.removeSongFromPlaylist({song}));
  }

  addLibraryToPlaylist(libraryType: LIBRARY_TYPE) {
    this.store.dispatch(AppActions.requestAddLibraryToPlaylist({libraryType}));
  }

  clearAddLibraryRequest() {
    this.store.dispatch(AppActions.clearAddLibraryRequest({}));
  }

  loadPlaylistFromStorage() {
    this.store.dispatch(AppActions.loadPlaylistFromStorage({}));
  }

  requestStarted() {
    this.store.dispatch(AppActions.requestStarted({}));
  }

  requestEnded() {
    this.store.dispatch(AppActions.requestEnded({}));
  }
}

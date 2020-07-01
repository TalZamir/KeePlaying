import {Store} from '@ngrx/store';
import {addLibraryToPlaylistRequest, getActiveLibrary, getActiveSong, getLibraries, getPlaylist, isBusy} from './app-reducers';
import {Injectable} from '@angular/core';
import {LIBRARY_TYPE} from '../shared/enums/LIBRARY_TYPE';

@Injectable()
export class AppSelector {
  constructor(private store: Store) {
  }

  getLibraries() {
    return this.store.select(getLibraries());
  }

  getActivePreviewSong() {
    return this.store.select(getActiveSong());
  }

  getActiveLibrary() {
    return this.store.select(getActiveLibrary());
  }

  getPlaylist() {
    return this.store.select(getPlaylist());
  }

  addLibraryToPlaylistRequest() {
    return this.store.select(addLibraryToPlaylistRequest());
  }

  isBusy() {
    return this.store.select(isBusy());
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Song} from '../shared/models/song';
import {ActivatedRoute} from '@angular/router';
import {LIBRARY_TYPE} from '../shared/enums/LIBRARY_TYPE';
import {AppSelector} from '../ngrx/app-selectors';
import {AppDispatcher} from '../ngrx/app-dispatchers';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {

  public libraryType: LIBRARY_TYPE;
  public songs: { song: Song, inPlaylist: boolean }[] = [];
  public playlist: Map<string, Song>;
  public isBusy: boolean;
  private subs: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private appSelector: AppSelector,
              private appDispatcher: AppDispatcher) {
  }

  ngOnInit() {
    this.libraryType = this.route.snapshot.data.type;
    this.appDispatcher.fetchSongsLibrary(this.libraryType);
    this.getPlaylist();
    this.getAppBusyStatus();
    this.registerToLibraryAddRequest();
    this.getMusic(this.libraryType);
    this.appDispatcher.changeLibrary(this.libraryType);
  }

  getAppBusyStatus() {
    this.subs.push(this.appSelector.isBusy().subscribe(isBusy => {
      this.isBusy = isBusy;
    }));
  }

  getPlaylist() {
    this.subs.push(this.appSelector.getPlaylist().subscribe(playlist => this.playlist = playlist));
  }

  registerToLibraryAddRequest() {
    this.subs.push(this.appSelector.addLibraryToPlaylistRequest().subscribe(libraryType => {
      if (this.libraryType === libraryType) {
        this.appDispatcher.addSongsToPlaylist(this.songs.map(songData => songData.song));
        this.songs.forEach(song => song.inPlaylist = true);
        this.appDispatcher.clearAddLibraryRequest();
      }
    }));
  }

  getMusic(libraryType: LIBRARY_TYPE) {
    this.subs.push(this.appSelector.getLibraries().subscribe(libraries => {
      let songs = libraries.get(this.libraryType);
      songs = songs ? songs : [];
      this.buildSongsList(songs);
    }));
  }

  buildSongsList(songs: Song[]) {
    songs.forEach(songData => {
      const songExistsInPlaylist: boolean = !!this.playlist.get(songData.id);
      this.songs.push({song: songData, inPlaylist: songExistsInPlaylist});
    });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.forEach(sub => sub.unsubscribe());
    }
    this.appDispatcher.changeLibrary(null);
  }

}

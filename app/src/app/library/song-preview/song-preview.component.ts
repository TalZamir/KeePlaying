import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Song} from '../../shared/models/song';
import {Subscription} from 'rxjs';
import {AppSelector} from '../../ngrx/app-selectors';
import {AppDispatcher} from '../../ngrx/app-dispatchers';

@Component({
  selector: 'app-song-preview',
  templateUrl: './song-preview.component.html',
  styleUrls: ['./song-preview.component.scss']
})
export class SongPreviewComponent implements OnInit, OnDestroy {

  private playListener: Subscription;

  public readonly PLAYER_VARS: YT.PlayerVars = {rel: 0, autohide: 1, controls: 0, showinfo: 0, fs: 0, playsinline: 1};
  @Input() public song: Song;
  @Input() public inPlaylist: boolean;
  public player;
  public status;
  public played: boolean;
  public nowPlaying: boolean;
  private subs: Subscription[] = [];

  constructor(private appSelector: AppSelector,
              private appDispatcher: AppDispatcher) {
  }

  ngOnInit() {
    this.registerToEvents();
  }

  registerToEvents() {
    this.subs.push(this.appSelector.getActivePreviewSong().subscribe(song => {
      if (song && song.id !== this.song.id) {
        this.pauseVideo();
        this.nowPlaying = false;
      }
    }));
  }

  savePlayer(event) {
    this.player = event;
    this.playVideo();
  }

  onStateChange(event) {
    this.status = event.data;
  }

  onPlayerButtonClicked() {
    if (this.status === 1) {
      this.pauseVideo();
    } else {
      this.status = 3;
      this.played = true;
      this.playVideo();
    }
  }

  onPlaylistButtonClicked() {
    if (this.inPlaylist) {
      this.appDispatcher.removeSongFromPlaylist(this.song);
    } else {
      this.appDispatcher.addSongsToPlaylist([this.song]);
    }
    this.inPlaylist = !this.inPlaylist;
  }

  playVideo() {
    this.nowPlaying = true;
    if (this.player) {
      this.player.playVideo();
    }
    this.appDispatcher.playPreviewSong(this.song);
  }

  pauseVideo() {
    this.nowPlaying = false;
    if (this.player) {
      this.player.pauseVideo();
    }
  }

  getPlayerIcon(): string {
    let result: string;
    switch (this.status) {
      case 1:
        result = 'pause_circle_outline';
        break;
      case 3:
        result = 'data_usage';
        break;
      default:
        result = 'play_circle_outline';
        break;
    }
    return result;
  }

  getPlaylistIcon(): string {
    let result: string;
    if (this.inPlaylist) {
      result = 'remove_circle_outline';
    } else {
      result = 'add_circle_outline';
    }
    return result;
  }

  ngOnDestroy(): void {
    if (this.playListener) {
      this.playListener.unsubscribe();
    }
    if (this.subs) {
      this.subs.forEach(sub => sub.unsubscribe());
    }
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Song} from '../shared/models/song';
import {AppSelector} from '../ngrx/app-selectors';
import {Subscription} from 'rxjs';
import {AppDispatcher} from '../ngrx/app-dispatchers';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {

  public readonly playerVars: YT.PlayerVars = {rel: 0, autohide: 1, controls: 2, showinfo: 0, fs: 0, playsinline: 1};
  public playlist: Song[] = [];
  public shuffledList: Song[] = [];
  public selectedSong: Song;
  public player: YT.Player;
  public status;
  public shuffleOn = false;
  private subs: Subscription[] = [];

  constructor(private appSelector: AppSelector, private appDispatcher: AppDispatcher) {
  }

  ngOnInit() {
    this.getPlaylist();
  }

  getPlaylist() {
    this.subs.push(this.appSelector.getPlaylist().subscribe(playlist => this.updatePlaylist(playlist)));
  }

  updatePlaylist(playlist: Map<string, Song>) {
    if (playlist && playlist.size > 0) {
      this.playlist = Array.from(playlist.values());
      this.selectedSong = this.playlist[0];
      this.shuffle();
    } else {
      this.playlist = [];
      this.selectedSong = new Song(null, null, null);
    }
  }

  savePlayer(event) {
    this.player = event;
  }

  onStateChange(event) {
    this.status = event.data;
    if (this.status === YT.PlayerState.ENDED) {
      this.onSongEnded();
    }
  }

  onSongClicked(song: Song, shuffle = false) {
    this.selectedSong = song;
    this.player.loadVideoById(this.selectedSong.id);
    if (this.shuffleOn && shuffle) {
      this.shuffle();
    }
  }

  onSongEnded() {
    const nextSongIndex = this.getNextSongIndex();
    this.onSongClicked(nextSongIndex);
  }

  onShuffleClicked() {
    this.shuffleOn = !this.shuffleOn;
    if (this.shuffleOn) {
      this.shuffle();
    }
  }

  getNextSongIndex(): Song {
    const playlist = this.shuffleOn ? this.shuffledList : this.playlist;
    const index = playlist.indexOf(this.selectedSong);
    let songIndex = 0;
    if (index >= 0 && index + 1 < playlist.length) {
      songIndex = index + 1;
    }
    return playlist[songIndex];
  }

  getPlayerIconToShow(): string {
    let result = 'play_arrow';
    if (this.player && this.status === YT.PlayerState.PLAYING) {
      result = 'pause';
    }
    return result;
  }

  playPauseSong() {
    if (this.status === YT.PlayerState.PLAYING) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  }

  playVideo() {
    if (this.player) {
      this.player.playVideo();
    }
  }

  pauseVideo() {
    if (this.player) {
      this.player.pauseVideo();
    }
  }

  nextPreviousVideo(nextVideo: boolean) {
    const playlist = this.shuffleOn ? this.shuffledList : this.playlist;
    const currentIndex: number = playlist.indexOf(this.selectedSong);
    const playlistLength = playlist.length;
    if (currentIndex >= 0) {
      let indexToPlay: number = nextVideo ? currentIndex + 1 : currentIndex - 1;
      if (indexToPlay < 0) {
        indexToPlay = playlistLength - 1;
      } else if (indexToPlay >= playlistLength) {
        indexToPlay = 0;
      }
      this.onSongClicked(playlist[indexToPlay]);
    }
  }

  removeSong(event, index) {
    this.appDispatcher.removeSongFromPlaylist(this.playlist[index]);
    event.stopPropagation();
  }

  shuffle() {
    const result: Song[] = [...this.playlist];
    for (let i = 0; i < result.length; i++) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const savedItem = result[i];
      result[i] = result[randomIndex];
      result[randomIndex] = savedItem;
    }
    this.shuffledList = result;
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.forEach(sub => sub.unsubscribe());
    }
  }

}

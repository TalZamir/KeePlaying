import {Injectable} from '@angular/core';
import {Song} from '../../shared/models/song';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor() {
  }

  public static addSongsToPlaylist(playlist: Map<string, Song>, songs: Song[]) {
    if (playlist && songs) {
      songs.forEach(song => playlist.set(song.id, song));
      this.saveChanges(playlist);
    }
  }

  public static removeSongFromPlaylist(playlist: Map<string, Song>, songId: string) {
    if (playlist) {
      playlist.delete(songId);
      this.saveChanges(playlist);
    }
  }

  public static saveChanges(playlist: Map<string, Song>) {
    localStorage.setItem('playlist', JSON.stringify(Array.from(playlist)));
  }

  public static loadLocalStoragePlaylistDate() {
    let result: Map<string, Song>;
    const data = localStorage.getItem('playlist');
    if (data) {
      try {
        const playlist = JSON.parse(localStorage.getItem('playlist'));
        result = new Map<string, Song>(playlist);
      } catch (e) {
        result = new Map<string, Song>();
      }
    } else {
      result = new Map<string, Song>();
    }
    return result;
  }

}

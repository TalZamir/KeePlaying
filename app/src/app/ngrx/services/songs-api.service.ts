import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LIBRARY_TYPE} from '../../shared/enums/LIBRARY_TYPE';
import {Song} from '../../shared/models/song';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongsApiService {

  private readonly SONGS_URL: string = `${environment.serverUrl}songs?libraryType=`;

  constructor(private http: HttpClient) {
  }

  fetchSongsByLibraryType(libraryType: LIBRARY_TYPE): Observable<Song[]> {
    return this.http.get(`${this.SONGS_URL}${libraryType}`).pipe(map(res => res as Song[]));
  }
}

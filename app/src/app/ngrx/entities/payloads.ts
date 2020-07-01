import {Song} from '../../shared/models/song';
import {LIBRARY_TYPE} from '../../shared/enums/LIBRARY_TYPE';

export interface SongPayload {
  song: Song;
}

export interface LibraryTypePayload {
  libraryType: LIBRARY_TYPE;
}

export interface LibraryDataPayload {
  libraryType: LIBRARY_TYPE;
  songs: Song[];
}

export interface PlaylistPayload {
  songs: Song[];
}

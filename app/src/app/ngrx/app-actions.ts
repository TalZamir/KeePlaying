import {createAction, props} from '@ngrx/store';
import {LibraryDataPayload, LibraryTypePayload, PlaylistPayload, SongPayload} from './entities/payloads';

export const playPreviewSong = createAction('[KeePlaying] Play Preview Song', props<SongPayload>());
export const changeLibraryType = createAction('[KeePlaying] Change Library Type', props<LibraryTypePayload>());
export const addSongsToPlaylist = createAction('[KeePlaying] Add Songs To Playlist', props<PlaylistPayload>());
export const removeSongFromPlaylist = createAction('[KeePlaying] Remove Song From Playlist', props<SongPayload>());
export const loadPlaylistFromStorage = createAction('[KeePlaying] Load Playlist From Storage', props<{}>());
export const requestAddLibraryToPlaylist = createAction('[KeePlaying] Request Add Library To Playlist', props<LibraryTypePayload>());
export const clearAddLibraryRequest = createAction('[KeePlaying] Clear Add Library To Playlist Request', props<{}>());
export const fetchSongsLibrary = createAction('[KeePlaying] Fetch Songs Library', props<LibraryTypePayload>());
export const setSongsLibrary = createAction('[KeePlaying] Set Songs Library', props<LibraryDataPayload>());

export const requestStarted = createAction('[KeePlaying] Request Started', props<{}>());
export const requestEnded = createAction('[KeePlaying] Request Ended', props<{}>());


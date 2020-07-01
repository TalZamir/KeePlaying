import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as AppActions from './app-actions';
import {Song} from '../shared/models/song';
import {LIBRARY_TYPE} from '../shared/enums/LIBRARY_TYPE';
import {MusicService} from './services/music.service';

export interface State {
  isBusy: boolean;
  libraryTypeSongsMap: Map<LIBRARY_TYPE, Song[]>;
  activePreviewSong: Song;
  activeLibrary: LIBRARY_TYPE;
  playlist: Map<string, Song>;
  addLibraryToPlaylistRequest: LIBRARY_TYPE;
}

export const initialState: State = {
  isBusy: true,
  libraryTypeSongsMap: new Map<LIBRARY_TYPE, Song[]>(),
  activePreviewSong: null,
  activeLibrary: null,
  playlist: new Map<string, Song>(),
  addLibraryToPlaylistRequest: null
};

const AppReducer = createReducer(
  initialState,

  on(AppActions.setSongsLibrary, (state, {libraryType, songs}) => {
    state.libraryTypeSongsMap.set(libraryType, songs);
    return {...state, libraryTypeSongsMap: new Map(state.libraryTypeSongsMap)};
  }),

  on(AppActions.playPreviewSong, (state, {song}) => ({...state, activePreviewSong: song})),

  on(AppActions.changeLibraryType, (state, {libraryType}) => ({...state, activeLibrary: libraryType})),

  on(AppActions.addSongsToPlaylist, (state, {songs}) => {
    MusicService.addSongsToPlaylist(state.playlist, songs);
    return {...state, playlist: new Map(state.playlist)};
  }),

  on(AppActions.addSongsToPlaylist, (state, {songs}) => {
    MusicService.addSongsToPlaylist(state.playlist, songs);
    return {...state, playlist: new Map(state.playlist)};
  }),

  on(AppActions.removeSongFromPlaylist, (state, {song}) => {
    MusicService.removeSongFromPlaylist(state.playlist, song.id);
    return {...state, playlist: new Map(state.playlist)};
  }),

  on(AppActions.requestAddLibraryToPlaylist, (state, {libraryType}) => ({...state, addLibraryToPlaylistRequest: libraryType})),

  on(AppActions.clearAddLibraryRequest, (state) => ({...state, addLibraryToPlaylistRequest: null})),

  on(AppActions.loadPlaylistFromStorage, (state) => {
    const loadedPlaylist: Map<string, Song> = MusicService.loadLocalStoragePlaylistDate();
    return {...state, playlist: loadedPlaylist};
  }),

  on(AppActions.requestStarted, (state) => ({...state, isBusy: true})),

  on(AppActions.requestEnded, (state) => ({...state, isBusy: false})),
);

export function AppReducers(state: State | undefined, action: Action) {
  return AppReducer(state, action);
}

export const GetLibraries = (state: State) => state.libraryTypeSongsMap;

export const GetActivePreviewSong = (state: State) => state.activePreviewSong;

export const GetActiveLibrary = (state: State) => state.activeLibrary;

export const GetPlaylist = (state: State) => state.playlist;

export const AddLibraryToPlaylistRequest = (state: State) => state.addLibraryToPlaylistRequest;

export const IsBusy = (state: State) => state.isBusy;


export const selectAppState = createFeatureSelector<State>('KeePlaying');

export const getLibraries = () => createSelector(
  selectAppState,
  GetLibraries
);

export const getActiveSong = () => createSelector(
  selectAppState,
  GetActivePreviewSong
);

export const getActiveLibrary = () => createSelector(
  selectAppState,
  GetActiveLibrary
);

export const getPlaylist = () => createSelector(
  selectAppState,
  GetPlaylist
);

export const addLibraryToPlaylistRequest = () => createSelector(
  selectAppState,
  AddLibraryToPlaylistRequest
);

export const isBusy = () => createSelector(
  selectAppState,
  IsBusy
);

import {Component, OnDestroy, OnInit} from '@angular/core';
import {LIBRARY_TYPE} from '../../shared/enums/LIBRARY_TYPE';
import {AppSelector} from '../../ngrx/app-selectors';
import {Subscription} from 'rxjs';
import {AppDispatcher} from '../../ngrx/app-dispatchers';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {

  public readonly CARDS = [
    {type: LIBRARY_TYPE.YEARS70, text: '70s', prefix: '19', color: 'rgba(215,152,43,0.8)', url: '70s'},
    {type: LIBRARY_TYPE.YEARS80, text: '80s', prefix: '19', color: 'rgba(74,143,160,0.8)', url: '80s'},
    {type: LIBRARY_TYPE.YEARS90, text: '90s', prefix: '19', color: 'rgba(95,164,72,0.8)', url: '90s'},
    {type: LIBRARY_TYPE.YEARS00, text: '00s', prefix: '20', color: 'rgba(187,97,157,0.8)', url: '00s'},
    {type: LIBRARY_TYPE.YEARS10, text: '10s', prefix: '20', color: 'rgba(142,116,195,0.8)', url: '10s'}
  ];

  public selectedCardType: LIBRARY_TYPE;
  private subs: Subscription[] = [];

  constructor(private appSelector: AppSelector, private appDispatcher: AppDispatcher) {
  }

  ngOnInit() {
    this.registerToEvents();
  }

  registerToEvents() {
    this.subs.push(this.appSelector.getActiveLibrary().subscribe(libraryType => this.selectedCardType = libraryType));
  }

  onAddAllSongsClicked() {
    this.appDispatcher.addLibraryToPlaylist(this.selectedCardType);
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.forEach(sub => sub.unsubscribe());
    }
  }

}

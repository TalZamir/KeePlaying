import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistOverlayComponent } from './playlist-overlay.component';

describe('PlaylistOverlayComponent', () => {
  let component: PlaylistOverlayComponent;
  let fixture: ComponentFixture<PlaylistOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

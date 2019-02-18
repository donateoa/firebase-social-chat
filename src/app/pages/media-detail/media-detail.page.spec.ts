import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDetailPage } from './media-detail.page';

describe('MediaDetailPage', () => {
  let component: MediaDetailPage;
  let fixture: ComponentFixture<MediaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

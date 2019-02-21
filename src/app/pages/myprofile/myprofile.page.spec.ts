import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofilePage } from './myprofile.page';

describe('MyprofilePage', () => {
  let component: MyprofilePage;
  let fixture: ComponentFixture<MyprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

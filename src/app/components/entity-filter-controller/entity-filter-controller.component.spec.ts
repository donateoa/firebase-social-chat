import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFilterControllerComponent } from './entity-filter-controller.component';

describe('EntityFilterControllerComponent', () => {
  let component: EntityFilterControllerComponent;
  let fixture: ComponentFixture<EntityFilterControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityFilterControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFilterControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

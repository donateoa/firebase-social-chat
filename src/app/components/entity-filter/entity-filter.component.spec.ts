import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFilterComponent } from './entity-filter.component';

describe('EntityFilterComponent', () => {
  let component: EntityFilterComponent;
  let fixture: ComponentFixture<EntityFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

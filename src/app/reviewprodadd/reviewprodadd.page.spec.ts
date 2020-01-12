import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewprodaddPage } from './reviewprodadd.page';

describe('ReviewprodaddPage', () => {
  let component: ReviewprodaddPage;
  let fixture: ComponentFixture<ReviewprodaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewprodaddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewprodaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

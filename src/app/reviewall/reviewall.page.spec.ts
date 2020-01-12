import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewallPage } from './reviewall.page';

describe('ReviewallPage', () => {
  let component: ReviewallPage;
  let fixture: ComponentFixture<ReviewallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

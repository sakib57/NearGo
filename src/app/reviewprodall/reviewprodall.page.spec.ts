import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewprodallPage } from './reviewprodall.page';

describe('ReviewprodallPage', () => {
  let component: ReviewprodallPage;
  let fixture: ComponentFixture<ReviewprodallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewprodallPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewprodallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

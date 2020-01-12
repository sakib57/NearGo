import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWisePage } from './category-wise.page';

describe('CategoryWisePage', () => {
  let component: CategoryWisePage;
  let fixture: ComponentFixture<CategoryWisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWisePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

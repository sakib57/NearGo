import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReturnPage } from './my-return.page';

describe('MyReturnPage', () => {
  let component: MyReturnPage;
  let fixture: ComponentFixture<MyReturnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReturnPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReturnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

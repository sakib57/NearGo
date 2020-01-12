import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPlacedPage } from './order-placed.page';

describe('OrderPlacedPage', () => {
  let component: OrderPlacedPage;
  let fixture: ComponentFixture<OrderPlacedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPlacedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPlacedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

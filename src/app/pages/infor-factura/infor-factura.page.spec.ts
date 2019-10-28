import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InforFacturaPage } from './infor-factura.page';

describe('InforFacturaPage', () => {
  let component: InforFacturaPage;
  let fixture: ComponentFixture<InforFacturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforFacturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforFacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

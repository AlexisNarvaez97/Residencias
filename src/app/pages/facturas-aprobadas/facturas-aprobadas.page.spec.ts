import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasAprobadasPage } from './facturas-aprobadas.page';

describe('FacturasAprobadasPage', () => {
  let component: FacturasAprobadasPage;
  let fixture: ComponentFixture<FacturasAprobadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasAprobadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasAprobadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

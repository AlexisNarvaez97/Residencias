import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasPendientesPage } from './facturas-pendientes.page';

describe('FacturasPendientesPage', () => {
  let component: FacturasPendientesPage;
  let fixture: ComponentFixture<FacturasPendientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasPendientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

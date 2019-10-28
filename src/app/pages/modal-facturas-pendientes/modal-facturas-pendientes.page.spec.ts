import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFacturasPendientesPage } from './modal-facturas-pendientes.page';

describe('ModalFacturasPendientesPage', () => {
  let component: ModalFacturasPendientesPage;
  let fixture: ComponentFixture<ModalFacturasPendientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFacturasPendientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFacturasPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

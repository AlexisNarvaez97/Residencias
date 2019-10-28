import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInforPage } from './editar-infor.page';

describe('EditarInforPage', () => {
  let component: EditarInforPage;
  let fixture: ComponentFixture<EditarInforPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInforPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCiclo2Component } from './componente-ciclo2.component';

describe('ComponenteCiclo2Component', () => {
  let component: ComponenteCiclo2Component;
  let fixture: ComponentFixture<ComponenteCiclo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteCiclo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteCiclo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

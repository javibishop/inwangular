import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCiclo1Component } from './componente-ciclo1.component';

describe('ComponenteCiclo1Component', () => {
  let component: ComponenteCiclo1Component;
  let fixture: ComponentFixture<ComponenteCiclo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteCiclo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteCiclo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DLGInfoContratoComponent } from './dlg-info-contrato.component';

describe('DLGInfoContratoComponent', () => {
  let component: DLGInfoContratoComponent;
  let fixture: ComponentFixture<DLGInfoContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DLGInfoContratoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DLGInfoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

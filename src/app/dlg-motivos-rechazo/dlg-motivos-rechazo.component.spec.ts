import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgMotivosRechazoComponent } from './dlg-motivos-rechazo.component';

describe('DlgMotivosRechazoComponent', () => {
  let component: DlgMotivosRechazoComponent;
  let fixture: ComponentFixture<DlgMotivosRechazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DlgMotivosRechazoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DlgMotivosRechazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

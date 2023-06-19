import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrloginComponent } from './frlogin.component';

describe('FrloginComponent', () => {
  let component: FrloginComponent;
  let fixture: ComponentFixture<FrloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrloginComponent]
    });
    fixture = TestBed.createComponent(FrloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

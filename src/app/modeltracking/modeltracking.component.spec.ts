import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeltrackingComponent } from './modeltracking.component';

describe('ModeltrackingComponent', () => {
  let component: ModeltrackingComponent;
  let fixture: ComponentFixture<ModeltrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeltrackingComponent]
    });
    fixture = TestBed.createComponent(ModeltrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

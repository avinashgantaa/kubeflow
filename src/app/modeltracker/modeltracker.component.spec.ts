import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeltrackerComponent } from './modeltracker.component';

describe('ModeltrackerComponent', () => {
  let component: ModeltrackerComponent;
  let fixture: ComponentFixture<ModeltrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeltrackerComponent]
    });
    fixture = TestBed.createComponent(ModeltrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

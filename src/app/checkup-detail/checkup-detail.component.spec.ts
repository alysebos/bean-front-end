import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckupDetailComponent } from './checkup-detail.component';

describe('CheckupDetailComponent', () => {
  let component: CheckupDetailComponent;
  let fixture: ComponentFixture<CheckupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

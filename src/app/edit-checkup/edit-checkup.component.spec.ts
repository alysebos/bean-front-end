import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCheckupComponent } from './edit-checkup.component';

describe('EditCheckupComponent', () => {
  let component: EditCheckupComponent;
  let fixture: ComponentFixture<EditCheckupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCheckupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

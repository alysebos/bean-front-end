import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBeanComponent } from './about-bean.component';

describe('AboutBeanComponent', () => {
  let component: AboutBeanComponent;
  let fixture: ComponentFixture<AboutBeanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutBeanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

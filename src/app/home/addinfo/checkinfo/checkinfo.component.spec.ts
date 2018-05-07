import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinfoComponent } from './checkinfo.component';

describe('CheckinfoComponent', () => {
  let component: CheckinfoComponent;
  let fixture: ComponentFixture<CheckinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

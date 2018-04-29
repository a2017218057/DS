import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpictureComponent } from './addpicture.component';

describe('AddpictureComponent', () => {
  let component: AddpictureComponent;
  let fixture: ComponentFixture<AddpictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

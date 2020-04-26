import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyDistributeComponent } from './key-distribute.component';

describe('KeyDistributeComponent', () => {
  let component: KeyDistributeComponent;
  let fixture: ComponentFixture<KeyDistributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyDistributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyDistributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

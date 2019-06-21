import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentairedegustationComponent } from './commentairedegustation.component';

describe('CommentairedegustationComponent', () => {
  let component: CommentairedegustationComponent;
  let fixture: ComponentFixture<CommentairedegustationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentairedegustationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentairedegustationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

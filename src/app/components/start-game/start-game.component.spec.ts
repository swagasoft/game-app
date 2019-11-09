import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartGameComponent } from './start-game.component';

describe('StartGameComponent', () => {
  let component: StartGameComponent;
  let fixture: ComponentFixture<StartGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartGameComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

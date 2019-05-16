import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSiV1Component } from './auth-si-v1.component';

describe('AuthSiV1Component', () => {
  let component: AuthSiV1Component;
  let fixture: ComponentFixture<AuthSiV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSiV1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSiV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

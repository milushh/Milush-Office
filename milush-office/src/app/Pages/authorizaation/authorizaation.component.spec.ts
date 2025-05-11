import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizaationComponent } from './authorizaation.component';

describe('AuthorizaationComponent', () => {
  let component: AuthorizaationComponent;
  let fixture: ComponentFixture<AuthorizaationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizaationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizaationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

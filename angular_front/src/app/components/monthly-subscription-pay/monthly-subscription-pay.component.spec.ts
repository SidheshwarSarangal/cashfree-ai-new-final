import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySubscriptionPayComponent } from './monthly-subscription-pay.component';

describe('MonthlySubscriptionPayComponent', () => {
  let component: MonthlySubscriptionPayComponent;
  let fixture: ComponentFixture<MonthlySubscriptionPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlySubscriptionPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlySubscriptionPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

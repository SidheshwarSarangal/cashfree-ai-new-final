import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlySubscriptionPayComponent } from './yearly-subscription-pay.component';

describe('YearlySubscriptionPayComponent', () => {
  let component: YearlySubscriptionPayComponent;
  let fixture: ComponentFixture<YearlySubscriptionPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearlySubscriptionPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlySubscriptionPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarternarySubscriptionPayComponent } from './quarternary-subscription-pay.component';

describe('QuarternarySubscriptionPayComponent', () => {
  let component: QuarternarySubscriptionPayComponent;
  let fixture: ComponentFixture<QuarternarySubscriptionPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarternarySubscriptionPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarternarySubscriptionPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

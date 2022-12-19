import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhoneNumberVerificationComponent } from './phone-number-verification.component';

describe('PhoneNumberVerificationComponent', () => {
  let component: PhoneNumberVerificationComponent;
  let fixture: ComponentFixture<PhoneNumberVerificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneNumberVerificationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneNumberVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

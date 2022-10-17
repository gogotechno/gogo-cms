import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventWithWinningSummaryComponent } from './event-with-winning-summary.component';

describe('EventWithWinningSummaryComponent', () => {
  let component: EventWithWinningSummaryComponent;
  let fixture: ComponentFixture<EventWithWinningSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventWithWinningSummaryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventWithWinningSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

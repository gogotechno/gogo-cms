import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScratchAndWinDetailsPage } from './scratch-and-win-details.page';

describe('ScratchAndWinDetailsPage', () => {
  let component: ScratchAndWinDetailsPage;
  let fixture: ComponentFixture<ScratchAndWinDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchAndWinDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScratchAndWinDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

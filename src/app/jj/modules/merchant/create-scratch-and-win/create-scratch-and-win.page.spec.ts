import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateScratchAndWinPage } from './create-scratch-and-win.page';

describe('CreateScratchAndWinPage', () => {
  let component: CreateScratchAndWinPage;
  let fixture: ComponentFixture<CreateScratchAndWinPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScratchAndWinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateScratchAndWinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

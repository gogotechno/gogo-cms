import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CmsImageButtonComponent } from './cms-image-button.component';

describe('CmsImageButtonComponent', () => {
  let component: CmsImageButtonComponent;
  let fixture: ComponentFixture<CmsImageButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsImageButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CmsImageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JJPage } from './jj.page';

describe('JJPage', () => {
  let component: JJPage;
  let fixture: ComponentFixture<JJPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JJPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(JJPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

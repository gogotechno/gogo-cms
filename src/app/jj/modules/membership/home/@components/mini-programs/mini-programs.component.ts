import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { CommonService } from 'src/app/jj/services';
import { JJMiniProgram } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'mini-programs',
  templateUrl: './mini-programs.component.html',
  styleUrls: ['./mini-programs.component.scss'],
})
export class MiniProgramsComponent implements OnInit {
  miniPrograms: JJMiniProgram[];

  constructor(
    private home: HomeService,
    private common: CommonService,) {}

  async onMiniProgramClick(miniProgram: JJMiniProgram) {
    if (miniProgram.isActive)
    await this.common.navigateCustomUrl(miniProgram.url);
  }

  async ngOnInit() {
    this.home.miniPrograms.subscribe((miniPrograms) => (this.miniPrograms = miniPrograms));
  }
}


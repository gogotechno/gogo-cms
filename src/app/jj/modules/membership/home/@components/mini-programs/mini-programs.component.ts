import { Component, OnInit } from '@angular/core';
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

  constructor(private home: HomeService, private common: CommonService) {}

  async ngOnInit() {
    this.home.miniPrograms.subscribe((miniPrograms) => (this.miniPrograms = miniPrograms));
  }

  async onMiniProgramClick(program: JJMiniProgram) {
    if (!program.isActive) {
      return;
    }
    await this.common.navigateCustomUrl(program.url);
  }
}

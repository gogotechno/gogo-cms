import { Component, OnInit } from '@angular/core';
import { MiniProgram } from 'src/app/jj/typings';
import { HomeService } from '../../@services/home.service';

@Component({
  selector: 'mini-programs',
  templateUrl: './mini-programs.component.html',
  styleUrls: ['./mini-programs.component.scss'],
})
export class MiniProgramsComponent implements OnInit {
  miniPrograms: MiniProgram[];

  constructor(private home: HomeService) {}

  ngOnInit() {
    this.home.miniPrograms.subscribe((miniPrograms) => (this.miniPrograms = miniPrograms));
  }
}

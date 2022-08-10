import { Component, Input, OnInit } from '@angular/core';
import { CmsList } from 'src/app/cms.type';

@Component({
  selector: 'cms-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

  @Input('list') list: CmsList;

  constructor() { }

  ngOnInit() {}

}

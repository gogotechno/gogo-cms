import { Component, OnInit } from '@angular/core';
import { Winbox99Service } from '../../winbox99.service';
import { Winbox99Game } from '../../winbox99.type';

@Component({
  selector: 'winbox99-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {

  games: Array<Winbox99Game> = [];

  constructor(private winbox99: Winbox99Service) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.games = await this.winbox99.getGames();
  }

}

import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation:boolean = false;
  game:Game;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    this.pickCardAnimation = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((updatedGame:any) => {
          this.game.currentPlayer = updatedGame.currentPlayer;
          this.game.playedCards = updatedGame.playedCards;
          this.game.players = updatedGame.players;
          this.game.stack = updatedGame.stack;
          this.game.pickCardAnimation = updatedGame.pickCardAnimation;
          this.game.currentCard = updatedGame.currentCard
      });
    });

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length <= 1) {
      alert('Alle Karten aufgebraucht. Nun solltet ihr aufhören, zu trinken ;-)')
    } else if (!this.game.pickCardAnimation && this.game.players.length >= 2) {
      this.game.pickCardAnimation = true;
      this.game.currentCard = this.game.stack.pop();
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame(): void {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

}


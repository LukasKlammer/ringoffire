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
  pickCardAnimation: boolean = false;
  game: Game;
  currentCard: string;
  games$: Observable<any>;
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
          console.log('unser upgedatetes Game', updatedGame);
          this.game.currentPlayer = updatedGame.currentPlayer;
          this.game.playedCards = updatedGame.playedCards;
          this.game.players = updatedGame.players;
          this.game.stack = updatedGame.stack;
      });
    });

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length <= 1) {
      alert('Alle Karten aufgebraucht. Nun solltet ihr aufhören, zu trinken ;-)')
    } else if (!this.pickCardAnimation && this.game.players.length >= 2) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop();
      this.saveGame();
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.saveGame();
        this.pickCardAnimation = false;
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
    console.log(this.game);

    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }

}


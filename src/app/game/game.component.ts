import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from '@firebase/firestore';

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

  constructor(private firestore: Firestore, public dialog: MatDialog) {
    const coll:any = collection(firestore, 'games');
    this.games$ = collectionData(coll);

    this.games$.subscribe((newGames) => {
      console.log('Games sind, ', newGames)
    });
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    const coll:any = collection(this.firestore, 'games');
    setDoc(doc(coll), { 'Hallo': 'Welt' });
  }

  takeCard() {
    if (this.game.stack.length <= 1) {
      alert('Alle Karten aufgebraucht. Nun solltet ihr aufhören, zu trinken ;-)')
    } else if (!this.pickCardAnimation && this.game.players.length >= 2) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop();
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
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
      }
    });
  }
}



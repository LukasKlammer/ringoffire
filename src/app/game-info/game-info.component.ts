import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  @Input() card:string;
  title:string = 'title';
  description:string = 'description';

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2' },
    { title: 'You', description: 'You decide who drinks.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category. He/she who knows nothing more must drink.' },
    { title: 'Bust a jive.', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. Go on, until a player confused. He/she must drink.' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'This person is the thumb master until another player becomes this card. This means that everytime the thumb master puts his/her thumb on the floor or table that everyone has to do the same and the last to do so has to drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'Quizmaster, the quizmaster may ask questions during the game (as long as he is quizmaster and until the next person has drawn the quizmaster card) to the round or to certain persons. Each person who answers him must begin his sentence with "You are the quizmaster", if the answering person forgets this he must drink one.' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ]

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges():void {
    if (this.card) { // nur ausführen, wenn Karte bereits existiert
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }

  }

}

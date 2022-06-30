import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GameInfoComponent } from './game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database'; // new method
// import { provideFirestore,getFirestore } from '@angular/fire/firestore'; // new method, not working: replace this line with code below
import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireModule } from '@angular/fire/compat'; veraltete Syntax

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GameInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    // AngularFireModule.initializeApp(environment.firebase), od Syntax
    provideFirebaseApp(() => initializeApp(environment.firebase)), // new method, wurde bei Erstellung automatisch hier hinzugefügt
    provideAuth(() => getAuth()), // new method,, wurde bei Erstellung automatisch hier hinzugefügt
    provideDatabase(() => getDatabase()), // new method, wurde bei Erstellung automatisch hier hinzugefügt
    //provideFirestore(() => getFirestore()), // new method, not working: replace this line with code below
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

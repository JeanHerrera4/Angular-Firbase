import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";

@NgModule({
  declarations: [AppComponent],
  imports: [ 
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCdWYnqnkZ22kzMHMi3f9bcdioh9I-2dp4",
      authDomain: "angular-workshop-77d03.firebaseapp.com",
      databaseURL: "https://angular-workshop-77d03.firebaseio.com",
      projectId: "angular-workshop-77d03",
      storageBucket: "angular-workshop-77d03.appspot.com",
      messagingSenderId: "464255313843",
      appId: "1:464255313843:web:e8636b76789dcb84"
    }), 
    AngularFirestoreModule,
    AngularFireStorageModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

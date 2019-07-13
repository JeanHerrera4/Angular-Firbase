import { Component, ViewChild } from '@angular/core';
import { Observable } from "rxjs";

import { Speaker } from "./interfaces/speaker.interface";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.speakerCollection = db.collection("kelly");
    this.speakerList = this.speakerCollection.valueChanges();
  }

  speakerCollection: AngularFirestoreCollection<Speaker>;
  speakerList: Observable<Speaker[]>;
  
  @ViewChild("file",{read: false, static: false}) file;
   files: Set<File> = new Set();
  
  url: any =
      "https://i.pinimg.com/564x/65/df/2c/65df2c922e64c61235162ab7c0924d3c.jpg";
    _file;
    name = "";
    id = null;
    isChanged = false;



  onKey(event: any) {
    // without type info
    this.name = event.target.value;
  }

  add() {
    if (this.isChanged) {
      const filePath = "workshop" + this.name;
      const ref = this.storage.ref(filePath);
      ref.put(this._file).then(() => {
        ref.getDownloadURL().subscribe(url => {
          this.url = url;
          if (this.id) {
            this.update();
          } else {
            this.create();
          }
        });
      });
    } else {
      if (this.id) {
        this.update();
      }
    }
    this.isChanged = false;
    this.file.nativeElement.value = "";
  }

  update() {
    this.speakerCollection
      .doc(this.id)
      .update({ name: this.name, url: this.url });
    this.url =
      "https://i.pinimg.com/564x/65/df/2c/65df2c922e64c61235162ab7c0924d3c.jpg";
    this.name = "";
    this.id = null;
  }

  create() {
    const id = this.db.createId();
    const name = this.name;
    this.speakerCollection.doc(id).set({ name, url: this.url, id });
    this.url =
      "https://i.pinimg.com/564x/65/df/2c/65df2c922e64c61235162ab7c0924d3c.jpg";
    this.name = "";
    this.id = null;
  }

  remove(id: string) {
    if (confirm("Are you sure to delete the show from your list?")) {
      this.speakerCollection.doc(id).delete();
    }
  }

  select(speaker) {
    this.url = speaker.url;
    this.name = speaker.name;
    this.id = speaker.id;
  }

  onFilesAdded(target: any) {
    this.isChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result;
    };
    if (target.files.length > 0) {
      this._file = target.files[0];
      reader.readAsDataURL(this._file);
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }
}
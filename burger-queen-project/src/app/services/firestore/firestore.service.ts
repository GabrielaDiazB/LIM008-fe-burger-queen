import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  collectionMenuFb: Observable<Menu[]>;

  constructor(public menudata: AngularFirestore) { }

  getMenu() {
    return this.collectionMenuFb = this.menudata.collection('menu').valueChanges()
  }
}

export interface Menu{
  nombre?: string;
  precio?: number;
  tipo?: string;
  id?: string
}
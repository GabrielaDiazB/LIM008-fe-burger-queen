import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  collectionMenuFb: Observable<Menu[]>;
  public newOrder;

  constructor(public menudata: AngularFirestore, public addorder: AngularFirestore) { }

  getMenu() {
    return this.collectionMenuFb = this.menudata.collection('menu').valueChanges()
  }

  saveOrderList(newOrder){
    return this.addorder.collection('pedidos').add(newOrder)
  }
}

export interface Menu{
  nombre?: string;
  precio?: number;
  tipo?: string;
  id?: string;
}
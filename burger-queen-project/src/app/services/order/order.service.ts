import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  nombre: string,
  precio : number,
  tipo: string,
  id: string,
  extras: string[]
}

export interface Order {
  nombreDelCliente: string,
  productos: Producto[],
  total: number
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  public breakfastClientsOrder = new BehaviorSubject([]);
  breakfastMenu = this.breakfastClientsOrder.asObservable();

  public othersClientsOrder = new BehaviorSubject([]);
  othersMenu = this.othersClientsOrder.asObservable();


  public arr: Producto[] = [];

  public buyerName = new BehaviorSubject('');
  names = this.buyerName.asObservable();

  constructor() { }

  getBreakfastOrder(object){
    // console.log(object);
    this.arr.push(object)
    this.breakfastClientsOrder.next(this.arr)
  }

  getOtherFoodOrder(object){
    this.arr.push(object)
    this.othersClientsOrder.next(this.arr)
  }

  addExtra(nombreDelExtra, objProducto){
    //console.log()
    this.arr = this.arr.map((e:any) => {
      if(e.id === objProducto.id){
        const newObj = {
          ...e, 
          extras: [
            ...e.extras,
            nombreDelExtra
          ]
        }
        return newObj;
      } else{
        return e;
      }
    });
    this.othersClientsOrder.next(this.arr)
    console.log(this.arr)
  }

  deleteExtra(nombreDelExtra, objProducto){
    this.arr = this.arr.map((e:any) => {
      if(e.id=== objProducto.id) {
        const newObj = {
          ...e,
          extras: [
            ...e.extras.splice(e.extras.indexOf(nombreDelExtra), 0),
          ]
        }
        return newObj
      } else{
        return e;
      }
    });
    this.othersClientsOrder.next(this.arr)
    console.log(this.arr)
  }
  

  // getTotal(){
  //   return this.object.reduce()
  // } jalar los precios y sumarlos

  getBuyerName(value:string){
    this.buyerName.next(value);
  }
}

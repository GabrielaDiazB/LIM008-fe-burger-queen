import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { FirestoreService } from '../firestore/firestore.service'

export interface Producto {
  nombre: string,
  precio : number,
  tipo: string,
  id: string,
  extras: string[],
  cantidad: number
}

export interface Order {
  nombreDelCliente: string,
  productos: Producto[],
  total: number,
  fecha: number
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  public arr: Producto[] = [];

  public savedArr: Order = {
    nombreDelCliente: '',
    productos: [],
    total: 0,
    fecha: 0
  }

  public breakfastClientsOrder = new BehaviorSubject([]);
  breakfastMenu = this.breakfastClientsOrder.asObservable();

  public othersClientsOrder = new BehaviorSubject([]);
  othersMenu = this.othersClientsOrder.asObservable();

  public buyerName = new BehaviorSubject('');
  names = this.buyerName.asObservable();

  public totalAmount = new BehaviorSubject(0);
  totalPrice = this.totalAmount.asObservable();

  constructor(public serviceFirestore: FirestoreService) { }

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
      if(e.id === objProducto.id) {
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
  
  getBuyerName(value:string){
    this.savedArr =  {
      ...this.savedArr,
      nombreDelCliente: value
    }
      this.buyerName.next(value);
  }

  getTotal(){
   const totalMoney = this.arr.reduce((total, objectProduct) => {
      return total + objectProduct.precio
    }, 0)
    this.totalAmount.next(totalMoney)
  }

  amountFoodOrder(objProducto, amountFood){
    this.arr = this.arr.map((e:any) => {
      console.log(objProducto.precio)
      if(e.nombre === objProducto.nombre) {
        const newObj = {
          ...objProducto,
          cantidad: parseInt(amountFood),
          precio: objProducto.precio * parseInt(amountFood) 
        }
        return newObj;
      } else {
        return e;
      }
    });
    this.othersClientsOrder.next(this.arr);
    console.log(this.getTotal())
    console.log(this.arr)
  }

  deleteOrder(name: any){
    this.arr = this.arr.filter(element => {
      return (element.nombre !== name)
    })
    this.othersClientsOrder.next(this.arr)
    this.getTotal()
  }

  savingOrder(date:any, totalDePrecios:number){
    const order = {
      ...this.savedArr,
      productos: this.arr,
      fecha: date,
      total: totalDePrecios, 
    }

    this.serviceFirestore.saveOrderList(order)
    .then(() => {
      //setvalue()
    })
  }

}

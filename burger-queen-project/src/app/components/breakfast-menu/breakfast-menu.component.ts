import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-breakfast-menu',
  templateUrl: './breakfast-menu.component.html',
  styleUrls: ['./breakfast-menu.component.css']
})

export class BreakfastMenuComponent implements OnInit {
  public breakfastMenu = [];
  public breakfastMenuOrder = {};

  constructor( public breakfastMenuService: FirestoreService, public breakfastService: OrderService){ 
    this.breakfastMenuService.getMenu().subscribe(menu => {
      this.breakfastMenu = menu.filter((e:any) => e.tipo === 'desayuno')
    })

    this.breakfastService.breakfastMenu.subscribe(desayuno => {
      this.breakfastMenuOrder = desayuno;
    })
  }

  ngOnInit() {

  }

  orderedFood(value: object){
    const newOrders = {
      ...value,
      extras: []
    };
    this.breakfastService.getBreakfastOrder(newOrders)
  }

}  

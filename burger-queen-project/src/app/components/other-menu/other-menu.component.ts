import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-other-menu',
  templateUrl: './other-menu.component.html',
  styleUrls: ['./other-menu.component.css']
})
export class OtherMenuComponent implements OnInit {
  public othersMenu = [];
  public otherMenuOrder = {};
  public drinksMenu = []
  public acompMenu = [];
  public hamburgersMenu = [];

  constructor(public otherMenuService: FirestoreService, public otherFoodService: OrderService) {
    this.otherMenuService.getMenu().subscribe(data => {
      this.drinksMenu = data.filter((e:any) => e.tipo === 'Bebidas')
    })
    this.otherMenuService.getMenu().subscribe(data => {
      this.acompMenu = data.filter((e:any) => e.tipo === 'Acompañamientos')
    })
    this.otherMenuService.getMenu().subscribe(data => {
      this.hamburgersMenu = data.filter((e:any) => e.tipo === 'Hamburguesas')
    })
    this.otherFoodService.othersMenu.subscribe(food => {
      this.otherMenuOrder = food;
    })
    
  }

  ngOnInit() {

  }

  orderedFood(value: object){
    const orders = {
      ...value,
      extras: []
    }
    this.otherFoodService.getOtherFoodOrder(orders)
  }
  
}

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  date: any;
  name: string;
  eventCheckBox = false;
  total: number;

  public orderedFood = [];

  constructor(public orderService: OrderService) { 
    this.orderService.breakfastMenu.subscribe((e:any) => {
      this.orderedFood = e;
    })
    
    this.orderService.othersMenu.subscribe((element:any) => {
      this.orderedFood = element;
    })

    this.orderService.names.subscribe(data => {
      this.name = data;
    })

    this.orderService.totalPrice.subscribe((price:number) => {
      // this.total = this.orderService.getTotal();
      return this.total = price;
    })

  }

  ngOnInit() {
    this.date = new Date()
  }

  checkedExtra(evento, extraName, order){
    console.log(evento)
    if(evento){
      this.orderService.addExtra(extraName, order)
    } else {
      this.orderService.deleteExtra(extraName, order)
    }
  }

  deleteButton(nombre:string){
      this.orderService.deleteOrder(nombre)
    }

  amountOfFood(event, amount: number) {
    this.orderService.amountFoodOrder(event, amount)
  }  

  nameInput(name:string){
    const orderName = name;
    this.orderService.getBuyerName(orderName);
  }

  sendOrderFB(date: any, total:number){
    this.orderService.savingOrder(date, total)
  }
}

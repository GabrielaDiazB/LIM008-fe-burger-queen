import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  // public total: number;
  name: string;
  eventCheckBox = false;

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

  }

  ngOnInit() {
  }

  checkedExtra(evento, extraName, order){
    console.log(evento)
    if(evento){
      this.orderService.addExtra(extraName, order)
    } else {
      this.orderService.deleteExtra(extraName, order)
    }
  }

  // deleteButton(clickEvent, order){
  //   if(clickEvent){
  //     this.orderService.deleteExtra(order)
  //   }
  // }

  saveOrder(clientName){
    const data = {
    }
  }

  nameInput(name:string){
    const orderName = name;
    console.log(this.orderService.getBuyerName(orderName));
  }
}

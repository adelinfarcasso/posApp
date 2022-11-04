import { Component, OnInit } from '@angular/core';
import { LocalService } from '../cart/order-component/local.service';
import { Product } from '../products/product.model';

export interface Order {
  id: Number;
  products: Product[];
  shippingData: {
    clientData: any;
    shippingData: any;
  };
  total: Number;
}

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css'],
})
export class ClientOrdersComponent implements OnInit {
  clientOrders: Object[] = [];
  dataSource = [];

  activeOrder: any;

  columnsToDisplay = ['ID', 'Products', 'Total'];
  constructor(private localService: LocalService) {}

  onOrderSelect(id: Number) {
    let selectedOrder = this.clientOrders.filter((order) => {
      return order['id'] === id;
    });
    console.log(selectedOrder);
    this.localService.ordersUpdate;

    this.activeOrder = selectedOrder[0];
  }

  ngOnInit(): void {
    this.clientOrders = this.localService.getLocalCart('orders');
    this.activeOrder = this.clientOrders[this.clientOrders.length - 1];
    // this.localService.ordersUpdate.subscribe((orders) => {
    //   orders.forEach((order) => {
    //     console.log(order);
    //   });
    //   this.activeOrder = orders[0];
    // });
    console.log(this.activeOrder);

    // this.activeOrder = this.clientOrders[this.clientOrders.length - 1];
    // console.log(this.activeOrder);
  }
}

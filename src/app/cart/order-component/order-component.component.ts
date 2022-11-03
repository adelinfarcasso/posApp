import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from './local.service';

// matautocomplete
@Component({
  selector: 'app-order-component',
  templateUrl: './order-component.component.html',
  styleUrls: ['./order-component.component.css'],
})
export class OrderComponentComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      clientData: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        cellphone: new FormControl(null, [
          Validators.required,
          Validators.pattern('[0-9]{10,10}'),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      shippingData: new FormGroup({
        address1: new FormControl(null, Validators.required),
        address2: new FormControl(null),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
      }),
    });
  }

  toLocal() {}

  getControl(control: string): FormControl<any> {
    return this.orderForm[`${control}`];
  }

  onSubmit() {
    console.log(this.orderForm);
  }
}

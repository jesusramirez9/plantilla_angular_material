import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-times',
  templateUrl: './delivery-times.component.html',
  styleUrls: ['./delivery-times.component.scss']
})
export class DeliveryTimesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}

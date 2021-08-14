import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-order',
  templateUrl: './state-order.component.html',
  styleUrls: ['./state-order.component.scss']
})
export class StateOrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}

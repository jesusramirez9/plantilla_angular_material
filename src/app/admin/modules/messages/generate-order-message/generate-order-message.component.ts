import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-order-message',
  templateUrl: './generate-order-message.component.html',
  styleUrls: ['./generate-order-message.component.scss']
})
export class GenerateOrderMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchange-returns',
  templateUrl: './exchange-returns.component.html',
  styleUrls: ['./exchange-returns.component.scss']
})
export class ExchangeReturnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}

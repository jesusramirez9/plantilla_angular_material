import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-craftsmen',
  templateUrl: './craftsmen.component.html',
  styleUrls: ['./craftsmen.component.scss']
})
export class CraftsmenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}

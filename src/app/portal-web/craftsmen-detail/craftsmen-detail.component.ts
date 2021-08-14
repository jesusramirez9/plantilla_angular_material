import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-craftsmen-detail',
  templateUrl: './craftsmen-detail.component.html',
  styleUrls: ['./craftsmen-detail.component.scss']
})
export class CraftsmenDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}

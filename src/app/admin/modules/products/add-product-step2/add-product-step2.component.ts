import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product-step2',
  templateUrl: './add-product-step2.component.html',
  styleUrls: ['./add-product-step2.component.scss']
})
export class AddProductStep2Component implements OnInit {

  idProduct: number = 0;
  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(p => {
      this.idProduct = p['id'];
    });
  }

  ngOnInit(): void { 
    window.scrollTo(0, 0);
  }

}

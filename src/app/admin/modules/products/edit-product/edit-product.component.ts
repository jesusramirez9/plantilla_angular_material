import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Caracteristica } from 'src/app/models/Caracteristica';
import { Categoria } from 'src/app/models/Categoria';
import { Color } from 'src/app/models/Color';
import { Empaque } from 'src/app/models/Empaque';
import { Festividad } from 'src/app/models/Festividad';
import { ImagenProducto } from 'src/app/models/ImagenProducto';
import { Precio } from 'src/app/models/Precio';
import { Producto } from 'src/app/models/Producto';
import { TipoPago } from 'src/app/models/TipoPago';
import { TipoProducto } from 'src/app/models/TipoProducto';
import { PackingIntranetService } from 'src/app/services/intranet/packing-intranet.service';
import { ProductIntranetService } from 'src/app/services/intranet/product-intranet.service';
import { DialogColorComponent } from 'src/app/shared/dialog-color/dialog-color.component';
import { ProductStep1Component } from '../steps/product-step1/product-step1.component';
import { ProductStep2Component } from '../steps/product-step2/product-step2.component';
import { ProductStep3Component } from '../steps/product-step3/product-step3.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @ViewChild(ProductStep1Component) step1: ProductStep1Component | undefined;
  @ViewChild(ProductStep2Component) step2: ProductStep2Component | undefined;
  @ViewChild(ProductStep3Component) step3: ProductStep3Component | undefined;
  idProduct: number = 0;
  step: string = "1";

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private productService: ProductIntranetService,
    private router: Router, public dialog: MatDialog, private packingService: PackingIntranetService, public sanitizer:DomSanitizer) {
    this.activatedRoute.params.subscribe(p => {
      this.idProduct = p['id'];
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getDetailProduct();
  }

  /* --------------------------------- STEP 1 ------------------------------------*/

  //INFORMACION DEL PRODUCTO
  getDetailProduct(): void {
    this.productService.getDetalleProducto(this.idProduct).subscribe(response => {
      console.log(response);
      if (response.data){
        this.step1!.mostrarDatosStep1(response.data);
        this.step2?.mostrarDatosStep2(response.data);
        this.step3?.mostrarDatosStep3(response.data);
      }
    }, error => {
      console.log(error);
      this.router.navigate(['/admin/packing']);
    });
  }

}

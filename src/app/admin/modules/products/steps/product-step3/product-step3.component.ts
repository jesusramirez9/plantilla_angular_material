import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Precio } from 'src/app/models/Precio';
import { TipoPago } from 'src/app/models/TipoPago';
import { ProductIntranetService } from 'src/app/services/intranet/product-intranet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-step3',
  templateUrl: './product-step3.component.html',
  styleUrls: ['./product-step3.component.scss']
})
export class ProductStep3Component implements OnInit {

  @Input() product: any;
  @Input() idProduct: number = 0;
  @Input() mode: string = 'create';
  visibleRemovePrice: boolean = false;
  loading: boolean = false;
  productForm = this.fb.group({
    paymentType1: [false],
    paymentType2: [false],
    paymentType3: [false],
    rangePrice: this.fb.array([])
  });
  precios: Precio[] = [];
  tiposPago: TipoPago[] = [];

  constructor(private fb: FormBuilder, private router: Router,
    private productService: ProductIntranetService) {
  }

  ngOnInit(): void {
    if (this.mode == 'create') {
      this.addPrice('', '', '');
    }
  }

  mostrarDatosStep3(data: any): void {
    this.precios = data.prices;
    this.tiposPago = data.typePayment;
    this.precios.forEach((item: Precio) => {
      this.addPrice(String(item.priceMinQuantity), String(item.priceMaxQuantity), String(item.priceAmount));
    });

    this.tiposPago.forEach((item: TipoPago) => {
      switch (item.typepaymentValue) {
        case 100:
          this.productForm.get('paymentType1')?.setValue(item.typepaymentUnity == 'P' ? true : false);
          break;
        case 50:
          this.productForm.get('paymentType2')?.setValue(item.typepaymentUnity == 'P' ? true : false);
          break;
        case 0:
          this.productForm.get('paymentType3')?.setValue(item.typepaymentUnity == 'P' ? true : false);
          break;
        default:
          break;
      }
    });
  }

  addPrice(min: string, max: string, price: string): void {
    const range = this.fb.group({
      minimumAmount: [min, Validators.required],
      maximumQuantity: [max, Validators.required],
      price: [price, Validators.required]
    });

    this.rangePrice.push(range);
  }

  removePrice(index: number): void {
    this.rangePrice.removeAt(index);
  }

  get rangePrice(): FormArray {
    return this.productForm.get('rangePrice') as FormArray;
  }

  minPrice(i: number) {
    return this.rangePrice.at(i).get('minimumAmount')?.invalid && this.rangePrice.at(i).get('minimumAmount')?.touched;
  }
  maxPrice(i: number) {
    return this.rangePrice.at(i).get('maximumQuantity')?.invalid && this.rangePrice.at(i).get('maximumQuantity')?.touched;
  }
  amountPrice(i: number) {
    return this.rangePrice.at(i).get('price')?.invalid && this.rangePrice.at(i).get('price')?.touched;
  }

  onSubmit(): void {
    console.log(this.productForm);
    if (this.productForm.invalid) {
      return Object.values(this.productForm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => {
            control.markAsDirty();
            control.markAsTouched();
          });
        } else {
          control.markAsDirty();
          control.markAsTouched();
        }
      });
    }

    this.loading = true;
    //Type Payment
    const type1 = this.productForm.value.paymentType1;
    const type2 = this.productForm.value.paymentType2;
    const type3 = this.productForm.value.paymentType3;
    const typePaymentStr = `(1,${type1 ? 1 : 0});(2,${type2 ? 1 : 0});(3,${type3 ? 1 : 0});`;

    //Range Prices
    let productsPriceStr = '';
    this.productForm.value.rangePrice.forEach((item: any) => {
      productsPriceStr += `(${item.minimumAmount}-${item.maximumQuantity},${item.price});`;
    });

    switch (this.mode) {
      case 'create':
        const data = {
          id: this.idProduct,
          typePaymentStr: typePaymentStr,
          productsPriceStr: productsPriceStr,
        };
        this.productService.saveProductoStep3(data).subscribe(response => {
          console.log(response);
          setTimeout(() => {
            this.router.navigate(['/admin/product']);
          }, 1500);
          Swal.fire({
            text: 'Se registró satisfactoriamente.',
            icon: 'success'
          });
        }, error => {
          this.loading = false;
          Swal.fire({
            text: 'Hubo un error al guardar.',
            icon: 'error'
          });
        });
        break;
      case 'edit':
        const data2 = {
          id: this.idProduct,
          typePaymentStr: typePaymentStr,
          priceStr: productsPriceStr,
        };
        this.productService.updateProductoStep3(data2).subscribe(response => {
          console.log(response);
          Swal.fire({
            text: 'Se actualizó satisfactoriamente.',
            icon: 'success'
          });
          this.loading = false;
        }, error => {
          this.loading = false;
          Swal.fire({
            text: 'Hubo un error al actualizar.',
            icon: 'error'
          });
        });
        break;
      default:
        break;
    }

  }
}

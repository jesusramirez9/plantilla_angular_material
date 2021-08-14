import { ImagenProducto } from './../../../../../models/ImagenProducto';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empaque } from 'src/app/models/Empaque';
import { PackingIntranetService } from 'src/app/services/intranet/packing-intranet.service';
import { ProductIntranetService } from 'src/app/services/intranet/product-intranet.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-step2',
  templateUrl: './product-step2.component.html',
  styleUrls: ['./product-step2.component.scss']
})
export class ProductStep2Component implements OnInit {

  @Input() product: any;
  @Input() idProduct: number = 0;
  @Input() mode: string = 'create';
  productForm = this.fb.group({
    imagenPrincipal: ['', Validators.required],
    imagen1: ['', Validators.required],
    imagen2: [''],
    imagen3: [''],
    imagen4: [''],
    imagen5: [''],
    imagen6: [''],
    imagen7: [''],
    imagen8: [''],
    imagen9: [''],
    imagen10: [''],
    videoURL: [''],
    hasPackaging: ['', Validators.requiredTrue],
    packing: [{ value: '', disabled: true }]
  });
  listPackings: Empaque[] = [];
  loading: boolean = false;
  submitSuccess: boolean = false;
  submitError: boolean = false;
  listImagenes: ImagenProducto[] = [];
  imagen1_aux: string = '';
  imagen2_aux: string = '';
  imagen3_aux: string = '';
  imagen4_aux: string = '';
  imagen5_aux: string = '';
  imagen6_aux: string = '';
  imagen7_aux: string = '';
  imagen8_aux: string = '';
  imagen9_aux: string = '';
  imagen10_aux: string = '';
  imagen11_aux: string = '';
  imgPrincipal: ImagenProducto = {};
  urlYoutube: any;

  constructor(private fb: FormBuilder, private router: Router, private productService: ProductIntranetService,
    private packingService: PackingIntranetService, public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getListPackings();
  }

  mostrarDatosStep2(data: any): void {
    this.listImagenes = data.images;
    this.listImagenes.forEach((item: ImagenProducto) => {
      item.option = 'none';
    });
    this.imagen1_aux = this.listImagenes[0].productsimageName!;
    this.imagen2_aux = this.listImagenes[1].productsimageName!;
    this.imagen3_aux = this.listImagenes[2].productsimageName!;
    this.imagen4_aux = this.listImagenes[3].productsimageName!;
    this.imagen5_aux = this.listImagenes[4].productsimageName!;
    this.imagen6_aux = this.listImagenes[5].productsimageName!;
    this.imagen7_aux = this.listImagenes[6].productsimageName!;
    this.imagen8_aux = this.listImagenes[7].productsimageName!;
    this.imagen9_aux = this.listImagenes[8].productsimageName!;
    this.imagen10_aux = this.listImagenes[9].productsimageName!;
    this.imagen11_aux = this.listImagenes[10].productsimageName!;

    this.productForm.get('videoURL')?.setValue(data.video[0].productsUrlVideo);
    let url = data.video[0].productsUrlVideo.replace('https://www.youtube.com/watch?v=', '', 'gi');
    const indice = url.indexOf('&');
    url = url.substr(0, indice);
    this.urlYoutube = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + url);
    this.productForm.get('packing')?.setValue(data.packing[0].packing_idpacking);
  }

  changeImagen(file: any, inputName: string) {
    this.productForm.get(inputName)!.setValue(file);
  }

  deleteImagen(file: any, inputName: string) {
    this.productForm.get(inputName)!.setValue(file);
  }

  eliminarImagenAnterior(index: number): void {
    const pos = index - 1;
    switch (pos) {
      case 2:
        this.imagen3_aux = '0';
        break;
      case 3:
        this.imagen4_aux = '0';
        break;
      case 4:
        this.imagen5_aux = '0';
        break;
      case 5:
        this.imagen6_aux = '0';
        break;
      case 6:
        this.imagen7_aux = '0';
        break;
      case 7:
        this.imagen8_aux = '0';
        break;
      case 8:
        this.imagen9_aux = '0';
        break;
      case 9:
        this.imagen10_aux = '0';
        break;
      case 10:
        this.imagen11_aux = '0';
        break;

      default:
        break;
    }
    this.listImagenes[pos].option = 'delete';

  }

  getListPackings(): void {
    this.packingService.getListaEmpaques('1').subscribe(result => {
      this.listPackings = result.data;
    });
  }

  get imagenPrincipal() { return this.productForm.get('imagenPrincipal')?.touched && this.productForm.get('imagenPrincipal')?.value == '' ? true : false; }
  get imagen1() { return this.productForm.get('imagen1')?.touched && this.productForm.get('imagen1')?.value == '' ? true : false; }
  get imagen2() { return this.productForm.get('imagen2')?.touched && this.productForm.get('imagen2')?.value == '' ? true : false; }
  get imagen3() { return this.productForm.get('imagen3')?.touched && this.productForm.get('imagen3')?.value == '' ? true : false; }
  get imagen4() { return this.productForm.get('imagen4')?.touched && this.productForm.get('imagen4')?.value == '' ? true : false; }
  get imagen5() { return this.productForm.get('imagen5')?.touched && this.productForm.get('imagen5')?.value == '' ? true : false; }
  get imagen6() { return this.productForm.get('imagen6')?.touched && this.productForm.get('imagen6')?.value == '' ? true : false; }
  get imagen7() { return this.productForm.get('imagen7')?.touched && this.productForm.get('imagen7')?.value == '' ? true : false; }
  get imagen8() { return this.productForm.get('imagen8')?.touched && this.productForm.get('imagen8')?.value == '' ? true : false; }
  get imagen9() { return this.productForm.get('imagen9')?.touched && this.productForm.get('imagen9')?.value == '' ? true : false; }
  get imagen10() { return this.productForm.get('imagen10')?.touched && this.productForm.get('imagen10')?.value == '' ? true : false; }

  onSubmit(): void {
    this.submitError = false;
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
    //Obtenemos los datos
    const dataForm = new FormData();
    dataForm.append('id', String(this.idProduct));
    dataForm.append('image1', this.productForm.value.imagenPrincipal);
    dataForm.append('image2', this.productForm.value.imagen1);
    dataForm.append('image3', this.productForm.value.imagen2);
    dataForm.append('image4', this.productForm.value.imagen3);
    dataForm.append('image5', this.productForm.value.imagen4);
    dataForm.append('image6', this.productForm.value.imagen5);
    dataForm.append('image7', this.productForm.value.imagen6);
    dataForm.append('image8', this.productForm.value.imagen7);
    dataForm.append('image9', this.productForm.value.imagen8);
    dataForm.append('image10', this.productForm.value.imagen9);
    dataForm.append('image11', this.productForm.value.imagen10);
    dataForm.append('urlVideo', this.productForm.value.videoURL);
    dataForm.append('idPacking', this.productForm.value.packing);

    if (this.mode == 'edit') {
      dataForm.append('image1_id', String(this.listImagenes[0].idproductsimage));
      dataForm.append('image1_name', String(this.listImagenes[0].productsimageName));
      dataForm.append('image1_option', this.getOptionImg(0));

      dataForm.append('image2_id', String(this.listImagenes[1].idproductsimage));
      dataForm.append('image2_name', String(this.listImagenes[1].productsimageName));
      dataForm.append('image2_option', this.getOptionImg(1));

      dataForm.append('image3_id', String(this.listImagenes[2].idproductsimage));
      dataForm.append('image3_name', String(this.listImagenes[2].productsimageName));
      dataForm.append('image3_option', this.getOptionImg(2));

      dataForm.append('image4_id', String(this.listImagenes[3].idproductsimage));
      dataForm.append('image4_name', String(this.listImagenes[3].productsimageName));
      dataForm.append('image4_option', this.getOptionImg(3));

      dataForm.append('image5_id', String(this.listImagenes[4].idproductsimage));
      dataForm.append('image5_name', String(this.listImagenes[4].productsimageName));
      dataForm.append('image5_option', this.getOptionImg(4));

      dataForm.append('image6_id', String(this.listImagenes[5].idproductsimage));
      dataForm.append('image6_name', String(this.listImagenes[5].productsimageName));
      dataForm.append('image6_option', this.getOptionImg(5));

      dataForm.append('image7_id', String(this.listImagenes[6].idproductsimage));
      dataForm.append('image7_name', String(this.listImagenes[6].productsimageName));
      dataForm.append('image7_option', this.getOptionImg(6));

      dataForm.append('image8_id', String(this.listImagenes[7].idproductsimage));
      dataForm.append('image8_name', String(this.listImagenes[7].productsimageName));
      dataForm.append('image8_option', this.getOptionImg(7));

      dataForm.append('image9_id', String(this.listImagenes[8].idproductsimage));
      dataForm.append('image9_name', String(this.listImagenes[8].productsimageName));
      dataForm.append('image9_option', this.getOptionImg(8));

      dataForm.append('image10_id', String(this.listImagenes[9].idproductsimage));
      dataForm.append('image10_name', String(this.listImagenes[9].productsimageName));
      dataForm.append('image10_option', this.getOptionImg(9));

      dataForm.append('image11_id', String(this.listImagenes[10].idproductsimage));
      dataForm.append('image11_name', String(this.listImagenes[10].productsimageName));
      dataForm.append('image11_option', this.getOptionImg(10));
    }

    switch (this.mode) {
      case 'create':
        this.productService.saveProductoStep2(dataForm).subscribe(response => {
          console.log(response);
          setTimeout(() => {
            this.router.navigate(['/admin/product/add/step3/' + this.idProduct]);
          }, 2000);
          Swal.fire({
            text: 'Se registró satisfactoriamente.',
            icon: 'success'
          });
        }, error => {
          Swal.fire({
            text: 'Hubo un error al guardar.',
            icon: 'error'
          });
          this.loading = false;
        });
        break;

      case 'edit':
        this.productService.updateProductoStep2(dataForm).subscribe(response => {
          console.log(response);
          this.loading = false;
          Swal.fire({
            text: 'Se actualizó satisfactoriamente.',
            icon: 'success'
          });
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

  getOptionImg(index: number): string {
    let option = 'none';
    if(this.productForm.get(`imagen${index+1}`)?.value != ''){
      option = 'edit';
    }else{
      if(this.listImagenes[index+1].option == 'delete'){
        option = 'delete';
      }
    }
    return option;
  }

  changeHasPacking(event: any): void {
    if (event.checked) {
      this.productForm.get('packing')?.enable();
    } else {
      this.productForm.get('packing')?.disable();
      this.productForm.get('packing')?.setValue('');
    }
  }

}

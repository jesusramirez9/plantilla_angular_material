import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Caracteristica } from 'src/app/models/Caracteristica';
import { Categoria } from 'src/app/models/Categoria';
import { Color } from 'src/app/models/Color';
import { Festividad } from 'src/app/models/Festividad';
import { TipoProducto } from 'src/app/models/TipoProducto';
import { ProductIntranetService } from 'src/app/services/intranet/product-intranet.service';
import { DialogColorComponent } from 'src/app/shared/dialog-color/dialog-color.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-step1',
  templateUrl: './product-step1.component.html',
  styleUrls: ['./product-step1.component.scss']
})
export class ProductStep1Component implements OnInit {

  @Input() product: any;
  @Input() idProduct: number = 0;
  @Input() mode: string = 'create';
  listCategories: Categoria[] = [];
  listFestivities: Festividad[] = [];
  listTypesProducts: TipoProducto[] = [];
  listColors: string[] = [];

  productForm = this.fb.group({
    nameP: ['', Validators.required],
    codeP: ['', Validators.required],
    nameDescription: ['', Validators.required],
    typeColor: ['unicolor'],
    category: ['', Validators.required],
    festivity: ['', Validators.required],
    typeP: ['', Validators.required],
    description1: [''],
    description2: [''],
    description3: [''],
    originPlace: [''],
    pdfProduct: [''],
    features: this.fb.array([])
  });
  loading: boolean = false;
  caracteristicas: Caracteristica[] = [];
  visibleRemoveFeature: boolean = false;
  buttonDeletePdf: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,
    private productService: ProductIntranetService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListCategories();
    this.getListFestivity();
    this.getListTypes();
    this.caracteristicas.push({
      id: 1,
      nombre: '',
      valor: ''
    });
  }

  mostrarDatosStep1(data: any): void {
    const producto = data.product[0];
    const colores = data.color;
    const categorias = data.category;
    const caracteristicas = data.feature;

    //Set nombre
    this.productForm.get('nameP')?.setValue(producto.productsName);
    //Set descripcion
    this.productForm.get('nameDescription')?.setValue(producto.productsNameDescription);
    //Set codigo
    this.productForm.get('codeP')?.setValue(producto.productsCode);
    //Set descripcion1
    this.productForm.get('description1')?.setValue(producto.productsDescription1);
    //Set descripcion2
    this.productForm.get('description2')?.setValue(producto.productsDescription2);
    //Set descripcion3
    this.productForm.get('description3')?.setValue(producto.productsDescription3);
    //Set colores
    colores.forEach((color: Color, index: number) => {
      if(index == 0){
        this.productForm.get('typeColor')?.setValue(color.colorType);
      }
      this.listColors.push(color.colorCode ? color.colorCode: '');
    });
    //Set categorias
    const arrayCategorias: number[] = [];
    categorias.forEach((category: Categoria) => {
      arrayCategorias.push(category.idproductscategory!);
    });
    this.productForm.get('category')?.setValue(arrayCategorias);
    //Set lugar de origen
    this.productForm.get('originPlace')?.setValue(producto.productsOriginPlace);
    //Set caracteristicas
    caracteristicas.forEach((item: Caracteristica) => {
      this.addFeature(item.featuresName!, item.featuresDetail!);
    });
    //Set PDF
    this.productForm.get('pdfProduct')?.setValue(producto.productsFilePdf);
  }

  getListCategories() {
    this.productService.getListaCategorias().subscribe(result => {
      this.listCategories = result.data;
    });
  }

  getListFestivity() {
    this.productService.getListaFestividades().subscribe(result => {
      this.listFestivities = result.data;
    });
  }

  getListTypes() {
    this.productService.getListaTipoProducto().subscribe(result => {
      this.listTypesProducts = result.data;
    });
  }

  //COLORES
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogColorComponent, {
      width: '320px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const typeColor = this.productForm.value.typeColor;
      if(result && result != ''){
        if (typeColor == 'unicolor') {
          this.listColors = [];
          this.listColors.push(result);
        } else {
          this.listColors.push(result);
        }
        console.log(this.listColors);
      }
    });
  }

  remove(color: string): void {
    const index = this.listColors.indexOf(color);
    if (index >= 0) {
      this.listColors.splice(index, 1);
    }
  }

  //CARACTERISTICAS
  addFeature(name:string, detail:string): void {
    const feature = this.fb.group({
      featuresName: [name, Validators.required],
      featuresDetail: [detail, Validators.required]
    });
    this.features.push(feature);
  }
  removeFeature(index: number): void {
    this.features.removeAt(index);
  }

  //PDF PRODUCTO
  changePdf(target: any) {
    for (let file of target.files) {
      this.productForm.get('pdfProduct')?.setValue(file);
      this.buttonDeletePdf = true;
    }
  }
  deletePdfProduct(imgElement: any): void {
    imgElement.value = null;
    this.productForm.get('pdfProduct')?.setValue('');
    this.buttonDeletePdf = false;
  }

  get features(): FormArray {
    return this.productForm.get('features') as FormArray;
  }
  get nameP() { return this.productForm.get('nameP')?.invalid && this.productForm.get('nameP')?.touched }
  get codeP() { return this.productForm.get('codeP')?.invalid && this.productForm.get('codeP')?.touched; }
  get nameDescription() { return this.productForm.get('nameDescription')?.invalid && this.productForm.get('nameDescription')?.touched; }
  get category() { return this.productForm.get('category')?.invalid && this.productForm.get('category')?.touched; }
  get festivity() { return this.productForm.get('festivity')?.invalid && this.productForm.get('festivity')?.touched; }
  get typeP() { return this.productForm.get('typeP')?.invalid && this.productForm.get('typeP')?.touched; }
  nameFeature(i:number){
    return this.features.at(i).get('featuresName')?.invalid && this.features.at(i).get('featuresName')?.touched;
  }
  detailFeature(i:number){
    return this.features.at(i).get('featuresDetail')?.invalid && this.features.at(i).get('featuresDetail')?.touched;
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
    //Obtenemos los datos
    const dataForm = new FormData();
    dataForm.append('name', this.productForm.value.nameP);
    dataForm.append('nameDescription', this.productForm.value.nameDescription);
    dataForm.append('code', this.productForm.value.codeP);
    dataForm.append('description1', this.productForm.value.description1);
    dataForm.append('description2', this.productForm.value.description2);
    dataForm.append('description3', this.productForm.value.description3);
    dataForm.append('filePDF', this.productForm.value.pdfProduct);
    dataForm.append('idSection', '1');
    dataForm.append('idTypeProduct', this.productForm.value.typeP);

    if(this.mode == 'edit'){
      dataForm.append('id', String(this.idProduct));
      dataForm.append('filePdf_name', '');
      dataForm.append('filePdf_option', '');
    }
    
    //CADENA CATEGORIAS
    const arrayCategory = this.productForm.value.category;
    let categoryStr = '';
    arrayCategory.forEach((item: number) => {
      categoryStr += `(${item});`;
    });
    dataForm.append('categoryStr', categoryStr);

    //CADENA CARACTERISTICAS
    let caracteristicasStr = '';
    this.caracteristicas.forEach((item: Caracteristica) => {
      caracteristicasStr += `(${item.nombre},${item.valor});`;
    });
    dataForm.append('featuresStr', caracteristicasStr);

    //CADENA CARACTERISTICAS
    let colorStr = '';
    this.listColors.forEach((item: string) => {
      colorStr += `(${item});`;
    });
    dataForm.append('colorStr', colorStr);

    dataForm.append('colorType', this.productForm.value.typeColor);
    dataForm.append('originPlace', this.productForm.value.originPlace);

    switch (this.mode) {
      case 'create':
        this.productService.saveProductoStep1(dataForm).subscribe(response => {
          console.log(response);
          const newIdProduct = response.data[0].idproducts;
          setTimeout(() => {
            this.router.navigate(['/admin/product/add/step2/'+newIdProduct]);
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
        this.productService.saveProductoStep1(dataForm).subscribe(response => {
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




  
}

import { Empaque } from './../../../../models/Empaque';
import { PackingIntranetService } from './../../../../services/intranet/packing-intranet.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-packing',
  templateUrl: './edit-packing.component.html',
  styleUrls: ['./edit-packing.component.scss']
})
export class EditPackingComponent implements OnInit {

  idPacking: number = 0;
  packingForm = this.fb.group({
    nameP: ['', [Validators.required]],
    codeP: ['', [Validators.required]],
    typeP: ['', [Validators.required]],
    descriptionP: ['', [Validators.required]],
    image1: [''],
    image2: [''],
    image3: ['']
  });
  loading: boolean = false;
  loadingData: boolean = true;
  submitSuccess: boolean = false;
  submitError: boolean = false;
  image1URL: string = '';
  image1Delete: boolean = true;
  image2URL: string = '';
  image2Delete: boolean = true;
  image3URL: string = '';
  image3Delete: boolean = true;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private packingService: PackingIntranetService) {
    this.activatedRoute.params.subscribe(p => {
      this.idPacking = p['id'];
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getPackingById();
  }

  getPackingById(){
    this.packingService.getDetailPacking(this.idPacking).subscribe(response => {
      console.log(response);
      if(response.data){
        const empaque: Empaque = response.data[0];
        this.packingForm.get('nameP')?.setValue(empaque.packingName);
        this.packingForm.get('codeP')?.setValue(empaque.packingCode);
        this.packingForm.get('descriptionP')?.setValue(empaque.packingDescription);
        this.packingForm.get('typeP')?.setValue(empaque.packingType);
        if(empaque.image1 != '0'){
          this.image1URL = empaque.image1!;
          this.image1Delete = false;
        }
        if(empaque.image2 != '0'){
          this.image2URL = empaque.image2!;
          this.image2Delete = false;
        }
        if(empaque.image3 != '0'){
          this.image3URL = empaque.image3!;
          this.image3Delete = false;
        }
      }
      this.loadingData = false;
    }, error => {
      console.log(error);
      this.router.navigate(['/admin/packing']);
    })
  }

  get nameP() { return this.packingForm.get('nameP')?.invalid && this.packingForm.get('nameP')?.touched }

  get codeP() { return this.packingForm.get('codeP')?.invalid && this.packingForm.get('codeP')?.touched; }
  
  get descriptionP() { return this.packingForm.get('descriptionP')?.invalid && this.packingForm.get('descriptionP')?.touched; }
  
  get typeP() { return this.packingForm.get('typeP')?.invalid && this.packingForm.get('typeP')?.touched; }
  
  get image1() { return this.packingForm.get('image1')?.touched && this.packingForm.get('image1')?.value == '' ? true : false; }
  
  get image2() { return this.packingForm.get('image2')?.touched && this.packingForm.get('image2')?.value == '' ? true : false; }
  
  get image3() { return this.packingForm.get('image3')?.touched && this.packingForm.get('image3')?.value == '' ? true : false; }

  onSubmit(): void {
    this.submitError = false;
    console.log(this.packingForm);
    if (this.packingForm.invalid) {
      return Object.values(this.packingForm.controls).forEach(control => {
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
    dataForm.append('id', String(this.idPacking));
    dataForm.append('name', this.packingForm.value.nameP);
    dataForm.append('code', this.packingForm.value.codeP);
    dataForm.append('description', this.packingForm.value.descriptionP);
    dataForm.append('type', 'especial');
    let indice = this.image1URL.lastIndexOf('/');
    dataForm.append('image1_name', indice != -1 ? this.image1URL.substring(indice+1) : '0');
    dataForm.append('image1_option', this.packingForm.value.image1 == '' ? 'none':'edit');
    indice = this.image2URL.lastIndexOf('/');
    dataForm.append('image2_name', indice != -1 ? this.image2URL.substring(indice+1) : '0');
    dataForm.append('image2_option', this.packingForm.value.image2 == '' ? 'none':'edit');
    indice = this.image3URL.lastIndexOf('/');
    dataForm.append('image3_name', indice != -1 ? this.image3URL.substring(indice+1) : '0');
    dataForm.append('image3_option', this.packingForm.value.image3 == '' ? 'none':'edit');
    dataForm.append('image1', this.packingForm.value.image1);
    dataForm.append('image2', this.packingForm.value.image2);
    dataForm.append('image3', this.packingForm.value.image3);

    this.packingService.updatePacking(dataForm).subscribe(response => {
      this.submitSuccess = true;
      console.log(response);
      setTimeout(() => {
        this.router.navigate(['/admin/packing']);
      }, 2000);
      Swal.fire({
        text: 'Se actualizó satisfactoriamente.',
        icon: 'success'
      });
    }, error => {
      Swal.fire({
        text: 'Hubo un error al actualizar.',
        icon: 'error'
      });
      this.submitError = true;
      this.loading = false;
    });
  }

  changeImagen(file:any, inputName: string){
    this.packingForm.get(inputName)!.setValue(file);
  }

  deleteImagen(file: any, inputName: string){
    this.packingForm.get(inputName)!.setValue(file);
  }

  deleteImgPreview1(){
    this.image1URL = '';
    this.image1Delete = true;
  }

  deleteImgPreview2(){
    this.image2URL = '';
    this.image2Delete = true;
  }

  deleteImgPreview3(){
    this.image3URL = '';
    this.image3Delete = true;
  }
}

import { PackingIntranetService } from './../../../../services/intranet/packing-intranet.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-packing',
  templateUrl: './add-packing.component.html',
  styleUrls: ['./add-packing.component.scss']
})
export class AddPackingComponent implements OnInit {

  packingForm = this.fb.group({
    nameP: ['', [Validators.required]],
    codeP: ['', [Validators.required]],
    descriptionP: ['', [Validators.required]],
    typeP: ['', [Validators.required]],
    image1: ['', [Validators.required]],
    image2: ['', [Validators.required]],
    image3: ['',]
  });
  loading: boolean = false;
  submitSuccess: boolean = false;
  submitError: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private packingService: PackingIntranetService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
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
    dataForm.append('name', this.packingForm.value.nameP);
    dataForm.append('code', this.packingForm.value.codeP);
    dataForm.append('description', this.packingForm.value.descriptionP);
    dataForm.append('image1', this.packingForm.value.image1);
    dataForm.append('image2', this.packingForm.value.image2);
    dataForm.append('image3', this.packingForm.value.image3);
    dataForm.append('type', this.packingForm.value.typeP);

    this.packingService.savePacking(dataForm).subscribe(response => {
      this.submitSuccess = true;
      console.log(response);
      setTimeout(() => {
        this.router.navigate(['/admin/packing']);
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
}

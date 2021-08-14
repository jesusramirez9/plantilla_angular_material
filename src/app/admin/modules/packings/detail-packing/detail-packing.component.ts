import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empaque } from 'src/app/models/Empaque';
import { PackingIntranetService } from 'src/app/services/intranet/packing-intranet.service';

@Component({
  selector: 'app-detail-packing',
  templateUrl: './detail-packing.component.html',
  styleUrls: ['./detail-packing.component.scss']
})
export class DetailPackingComponent implements OnInit {

  idPacking: number = 0;
  loading: boolean = false;
  loadingData: boolean = true;
  submitSuccess: boolean = false;
  submitError: boolean = false;
  empaque: Empaque = {};
  image1URL: string = '';
  image2URL: string = '';
  image3URL: string = '';
  stateActive: boolean = true;
  disabledState: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private packingService: PackingIntranetService) {
    this.activatedRoute.params.subscribe(p => {
      this.idPacking = p['id'];
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getPackingById();
  }

  getPackingById() {
    this.packingService.getDetailPacking(this.idPacking).subscribe(response => {
      console.log(response);
      if (response.data) {
        this.empaque = response.data[0];
        this.stateActive = this.empaque.packingState == 1 ? true : false;
        if (this.empaque.image1 != '0') {
          this.image1URL = this.empaque.image1!;
        }
        if (this.empaque.image2 != '0') {
          this.image2URL = this.empaque.image2!;
        }
        if (this.empaque.image3 != '0') {
          this.image3URL = this.empaque.image3!;
        }
      }
      this.loadingData = false;
    }, error => {
      console.log(error);
      this.router.navigate(['/admin/packing']);
    })
  }

  changeState(event: any): void {
    this.disabledState = true;
    const state = event.checked ? 1 : 2;
    this.packingService.changeStatePacking(this.idPacking, state).subscribe(response => {
      console.log(response);
      this.disabledState = false;
    }, error => {
      console.log(error);
      this.disabledState = false;
    });
  }
}

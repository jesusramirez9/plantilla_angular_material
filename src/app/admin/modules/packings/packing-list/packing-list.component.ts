import { PackingIntranetService } from './../../../../services/intranet/packing-intranet.service';
import { Empaque } from './../../../../models/Empaque';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent implements OnInit {

  listPackings: Empaque[] = [];
  loading: boolean = true;
  msgNoData: boolean = false;
  buttonActive: number = 9;

  constructor(private packingService: PackingIntranetService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getFilterPackings(9);
  }

  getFilterPackings(status: number): void{
    this.loading = true;
    this.msgNoData = false;
    this.listPackings = [];
    this.buttonActive = status;
    this.packingService.getListaEmpaques(`${status}`).subscribe(result => {
      this.loading = false;
      this.listPackings = result.data;
      if(this.listPackings.length == 0){
        this.msgNoData = true;
      }
    }, error => {
      this.loading = false;
      this.msgNoData = true;
    });
  }
}

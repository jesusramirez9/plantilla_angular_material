import { Component, Input, OnInit } from '@angular/core';
import { Empaque } from 'src/app/models/Empaque';
import { PackingIntranetService } from 'src/app/services/intranet/packing-intranet.service';

@Component({
  selector: 'app-packing-card',
  templateUrl: './packing-card.component.html',
  styleUrls: ['./packing-card.component.scss']
})
export class PackingCardComponent implements OnInit {

  @Input() data: Empaque = {};
  visible: boolean = true;

  constructor(private packingService: PackingIntranetService) { }

  ngOnInit(): void {
  }

  deleteP(idPacking: number): void {
    this.packingService.changeStatePacking(idPacking, 0).subscribe(response => {
      this.visible = false;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}

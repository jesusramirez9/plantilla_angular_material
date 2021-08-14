import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/models/Pedido';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  providers: [MatPaginatorIntl]
})
export class OrdersListComponent implements AfterViewInit {

  displayedColumns: string[] = ['codigo', 'total', 'estado', 'estado_pago', 'opciones'];
  dataSource = new MatTableDataSource<Pedido>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private customPag: MatPaginatorIntl) { 
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    this.customPag.itemsPerPageLabel = 'Filas por página';
    this.dataSource.paginator = this.paginator;
  }

  filterTable(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

const ELEMENT_DATA: Pedido[] = [
  { codigo: 'P00001', producto: 'Tazas de barro artesanales de la región de Puno', total: 1000.00, estado: 'Pendiente', estado_pago: 'Pago 50%' },
  { codigo: 'P00002', producto: 'Tazas de barro artesanales de la región de Puno', total: 1000.00, estado: 'En producción', estado_pago: 'Pago 100%' },
  { codigo: 'P00003', producto: 'Artesanía en barro', total: 500.50, estado: 'Cerrado', estado_pago: 'Pago 200.00' },
  { codigo: 'P00004', producto: 'Cuadros de madera tallados', total: 1500.00, estado: 'Cerrado', estado_pago: 'Pago 1500.00' }
];
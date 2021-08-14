import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Mensaje } from 'src/app/models/Mensaje';

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.scss'],
  providers: [MatPaginatorIntl]
})
export class ListMessagesComponent implements AfterViewInit {

  displayedColumns: string[] = ['usuario', 'asunto', 'producto', 'opciones'];
  dataSource = new MatTableDataSource<Mensaje>(ELEMENT_DATA);

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

const ELEMENT_DATA: Mensaje[] = [
  { index: 1, usuario: 'Usuario1', asunto: 'Compra de producto', producto: 'Tazas de barro artesanales de la región de Puno' },
  { index: 2, usuario: 'Usuario2', asunto: 'Consulta', producto: '---' },
  { index: 2, usuario: 'Usuario3', asunto: 'Consulta', producto: '---' },
  { index: 2, usuario: 'Usuario4', asunto: 'Consulta', producto: '---' },
];

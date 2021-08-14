import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: [{
    type: string,
    value: number
  }],
  subItems: SubMenu[];
  params: {};
}

export interface SubMenu {
  state: string;
  name: string;
  params: {};
}

const MENUITEMS = [
  {
    state: 'home',
    name: 'Inicio',
    type: 'link',
    icon: 'space_dashboard',
    params: {},
    subItems: []
  },
  {
    state: 'regalosCorporativos',
    name: 'Regalos corporativos',
    type: 'link',
    icon: 'space_dashboard',
    params: {},
    subItems: []
  },
  {
    state: '#',
    name: 'Proyectos HORECA',
    type: 'link',
    icon: 'space_dashboard',
    params: {},
    subItems: []
  },
  {
    state: '#',
    name: 'Licencias',
    type: 'link',
    icon: 'space_dashboard',
    params: {},
    subItems: []
  },
  {
    state: '#',
    name: 'Tiendas',
    type: 'link',
    icon: 'space_dashboard',
    params: {},
    subItems: []
  },
  {
    state: 'blog',
    name: 'Blog',
    type: 'link',
    icon: 'space_dashboard',
    params: {},
    subItems: []
  },
  // {
  //   state: 'messages',
  //   name: 'Mensajes',
  //   type: 'accordeon',
  //   icon: 'email',
  //   params: {},
  //   subItems: [
  //     {
  //       state: 'messages',
  //       name: 'Bandeja de entrada',
  //       params: {}
  //     },
  //     {
  //       state: 'messages/all',
  //       name: 'Todos',
  //       params: {}
  //     },
  //     {
  //       state: 'messages/no-read',
  //       name: 'No leídos',
  //       params: {},
  //     },
  //     {
  //       state: 'messages/archived',
  //       name: 'Archivados',
  //       params: {},
  //     }
  //   ]
  // },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}

import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpresaAuth } from 'src/app/models/EmpresaAuth';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { MenuItems } from 'src/app/shared/menu-items/menu-items';

@Component({
  selector: 'app-layoutweb',
  templateUrl: './layoutweb.component.html',
  styleUrls: ['./layoutweb.component.scss']
})
export class LayoutwebComponent implements OnDestroy, AfterViewInit {
  currentCompany: EmpresaAuth = {};
  enabledMenu: boolean = false;
  actionDialog: string = '';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  menu_open: boolean = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService, public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, public menuItems: MenuItems,) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authenticationService.currentCompany.subscribe((x) => {
      this.currentCompany = x;
      if (x.companyManagerMail) {
        this.enabledMenu = true;
      }
    });
  }
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  statusSidenav(event:any){
    this.menu_open = event;
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 15;
  }

  logout() {
    this.authenticationService.logout();
    this.enabledMenu = false;
    this.router.navigate(['/']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.actionDialog = result;
      switch (this.actionDialog) {
        case 'openRegister':
          this.openDialogRegister();
          break;
      
        default:
          break;
      }
    });
  }

  openDialogRegister(): void {
    const dialogRef = this.dialog.open(DialogRegister, {
      width: '350px'
    });
  }

  closeSidenav(sidenav:any): void{
    sidenav.close();
  }

}

@Component({
  selector: 'dialog-register',
  templateUrl: 'register.component.html',
})
export class DialogRegister {

  constructor(
    public dialogRef: MatDialogRef<DialogRegister>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
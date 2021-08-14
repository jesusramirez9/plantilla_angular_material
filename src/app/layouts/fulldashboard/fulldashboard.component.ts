import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaAuth } from 'src/app/models/EmpresaAuth';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { MenuItems } from 'src/app/shared/menu-items/menu-items';

@Component({
  selector: 'app-admin',
  templateUrl: './fulldashboard.component.html',
  styleUrls: ['./fulldashboard.component.scss']
})
export class FullDashboardComponent implements OnDestroy, AfterViewInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  currentCompany: EmpresaAuth = {};
  enabledMenuAdmin: boolean = false;
  icon_menu: string = 'menu';

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authenticationService.currentCompany.subscribe((x) => {
      this.currentCompany = x;
      if (x.companyManagerMail) {
        this.enabledMenuAdmin = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() { }

  logout() {
    this.authenticationService.logout();
    this.enabledMenuAdmin = false;
    this.router.navigate(['/login']);
  }

  statusSidenav(event:any){
    this.icon_menu = event ? 'close':'menu';
  }

  closeSidenav(sidenav:any): void{
    sidenav.close();
  }

}

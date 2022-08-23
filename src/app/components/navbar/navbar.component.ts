import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AsyncPipe } from "@angular/common";
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from "@angular/material/sidenav";
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { map, Observable, shareReplay } from "rxjs";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  toggleControl: FormControl;
  @HostBinding('class') className = '';
  panelOpenState = false;
  model:any={};

  constructor(
    private translocoService: TranslocoService,
    private overlay: OverlayContainer,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private asyncPipe: AsyncPipe,
    
  ) { }

  isHandset: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  closeDrawer(drawer: MatDrawer): void {
    const handset = this.asyncPipe.transform(this.isHandset);

    if (handset) {
      drawer.toggle();
    }
    else return;
  }

  ngOnInit(): void {
    this.toggleControl = new FormControl(
      localStorage.getItem('mode') === 'dark'
    );
    this.getTheme(this.toggleControl.value);
    // this.overlay.getContainerElement().classList.add("darkMode")
    // const darkMode = this.toggleControl.value;
    this.toggleControl.valueChanges.subscribe((darkMode) => {

      this.getTheme(darkMode);

    });
  }
  

  getTheme(darkMode: boolean) {
    const darkClassName = 'darkMode';
    this.className = darkMode ? darkClassName : '';

    if (darkMode) {
      this.overlay.getContainerElement().classList.add(darkClassName);
      localStorage.setItem('mode', 'dark');
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
      localStorage.setItem('mode', 'light');
    }
  }
  
   logOut(){
    localStorage.removeItem("token");
    console.log("logout");
    this.router.navigate(['/login']);
   }
  changeLanguage(language: 'tr' | 'en') {
    this.translocoService.setActiveLang(language);
  }
}

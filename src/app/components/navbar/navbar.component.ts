import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  toggleControl: FormControl = new FormControl( );
  @HostBinding('class') className = '';

  ngOnInit(): void {
    // this.overlay.getContainerElement().classList.add("darkMode")
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      console.log(darkMode);

      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';

      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }

      console.log(this.overlay.getContainerElement().classList);
    });
  }

  constructor(private translocoService: TranslocoService, private overlay: OverlayContainer, private router: Router) {
  }

  changeLanguage(language: "tr" | "en") {
    this.translocoService.setActiveLang(language);
  }
}

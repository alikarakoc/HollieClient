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
  toggleControl: FormControl;
  @HostBinding('class') className = '';

  ngOnInit(): void {
    this.toggleControl = new FormControl(localStorage.getItem('mode') === 'dark');
    this.getTheme(this.toggleControl.value);
    // this.overlay.getContainerElement().classList.add("darkMode")
    // const darkMode = this.toggleControl.value;
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      // console.log(darkMode);

      this.getTheme(darkMode);

      // console.log(this.overlay.getContainerElement().classList);
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

  constructor(private translocoService: TranslocoService, private overlay: OverlayContainer, private router: Router) {
  }

  changeLanguage(language: "tr" | "en") {
    this.translocoService.setActiveLang(language);
  }
}

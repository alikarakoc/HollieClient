import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private translocoService: TranslocoService) { }

  changeLanguage(language: "tr" | "en") {
    this.translocoService.setActiveLang(language);
  }
}
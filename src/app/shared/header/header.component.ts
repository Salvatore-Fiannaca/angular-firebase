import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  admin: boolean;

  constructor(public AuthService: AuthService) {
    this.admin = this.AuthService.isLoggedIn;
  }

  ngOnInit() {}

  closeNavBar() {
    const menu: HTMLElement = document.querySelector('#menu-toggle');
    if (window.innerWidth < 1024) menu.click();
  }

  logout() {
    this.admin = false;
    this.AuthService.SignOut();
  }
}

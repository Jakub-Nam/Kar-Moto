import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hideLoginButton = true;
  toggleNavbar = true;
  showAdminInterface = false;
  marked = false;
  isNavbarCollapsed = true;
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      user => {
        if (user === null) {
          return;
        }
        else {
          this.changeButtonsVisability();
        }

        if (user.email !== 'kubanam1995@gmail.com' && user.email !== null) { this.marked = true; }
        else { this.showAdminInterface = true; }
      });

    this.authService.autoLogin();
  }
  logout() {
    this.authService.logout();
    this.changeButtonsVisability();
    this.showAdminInterface = false;
    this.marked = false;
  }
  changeButtonsVisability() {
    this.hideLoginButton = !this.hideLoginButton;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isBtnVisability = true;
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
        if (user === this.authService.emptyUser) {
          this.changeButtonsVisability(true);
        }
        else {
          this.changeButtonsVisability(false);
          return;
        }
      });

    this.authService.autoLogin();
  }
  logout() {
    this.authService.logout();
    this.changeButtonsVisability(true);
    this.showAdminInterface = false;
    this.marked = false;
  }
  changeButtonsVisability(isVisible: boolean) {
    this.isBtnVisability = isVisible;
  }
}

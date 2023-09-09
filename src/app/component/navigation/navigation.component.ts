import {Component, HostListener, Input, OnInit} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {ActivatedRoute, Route, Router, UrlSegment} from "@angular/router";
import {
  ACCOUNT_EDIT,
  GROUPS,
  HOME,
  LOGIN,
  NOTIFICATIONS,
  PROFILE,
  PROFILE_EDIT
} from "../../constants/app.constants";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [transitionAnimation]
})
export class NavigationComponent implements OnInit {
  isSticky = false;
  navbarHeight = 50;
  currentRoute = ''
  @Input() fetch: string = ''

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.setDefaultRoute()
    this.route.snapshot.url
  }

  private setDefaultRoute() {
    this.setCurrentRoute(null)
  }

  private setCurrentRoute(route: string | null) {
    if (route !== null) {
      this.currentRoute = route
      return
    }
    const routeTmp: string | null = this.router.url.split('/')[1]
    this.currentRoute = routeTmp !== null ? routeTmp : ''
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= this.navbarHeight;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([`/${LOGIN}`]).then(r => this.handleNavigation(LOGIN));
    })
  }

  isHome() {
    return this.route.snapshot.url[0].path.includes(HOME);
  }

  isProfile() {
    return this.route.snapshot.url[0].path.includes(PROFILE) && !this.route.snapshot.url[0].path.includes(PROFILE_EDIT);
  }

  isGroups() {
    return this.route.snapshot.url[0].path.includes(GROUPS);
  }

  isAccountEdit() {
    return this.route.snapshot.url[0].path.includes(ACCOUNT_EDIT);
  }

  isNotifications() {
    return this.route.snapshot.url[0].path.includes(NOTIFICATIONS);
  }

  isProfileOrEdit() {
    return this.currentRoute === `${PROFILE}` || this.currentRoute === `${PROFILE_EDIT}`
  }

  private handleNavigation(route: string) {
    console.log(`Navigating to ${route} page`)
    this.setCurrentRoute(route)
  }

  protected readonly HOME = HOME;
  protected readonly GROUPS = GROUPS;
  protected readonly PROFILE_EDIT = PROFILE_EDIT;
  protected readonly PROFILE = PROFILE;
  protected readonly NOTIFICATIONS = NOTIFICATIONS;
  protected readonly ACCOUNT_EDIT = ACCOUNT_EDIT;
}

import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {ActivatedRoute, Route, Router, UrlSegment} from "@angular/router";
import {
  ACCOUNT_EDIT, GROUP, GROUP_CREATE,
  GROUPS,
  HOME,
  LOGIN,
  NOTIFICATIONS,
  PROFILE,
  PROFILE_EDIT
} from "../../constants/app.constants";
import {AuthService} from "../../service/auth/auth.service";
import {GroupService} from "../../service/group/group.service";

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
    groupToggle = false;
    @Output() toggleGroupEvent = new EventEmitter<boolean>();
    @Output() toggleMyEvent = new EventEmitter<boolean>();
    @Output() toggleSearchEvent = new EventEmitter<string | null>();
    @Input() search: string | null = null;
    @Input() groupButtonShow: boolean = false;
    @Input() createPostButtonShow: boolean = false;

    constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private groupService: GroupService) {

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

    toGroup() {
      const id = this.route.snapshot.paramMap.get("id")
      if(!id) {
        console.error("Missing id of group in url")
        return
      }
      this.router.navigate([`/${GROUP.replace(":id", id)}`]).then(r => this.handleNavigation(GROUP));
    }

    isHome() {
      return this.getFullRoute() === HOME
    }

    isGroups() {
        return this.getFullRoute() === GROUPS && this.route.snapshot.paramMap.get("id") === null
    }

    inGroupDomain() {
        return this.isGroupCreate() || this.isGroups()
    }

    isAccountEdit() {
        return this.getFullRoute() === ACCOUNT_EDIT;
    }

    isNotifications() {
        return this.getFullRoute() === NOTIFICATIONS;
    }

    isGroupCreate() {
        return this.getFullRoute() === GROUP_CREATE;
    }

    isProfile() {
        return this.currentRoute === `${PROFILE}`
    }

    isPosts() {
        return this.currentRoute.includes("/groups/") && this.currentRoute.includes("/posts")
    }

    isPostCreate() {
        return this.currentRoute.includes("/groups/") && this.currentRoute.includes("/post-create")
    }

    isGroupList() {

    }

    isGroup() {
        return this.getFullRoute().endsWith("/group-single")
    }

    isSubrouteOfGroup() {
      return this.getFullRoute().includes("group-single")
    }

    isGroupEdit() {

    }

    isPost() {

    }

    isPostEdit() {

    }

    isMembers() {

    }

    private getFullRoute() {
      return this.route.snapshot.url.join('/')
    }

    isMy() {
        return this.groupService.isMy()
    }

    myGroups() {
        return this.isMy() ? 'My Groups' : 'All groups'
    }

    toggleMy() {
        this.search = null
        this.groupService.toggleMy()
        this.toggleMyEvent.emit(this.groupService.isMy());
    }

    toggleSearch() {
        this.toggleSearchEvent.emit(this.search);
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
    protected readonly GROUP_CREATE = GROUP_CREATE;
}

import {Component, HostListener} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {Router} from "@angular/router";
import {GROOPS, GROUPS, HOME, NOTIFICATIONS, PROFILE} from "../../constants/app.constants";
import {AuthService} from "../../service/auth/auth.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    animations: [transitionAnimation]
})
export class NavigationComponent {
    isSticky = false;
    navbarHeight = 50;


    constructor(private router: Router, private authService: AuthService) {

    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isSticky = window.pageYOffset >= this.navbarHeight;
    }

    toHome() {
        this.router.navigate([`/${HOME}`]).then(() => console.log(`Navigating to ${HOME} page`));
    }

    toProfile() {
        this.router.navigate([`/${PROFILE}`]).then(() => console.log(`Navigating to ${PROFILE} page`));
    }

    toGroups() {
        this.router.navigate([`/${GROUPS}`]).then(() => console.log(`Navigating to ${GROUPS} page`));
    }

    toNotifications() {
        this.router.navigate([`/${NOTIFICATIONS}`]).then(() => console.log(`Navigating to ${NOTIFICATIONS} page`));
    }

    logout() {
        this.authService.logout().subscribe()
    }

}

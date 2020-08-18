import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from '../creditmodal/modal';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private showCredit: boolean;
    private userCredit: number;

    constructor(public location: Location, private router: Router, private authService: AuthService, private modalService: NgbModal) {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
     
     if(this.isUserLogged()) this.getUserCredits();
    }

    open() {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.name = 'World';
    }

    isUserLogged(){
        return this.authService.getCurrentUser();
    }

    isBrand(){
        if(this.authService.getCurrentUser()){
            if (this.authService.getCurrentUser().brand) return true;
            else if(this.authService.getCurrentUser().influencer) return false;
        }else{
            return true;
        }
    }

    isInfluencer(){
        if(this.authService.getCurrentUser()){
            if (this.authService.getCurrentUser().influencer) return true;
            else if(this.authService.getCurrentUser().brand) return false;
        }
    }

    logOut(){
        this.authService.logoutUser();
        this.router.navigateByUrl('/home');
    }

    getUserCredits(){
        this.userCredit = Number(this.authService.getCurrentUser().credits); // getuser credit
        if(this.userCredit>0) this.showCredit = true;
        else this.showCredit = false;
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    getPath(){
        return this.router.url;
    }
}

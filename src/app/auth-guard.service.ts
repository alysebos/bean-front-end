import { Injectable }     from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot }    from '@angular/router';
import { Router } from '@angular/router';
import { ServerService } from './server.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private server: ServerService
    ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if (!this.server.isLoggedIn) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    
  }
}
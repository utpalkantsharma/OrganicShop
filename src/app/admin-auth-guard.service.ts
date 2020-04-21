import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService,
    private userService: UserService,
    private authServic:AuthService) { }

  canActivate(): Observable<boolean>{
    return this.authServic.appUser$.map(appUser=>appUser.isAdmin);
  }

}

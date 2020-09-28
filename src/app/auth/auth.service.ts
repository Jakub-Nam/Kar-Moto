import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    constructor(
        public afAuth: AngularFireAuth
        ) { }

    login(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password);

    }

    autoLogin() {
        const userData: {
            email: string;
            password: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') || '{}');
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.password,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
        }
        this.login(userData.email, userData.password);
    }

    logout() {
        this.user.next(null);
        this.afAuth.signOut();
        localStorage.clear();
    }
}

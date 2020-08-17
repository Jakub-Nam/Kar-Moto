import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    adminInterface = false;
    constructor(
        private router: Router,
        public afAuth: AngularFireAuth,
        private db: AngularFirestore) { }

    // signUp(email, password) {
    //     return this.afAuth.createUserWithEmailAndPassword(email, password)
    //         .then((result) => {
    //             window.alert('You have been successfully registered!');
    //         }).catch((error) => {
    //             window.alert(error.message);
    //         });
    // }

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
        } = JSON.parse(localStorage.getItem('userData'));
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
    showAdminInterface() {
        this.adminInterface = true;
    }
}

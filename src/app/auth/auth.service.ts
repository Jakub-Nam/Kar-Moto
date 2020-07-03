import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


// export interface AuthResponseData {
//     kind: string;
//     idToken: string;
//     email: string;
//     refreshToken: string;
//     expiresIn: string;
//     localId: string;
//     registered?: boolean;
// }

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    adminInterface = false;
    constructor(private router: Router,
        // tslint:disable-next-line: align
        public afAuth: AngularFireAuth,
        // tslint:disable-next-line: align
        private db: AngularFirestore) { }

    signUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                window.alert('You have been successfully registered!');
                console.log(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    login(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password);

    }
    // private handleAuthentication(
    //     email: string,
    //     userId: string,
    //     token: string,
    //     expiresIn: any
    // ) {
    //     const expirationDate = new Date(
    //         new Date().getTime() + expiresIn * 1000 + 111600000 // expiresIn - default one hour (s), *1000(ms), 111600000ms (31h)
    //     );
    //     const user = new User(
    //         email,
    //         userId,
    //         token,
    //         expirationDate
    //     );
    //     this.user.next(user);
    //     localStorage.setItem('userData', JSON.stringify(user));
    // }
    // autoLogin() {
    //     console.log('aautologin');
    //     const userData: {
    //         email: string;
    //         id: string;
    //         _token: string;
    //         _tokenExpirationDate: string;
    //     } = JSON.parse(localStorage.getItem('userData'));
    //     if (!userData) {
    //         return;
    //     }
    //     const loadedUser = new User(
    //         userData.email,
    //         userData.id,
    //         userData._token,
    //         new Date(userData._tokenExpirationDate)
    //     );
    //     if (loadedUser.token) {
    //         this.user.next(loadedUser);
    //         console.log('loaded', loadedUser, this.user.value.email, 'ussser');
    //         // this.email = userData.email;
    //     } // only true when it s a valid token
    // }

    logout() {
        this.user.next(null);
        this.afAuth.signOut();
        localStorage.clear();
    }
    showAdminInterface() {
        this.adminInterface = true;
    }
}

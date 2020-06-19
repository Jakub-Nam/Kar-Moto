import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    email;
    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbSauUr1YkU_v1enIstincLP8-F2aGNLQ',
            {// tslint:disable-next-line: object-literal-shorthand
                email: email,
                // tslint:disable-next-line: object-literal-shorthand
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }
    login(email: string, password: string) {
        this.email = email;
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbSauUr1YkU_v1enIstincLP8-F2aGNLQ',
            {// tslint:disable-next-line: object-literal-shorthand
                email: email,
                // tslint:disable-next-line: object-literal-shorthand
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }
    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
        ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000 + 111600000 // expiresIn - default one hour (s), *1000(ms), 111600000ms (31h)
        );
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    autoLogin() {
        console.log('aautologin');
        // const userData: {
        //     email: string;
        //     id: string;
        //     _token: string;
        //     _tokenExpirationDate: string;
        // } = JSON.parse(localStorage.getItem('userData'));
        // if (!userData) {
        //     return;
        // }
        // const loadedUser = new User(
        //     userData.email,
        //     userData.id,
        //     userData._token,
        //     new Date(userData._tokenExpirationDate)
        //     );
        // if (loadedUser.token) {
        //     this.user.next(loadedUser);
        //     this.email = userData.email;
        // } // only true when it s a valid token
    }

    logout() {
        this.user.next(null);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'Wystąpił nieznany błąd!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Ten email już istnieje.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = `Ten email nie istnieje.`;
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Nieprawidłowe hasło.';
                break;
        }
        return throwError(errorMessage);
    }
}

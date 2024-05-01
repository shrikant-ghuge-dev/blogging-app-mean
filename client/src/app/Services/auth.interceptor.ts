import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LoaderService } from "./loader.service";
import { inject } from "@angular/core";
// import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const loaderService = inject(LoaderService)
    const router = inject(Router);
    // Inject the current `AuthService` and use it to get an authentication token:
    const authToken = localStorage.getItem("Token") || '';
    // Show loader before sending the request
    loaderService.showLoader();

    if (!req.url.includes('/admin')) {
        if (req.method === "GET" || req.url.includes('/api/v1/auth/login') || req.url.includes('/api/v1/auth/register') || req.url.includes('/api/v1/auth/forgot-password') || req.url.includes('/api/v1/auth/reset-password')) {
            return next(req).pipe(
                finalize(() => {
                    // Hide loader when the response is received
                    loaderService.hideLoader();
                })
            )
        }
    }

    // Clone the request to add the authentication header.
    const newHeaders = req.headers.append('Authorization', `Bearer ${authToken}`);
    const newReq = req.clone({ headers: newHeaders });
    return next(newReq).pipe(
        finalize(() => {
            // Hide loader when the response is received
            loaderService.hideLoader();
        }),
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Token expired, redirect to sign-in page
                router.navigate(['/signin']);
            }
            return throwError(error);
        })
    );
}
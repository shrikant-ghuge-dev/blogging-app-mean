import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LoaderService } from "./loader.service";
import { inject } from "@angular/core";
import { finalize } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const loaderService = inject(LoaderService)
    // Inject the current `AuthService` and use it to get an authentication token:
    const authToken = localStorage.getItem("Token") || '';
    // Show loader before sending the request
    loaderService.showLoader();

    if (req.method === "GET" || req.url.includes('/api/v1/auth/login') || req.url.includes('/api/v1/auth/register') || req.url.includes('/api/v1/auth/forgot-password') || req.url.includes('/api/v1/auth/reset-password')) {
        return next(req).pipe(
            finalize(() => {
                // Hide loader when the response is received
                loaderService.hideLoader();
            })
        )
    }

    // Clone the request to add the authentication header.
    const newHeaders = req.headers.append('Authorization', `Bearer ${authToken}`);
    const newReq = req.clone({ headers: newHeaders });
    return next(newReq).pipe(
        finalize(() => {
            // Hide loader when the response is received
            loaderService.hideLoader();
        })
    );
}
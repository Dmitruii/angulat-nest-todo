import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, tap } from "rxjs"
import { ToastService } from "../services/toast.service"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastService: ToastService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.toastService.handle({
                        type: 'error', 
                        title: error.message,
                        message: JSON.stringify(error.error.message || error.error)
                    })
                    throw error
                })
            )
    }
}
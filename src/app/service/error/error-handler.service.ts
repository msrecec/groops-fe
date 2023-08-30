import {Injectable} from '@angular/core';
import {Error} from "../../model/error.model";
import {throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() {
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    console.error(`Error occurred:  ${errorRes.error != null ? errorRes.error.message : 'unknown'}`)
    if (errorRes.message != null && errorRes.message.length > 0) {
      return throwError(() => errorRes.message);
    }
    return throwError(() => errorMessage);
  }
}

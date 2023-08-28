import { Injectable } from '@angular/core';
import {Error} from "../../model/error.model";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleError(errorRes: Error) {
    let errorMessage = 'An unknown error occurred';

    if (errorRes.message != null && errorRes.message.length > 0) {
      return throwError(() => errorRes.message);
    }
    return throwError(() => errorMessage);
  }
}

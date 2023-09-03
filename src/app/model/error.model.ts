export class Error {
  private _success: Boolean;
  private _message: String;
  private _status: Number


  constructor(success: Boolean, message: String, status: Number) {
    this._success = success;
    this._message = message;
    this._status = status
  }


  get success(): Boolean {
    return this._success;
  }

  set success(value: Boolean) {
    this._success = value;
  }

  get message(): String {
    return this._message;
  }

  set message(value: String) {
    this._message = value;
  }

  get status(): Number {
    return this._status;
  }

  set status(value: Number) {
    this._status = value;
  }
}

export class Error {
  private _success: Boolean;
  private _message: String;


  constructor(success: Boolean, message: String) {
    this._success = success;
    this._message = message;
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
}

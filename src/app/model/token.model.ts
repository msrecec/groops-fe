export class Token {
  private _id: string;
  private _u: string;
  private _sub: string;
  private _iss: string;
  private _exp: number;
  private _iat: number;
  private _alg: string;


  constructor(id: string, u: string, sub: string, iss: string, exp: number, iat: number, alg: string) {
    this._id = id;
    this._u = u;
    this._sub = sub;
    this._iss = iss;
    this._exp = exp;
    this._iat = iat;
    this._alg = alg;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get u(): string {
    return this._u;
  }

  set u(value: string) {
    this._u = value;
  }

  get sub(): string {
    return this._sub;
  }

  set sub(value: string) {
    this._sub = value;
  }

  get iss(): string {
    return this._iss;
  }

  set iss(value: string) {
    this._iss = value;
  }

  get exp(): number {
    return this._exp;
  }

  set exp(value: number) {
    this._exp = value;
  }

  get iat(): number {
    return this._iat;
  }

  set iat(value: number) {
    this._iat = value;
  }

  get alg(): string {
    return this._alg;
  }

  set alg(value: string) {
    this._alg = value;
  }
}

export class User {
  private _id: Number;
  private _username: String;
  private _password: String;
  private _email: String;
  private _firstName: String;
  private _lastName: String;
  private _dateOfBirth: Date;
  private _description: String;
  private _profilePictureDownloadLink: String;


  constructor(id: Number, username: String, password: String, email: String, firstName: String, lastName: String, dateOfBirth: Date, description: String, profilePictureDownloadLink: String) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
    this._dateOfBirth = dateOfBirth;
    this._description = description;
    this._profilePictureDownloadLink = profilePictureDownloadLink;
  }


  get id(): Number {
    return this._id;
  }

  set id(value: Number) {
    this._id = value;
  }

  get username(): String {
    return this._username;
  }

  set username(value: String) {
    this._username = value;
  }

  get password(): String {
    return this._password;
  }

  set password(value: String) {
    this._password = value;
  }

  get email(): String {
    return this._email;
  }

  set email(value: String) {
    this._email = value;
  }

  get firstName(): String {
    return this._firstName;
  }

  set firstName(value: String) {
    this._firstName = value;
  }

  get lastName(): String {
    return this._lastName;
  }

  set lastName(value: String) {
    this._lastName = value;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  get profilePictureDownloadLink(): String {
    return this._profilePictureDownloadLink;
  }

  set profilePictureDownloadLink(value: String) {
    this._profilePictureDownloadLink = value;
  }
}

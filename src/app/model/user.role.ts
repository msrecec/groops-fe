import {User} from "./user.model";
import {RoleEnum} from "./enum/role.constants";

export class UserRole extends User {
  private _role: RoleEnum;

  constructor(id: Number, username: String, password: String, email: String, firstName: String, lastName: String, dateOfBirth: Date, description: String, profilePictureDownloadLink: String, profilePictureThumbnailDownloadLink: String, role: RoleEnum) {
    super(id, username, password, email, firstName, lastName, dateOfBirth, description, profilePictureDownloadLink, profilePictureThumbnailDownloadLink);
    this._role = role;
  }


  get role(): RoleEnum {
    return this._role;
  }

  set role(value: RoleEnum) {
    this._role = value;
  }
}

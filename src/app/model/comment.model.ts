import {User} from "./user.model";
import {Post} from "./post.model";

export class Comment {
  private _id: number;
  private _text: string;
  private _user: User;
  private _post: Post


  constructor(id: number, text: string, user: User, post: Post) {
    this._id = id;
    this._text = text;
    this._user = user;
    this._post = post;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get post(): Post {
    return this._post;
  }

  set post(value: Post) {
    this._post = value;
  }
}

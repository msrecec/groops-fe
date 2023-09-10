export class Group {
    private _id: number;
    private _name: String;
    private _profilePictureDownloadLink: String;
    private _profilePictureThumbnailDownloadLink: String;
    private _my: boolean | null;
    private _sentJoin: boolean | null;


    constructor(id: number, name: String, profilePictureDownloadLink: String, profilePictureThumbnailDownloadLink: String, my: boolean | null, sentJoin: boolean | null) {
        this._id = id;
        this._name = name;
        this._profilePictureDownloadLink = profilePictureDownloadLink;
        this._profilePictureThumbnailDownloadLink = profilePictureThumbnailDownloadLink;
        this._my = my
        this._sentJoin = sentJoin
    }


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }

    get profilePictureDownloadLink(): String {
        return this._profilePictureDownloadLink;
    }

    set profilePictureDownloadLink(value: String) {
        this._profilePictureDownloadLink = value;
    }

    get profilePictureThumbnailDownloadLink(): String {
        return this._profilePictureThumbnailDownloadLink;
    }

    set profilePictureThumbnailDownloadLink(value: String) {
        this._profilePictureThumbnailDownloadLink = value;
    }


    get my(): boolean | null {
        return this._my;
    }

    set my(value: boolean | null) {
        this._my = value;
    }


    get sentJoin(): boolean | null {
        return this._sentJoin;
    }

    set sentJoin(value: boolean | null) {
        this._sentJoin = value;
    }
}

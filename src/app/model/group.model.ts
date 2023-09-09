export class Group {
    private _id: number;
    private _name: String;
    private _profilePictureDownloadLink: String;
    private _profilePictureThumbnailDownloadLink: String;


    constructor(id: number, name: String, profilePictureDownloadLink: String, profilePictureThumbnailDownloadLink: String) {
        this._id = id;
        this._name = name;
        this._profilePictureDownloadLink = profilePictureDownloadLink;
        this._profilePictureThumbnailDownloadLink = profilePictureThumbnailDownloadLink;
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
}

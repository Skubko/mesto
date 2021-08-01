export default class UserInfo {
    constructor(nameSelector, jobSelector, srcSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileJob = document.querySelector(jobSelector);
        this._profileFoto = document.querySelector(srcSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._profileName.textContent;
        this._userInfo.about = this._profileJob.textContent;
        return this._userInfo;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileJob.textContent = data.about;
        this._profileFoto.src = data.avatar;
    }

}
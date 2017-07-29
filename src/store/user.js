import { observable } from "mobx";

class User {
    @observable image_url = "";
    @observable name = "";
    @observable joined_pids = [];
    @observable owned_pids = [];
    @observable introduction = "";
}


class Users {
    @observable users = [];
}

const users = new Users()

export default users.users;

import {observable, autorun, action} from "mobx";

export class User {
    @observable image_url = "";
    @observable name = "";
    @observable joined_pids = [];
    @observable owned_pids = [];
}

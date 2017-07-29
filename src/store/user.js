import {action, autorun, observable} from "mobx";

export default class User {
    @observable image_url = "";
    @observable name = "";
    @observable joined_pids = [];
    @observable owned_pids = [];
}

import {observable, autorun, action} from "mobx";

export default class Project {
    @observable image_url = "";
    @observable title = "";
    @observable abstract = "";
    @observable valuation = "";
}

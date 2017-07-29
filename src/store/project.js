import {action, autorun, observable} from "mobx";

import user from './user'

export default class Project {
    @observable image_url = "";
    @observable title = "";
    @observable abstract = "";
    @observable valuation = "";
    @observable members = [];
}

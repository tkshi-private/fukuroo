import {action, autorun, observable} from "mobx";

export default class Project {
  @observable pid = ""
  @observable image_url = "";
  @observable title = "";
  @observable abstract = "";
  @observable valuation = "";
  @observable members = [];
}

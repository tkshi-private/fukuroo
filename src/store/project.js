import User from './user'
import {observable, autorun, action} from "mobx";

export default class Project {
    @observable image_url = "";
    @observable title = "";
    @observable abstract = "";
    @observable valuation = "";
    @observable members = [];
}

let project = new Project()
project.image_url = "https://static.pepy.jp/wp-content/uploads/2015/01/06115944/540bca3b8a7377bf8aabd4c1e751a31c-e1483577178335.jpg";
project.title = "ハタラコ！！";
project.abstract = "働け！";
project.valuation = 100;

let user = new User()
user.name = "林田敦"

let member = {
  role : "エンジニア",
  stock_amount : 100,
  stock_share : 50,
  user : user
}

project.members.push(
  member
)

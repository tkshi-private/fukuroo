import Project from './project'
import {observable, autorun, action} from "mobx";

class Projects {
    @observable projects = [];
}

let projects = new Projects()

let project = new Project()
project.image_url = "https://static.pepy.jp/wp-content/uploads/2015/01/06115944/540bca3b8a7377bf8aabd4c1e751a31c-e1483577178335.jpg";
project.title = "ハタラコ！！";
project.abstract = "働け！";
project.valuation = 100;

setInterval(()=>{
  project.valuation = project.valuation + 1
})


projects.projects.push(
  project
)

export default projects.projects

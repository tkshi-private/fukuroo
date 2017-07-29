import {action, autorun, observable} from "mobx";

import Project from './project'
import User from './user'

class Projects {
    @observable projects = [];
}

let projects = new Projects()

let project = new Project()
project.image_url = "https://static.pepy.jp/wp-content/uploads/2015/01/06115944/540bca3b8a7377bf8aabd4c1e751a31c-e1483577178335.jpg";
project.title = "ハタラコ！！";
project.abstract = "働け！";
project.valuation = 100;

projects.projects.push(
  project
)

const anotherProject = new Project()
project.image_url = 'http://kyuryou-soshiki.kanagawa-u.ac.jp/aiti/wp-content/uploads/sites/43/2015/10/sample-icon.png';
project.title = 'みんなで起業！';
project.abstract = '日本にイノベーションを起こすために、新しい事業を創発しましょう。';
project.valuation = 1000;

projects.projects.push(anotherProject)



const newProject = new Project()
newProject.image_url = "https://static.pepy.jp/wp-content/uploads/2015/01/06115944/540bca3b8a7377bf8aabd4c1e751a31c-e1483577178335.jpg";
newProject.title = "ハタラコ！！";
newProject.abstract = "働け！";
newProject.valuation = 100;

const user = new User()
user.name = "林田敦"

let member = {
  role : "エンジニア",
  stock_amount : 100,
  stock_share : 50,
  user : user
}

newProject.members.push(member)

projects.projects.push(newProject)

export default projects.projects

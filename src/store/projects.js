import {action, autorun, observable} from "mobx";

import Project from './project'

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

const anotherProject = new Project()
project.image_url = 'http://kyuryou-soshiki.kanagawa-u.ac.jp/aiti/wp-content/uploads/sites/43/2015/10/sample-icon.png';
project.title = 'みんなで起業！';
project.abstract = '日本にイノベーションを起こすために、新しい事業を創発しましょう。';
project.valuation = 1000;

projects.projects.push(anotherProject)

export default projects.projects

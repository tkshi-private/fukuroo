import project from './project'
import {observable, autorun, action} from "mobx";
class Projects {
    @observable projects = [];
}

let projects = new Project()

export default projects.projects

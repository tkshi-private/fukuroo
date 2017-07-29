import { observable } from "mobx";

class Project {
    @observable image_url = "";
    @observable title = "";
    @observable abstract = "";
    @observable valuation = "";
    @observable members = [];
}


class Projects {
    @observable projects = [];
}

const projects = new Projects()

export default projects.projects

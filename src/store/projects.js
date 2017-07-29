import {action, autorun, observable} from "mobx";

import User from './user'
import firebase from 'firebase'
import firebaseConfig from '../config/firebase'

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

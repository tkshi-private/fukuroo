import { observable } from "mobx";

class State {
  @observable state = {}
}

export default new State().state;

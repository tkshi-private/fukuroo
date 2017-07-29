import { observable } from "mobx";

class State {
  @observable state = {
    loginStateFetched: false
  }
}

export default new State().state;

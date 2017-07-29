import { observable } from "mobx";

class State {
  @observable loginStateFetched = false;
  @observable currentUser = null;
  @observable currentHour = 16;
  @observable hideNavbar = false;
}

export default new State();

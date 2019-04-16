import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], count: 0 };
    this.addUser = this.addUser.bind(this);
  }

  addUser(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let user = data.get("name");

    fetch("/addUser", {
      method: "POST",
      body: JSON.stringify({ user })
    })
      .then(res => res.text())
      .then(resp => {
        this.setState({ count: resp });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addUser}>
          name:
          <input type="text" name="name" />
          <input type="submit" value="Submit" />
        </form>
        <div>{this.state.users}</div>
        <div>count : {this.state.count}</div>
      </div>
    );
  }
}

ReactDOM.render(<User />, document.getElementById("root"));
serviceWorker.unregister();

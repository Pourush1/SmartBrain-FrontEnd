import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  // To get the values of the email and password textbox we will make two functions which will set their state
  onNameChange = event => {
    this.setState({ name: event.target.value }); // getting the value and changing the state
  };

  onEmailChange = event => {
    this.setState({ email: event.target.value }); // getting the value and changing the state
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value }); //getting the value from textbox and changing the state
  };

  onSubmitSignIn = () => {
    // console.log(this.state);
    //console.log(this.props);

    // sending the data to the server connecting frontend with the backend
    fetch("https://fierce-springs-21683.herokuapp.com/register", {
      method: "post", //since this is a post request we need to second paramenter where we mention this is a post request
      headers: { "Content-type": "application/json" }, // header content-type mentioned as well
      // we need to convert the javascript object to string to send it to the backend need to remember this
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      //after getting the user from backend we probably wnat to update the user proifle in the frontend so we are adding state for proifle at our frontEnd in App.js
      .then(user => {
        if (user.id) {
          //IDeally when we register we can update the user state in App.js by calling loadUser function below
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
    // we can do destructing as well and do this.props to get the function
  };

  render() {
    // const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-200 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f6 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f3 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;

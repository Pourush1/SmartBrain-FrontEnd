import React from "react";

class SignIn extends React.Component {
  //in order for us to use props we also want to pass props here
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }
  // To get the values of the email and password textbox we will make two functions which will set their state
  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value }); // getting the value and changing the state
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value }); //getting the value from textbox and changing the state
  };

  onSubmitSignIn = () => {
    // console.log(this.state);
    //console.log(this.props);

    // sending the data to the server connecting frontend with the backend
    fetch("https://fierce-springs-21683.herokuapp.com/signin", {
      method: "post", //since this is a post request we need to second paramenter where we mention this is a post request
      headers: { "Content-type": "application/json" }, // header content-type mentioned as well
      // we need to convert the javascript object to string to send it to the backend need to remember this
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
    // we can do destructing as well and do this.props to get the function
  };

  render() {
    // this is the concept of destrcuturing to get the onRputeChange props sent from the App Component
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-200 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f6 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange} //adding the event onChange to get the data
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
                  onChange={this.onPasswordChange} //adding the event onChange to get the data
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
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;

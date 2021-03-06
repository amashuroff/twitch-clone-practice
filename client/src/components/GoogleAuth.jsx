import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "636268255037-14rsk010fh5iekgpkduop4u4ajjfc0r0.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const currentUser = this.auth.currentUser;
      this.props.signIn(currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = (props) => {
    console.log(props);
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === true) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          Sign Out
        </button>
      );
    } else if (this.props.isSignedIn === null) {
      return null;
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui green google button">
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signOut, signIn })(GoogleAuth);

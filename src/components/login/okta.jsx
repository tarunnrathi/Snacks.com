import React, { Component } from "react";
//Okta sign in widget
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import ReactDOM from "react-dom";
/**
 * @desc class component for Okta sign in widget
 */
class OKTA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
    };
  }

  componentWillUnmount() {
    if (!!this.widget && this.widget !== undefined) {
      this.widget.remove();
    }
  }

  componentDidMount() {
    // this.widget.remove()
    // // this.props.onLogin
    localStorage.setItem("loginClicked", this.props.loginClicked);
    var event = new CustomEvent("loginClicked");
    document.dispatchEvent(event);

    /**widget configuration */
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      // logo: 'images/PepsiLogo.png',
      baseUrl: "https://dev-810778.okta.com", //'https://dev-542465.okta.com',
      // clientId: '0oad3fbe9qUmDqGml4x6',//'0oa3f3z73mGY4T3yI357',
      //redirectUri: window.location.origin + "/implicit/callback",//'http://localhost:3000/implicit/callback',
      authParams: {
        pkce: true,
        //   scopes:  [
        //     "openid",
        //     "profile",
        //     "email"
        // ],
        //   issuer: "https://dev-810778.okta.com/oauth2/default",//"/oauth2/default/", //process.env.REACT_APP_OKTA_BASEURL +
        //   responseType: [
        //     "token, id_token"
        // ],
        // grantType: [
        //   "authorization_code",
        //   "implicit"
        // ]
        // display: 'page',
      },
      language: "en",
      i18n: {
        en: {
          "primaryauth.title": "Log in",
          "primaryauth.submit": "Log in",
        },
      },
      pkce: true,
      features: {
        // registration: true,                 // Enable self-service registration flow
      },

      /**Start - Sign up form enable */
      // registration: {
      //   parseSchema: function(schema, onSuccess, onFailure) {
      //      // handle parseSchema callback
      //      onSuccess(schema);
      //   },
      //   preSubmit: function (postData, onSuccess, onFailure) {
      //      // handle preSubmit callback
      //      onSuccess(postData);
      //   },
      //   postSubmit: function (response, onSuccess, onFailure) {
      //       // handle postsubmit callback
      //      onSuccess(response);
      //   }
      // },
      // features: {
      //     // Used to enable registration feature on the widget.
      //     // https://github.com/okta/okta-signin-widget#feature-flags
      //     registration: false, // REQUIRED
      //     rememberMe: true,
      // }
      /**End - Sign up form enable */
    });
    this.widget.renderEl(
      { el },
      (response) => {
        if (response.status === "FORGOT_PASSWORD_EMAIL_SENT") {
          // forgot password api response
        } else {
          if (response.status === "SUCCESS") {
            localStorage.setItem("token", response.session.token);
            localStorage.setItem("user", response.user);
            this.props.loginClicked(response);
          }
        }
        // var event = new CustomEvent("tokenLogin");
        // document.dispatchEvent(event);
      },
      (err) => {}
    );
  }

  render() {
    // if (this.state.sessionToken) {
    //   this.props.authService.redirect({sessionToken: this.state.sessionToken});
    //   return null;
    // }

    //render widget
    return <div />;
  }
}

export default OKTA;

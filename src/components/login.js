import React from "react";
import history from '../history'

class Login extends React.Component {

  handleSubmit(event) {
    history.push("/home");
  }
  render() {
    return (
      <div className="container login-form ">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                {/* Username */}
                <div className="form-group row">
                  {/* <label
                    htmlFor="username"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Username:
                  </label> */}
                  <div>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Username"
                      required
                      autoFocus
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="form-group row">
                  {/* <label
                    htmlFor="password"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Password:
                  </label> */}
                  <div>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
                <div className="d-flex flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-block btn-outline-primary"
                  >
                    Login
                  </button>
                </div>
                <hr></hr>
                <div className="d-flex flex-row-reverse">
                  <a href="/">Forgot Password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
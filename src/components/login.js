import React from "react";

class Login extends React.Component {

  handleSubmit(event) {
    this.context.history.push("/home");
  }
  render() {
    return (
      <div className="container login-form">
        <div className="row justify-content-center">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                {/* Username */}
                <div className="form-group row">
                  <label
                    htmlFor="username"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Username:
                  </label>
                  <div className="col-md-8">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      required
                      autoFocus
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="form-group row">
                  <label
                    htmlFor="password"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Password:
                  </label>
                  <div className="col-md-8">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-8 offset-md-4">
                  <button type="submit" className="btn btn-outline-primary">
                    Login
                  </button>
                </div>
                <div className="col-md-8 offset-md-4">
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
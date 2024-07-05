import React, { useState } from "react";
import Logo from "./Logo";
import validator from "./validate";
import "./Authorization.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({
    EmailError: "",
    mainError: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errorMessage = "";
    if (formErrors.EmailError === "" && validation()) {
      // TODO: Send reset password request and handle any error messages
    }
  };
  const EmailHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    validator.validateEmail(event.target.value, [formErrors, setFormErrors]);
  };
  const validation = () => {
    let valid = true;
    valid =
      valid && validator.validateEmail(email, [formErrors, setFormErrors]);
    return valid;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <Logo />
      <section className="forgetPage SignUpForm">
        <h2 className="pass-reset">Password Reset</h2>
        <h6 className="hint pass-message">
          Enter your email address that you used to register. We'll send you an
          email to reset your password.
        </h6>
        <div>
          {formErrors.mainError && (
            <span className="hint error">{formErrors.mainError}</span>
          )}
        </div>
        <section>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                required
                type="email"
                name="email"
                className="FormElement"
                placeholder="enter your email "
                onChange={(e) => {
                  handleChange(e);
                  EmailHandle(e);
                }}
              />
              {formErrors.EmailError.length > 0 && (
                <span className="error">{formErrors.EmailError}</span>
              )}
              <button type="submit" className="SignUpSubmit">
                Send code
              </button>
            </div>
          </form>
        </section>
      </section>
    </div>
  );
}

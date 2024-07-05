import { useState } from "react";
import { Link } from "react-router-dom";
import Validator from "./validate";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [PasswordType, setPasswordType] = useState("Password"); //control password input box
  const [showText, setShowText] = useState("show");
  const [formErrors, setFormErrors] = useState({
    mainError: "",
    EmailError: "",
    PasswordError: "",
  });
  const EmailHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    Validator.validateEmail(event.target.value, [formErrors, setFormErrors]);
  };
  const handleShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPasswordType(PasswordType === "text" ? "password" : "text");
    setShowText(showText === "show" ? "hide" : "show");
  };
  const validateAll = () => {
    let valid = true;
    valid &&= Validator.validateEmail(email, [formErrors, setFormErrors]);
    return valid;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errorMessage = "";
    if (validateAll()) {
      // TODO: Send log in request and handle any error messages
    }
  };
  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  return (
    <section className="SignUpForm">
      <form onSubmit={handleSubmit} noValidate>
        <div>
          {formErrors.mainError && (
            <span className="error">{formErrors.mainError}</span>
          )}
          <input
            required
            type="email"
            name="email"
            className="FormElement"
            placeholder="email@address.com"
            onChange={(e) => {
              handleChange(e);
              EmailHandle(e);
            }}
          />
          {formErrors.EmailError.length > 0 && (
            <span className="error">{formErrors.EmailError}</span>
          )}
        </div>
        <div>
          <div className="input-group">
            <input
              required
              name="password"
              type={PasswordType}
              className="FormElement"
              placeholder={"Password"}
              onChange={handleChange}
            />

            <button className="showText" onClick={handleShowPassword}>
              {showText}
            </button>
          </div>
          {formErrors.PasswordError.length > 0 && (
            <span className="error">{formErrors.PasswordError}</span>
          )}
        </div>
        <section className="forgetLink">
          <h6>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/forgotPassword";
              }}
            >
              Forgot your password?
            </button>
          </h6>
        </section>
        <button type="submit" className="SignUpSubmit">
          LOG IN
        </button>
        <section className="or-seperator-2" />
        <section>
          <span>
            <h6 className="hint">
              Don't have an account?
              <br />
            </h6>
            <button
              type="button"
              className="SignUpSubmit"
              onClick={() => {
                window.location.href = "/signup";
              }}
            >
              SIGN UP
            </button>
          </span>
        </section>
      </form>
    </section>
  );
}

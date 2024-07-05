import React, { useState } from "react";
import _ from "lodash";
import Validator from "./validate";
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export default function SignUp() {
  const countryList = countries.getNames("en", { select: "official" });
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState(""); // year + month + day
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [PasswordType, setPasswordType] = useState("Password"); //control password input box
  const [showText, setShowText] = useState("show");
  const [isVerified, setIsVerified] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [userType, setUserType] = useState(""); // free or premium account
  const [formErrors, setFormErrors] = useState({
    displayNameError: "",
    mainError: "",
    userNameError: "",
    EmailError: "",
    ConfirmPasswordError: "",
    PasswordError: "",
    GenderError: "",
    BirthdateError: "",
    TermsError: "",
    countryError: "",
  });

  const UsernameHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    Validator.validateUserName(event.target.value, [formErrors, setFormErrors]);
  };
  const DisplaynameHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
    Validator.validateDisplayName(event.target.value, [
      formErrors,
      setFormErrors,
    ]);
  };
  const EmailHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    Validator.validateEmail(event.target.value, [formErrors, setFormErrors]);
  };
  const PasswordHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    Validator.validatePassword(event.target.value, [formErrors, setFormErrors]);
  };
  const ConfirmPasswordHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    Validator.validateConfirmPassword(event.target.value, [
      formErrors,
      setFormErrors,
    ]);
  };
  const genderHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
    Validator.validateGender(event.target.value, [formErrors, setFormErrors]);
  };
  const countryHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
    Validator.validateCountry(event.target.value, [formErrors, setFormErrors]);
  };
  const BirthdateHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(event.target.value);
    Validator.validateBirthdate(year, month, day, [formErrors, setFormErrors]);
  };
  const hasSamePassword = () => {
    if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };
  const validateAll = () => {
    let value = true;
    value &&= Validator.validateUserName(username, [formErrors, setFormErrors]);
    value &&= Validator.validateEmail(email, [formErrors, setFormErrors]);
    value &&= Validator.validatePassword(password, [formErrors, setFormErrors]);
    value &&= Validator.validateConfirmPassword(confirmPassword, [
      formErrors,
      setFormErrors,
    ]);
    value ||= Validator.validateGender(gender, [formErrors, setFormErrors]);
    value ||= Validator.validateBirthdate(year, month, day, [
      formErrors,
      setFormErrors,
    ]);
    value &&= Validator.validateDisplayName(displayName, [
      formErrors,
      setFormErrors,
    ]);
    value &&= Validator.validateCountry(selectedCountry, [
      formErrors,
      setFormErrors,
    ]);
    return value;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let birth = year + "-" + month + "-" + (day.length === 1 ? "0" : "") + day;
    let gen;
    if (gender === "1") {
      gen = "M";
    } else if (gender === "2") {
      gen = "F";
    }
    let usersType;
    if (userType === "01") {
      usersType = "free";
    } else if (userType === "02") {
      usersType = "premium";
    } else if (userType === "03") {
      usersType = "artist";
    }

    let toSend = {
      username: username,
      birthDate: birth,
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
      displayName: displayName,
      role: usersType,
      country: selectedCountry,
      gender: gen,
    };

    let errorMessage = "";
    if (isVerified && hasSamePassword() === true && validateAll()) {
      // TODO: Send sign up request and handle any error messages
    }
    setFormErrors({ ...formErrors, ConfirmPasswordError: errorMessage });
  };

  const handleShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setPasswordType(PasswordType === "text" ? "password" : "text");
    setShowText(showText === "show" ? "hide" : "show");
  };
  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "displayName":
        setDisplayName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      case "gender":
        setGender(e.target.value);
        break;
      case "selectedCountry":
        setSelectedCountry(e.target.value);
        break;
      case "year":
        setYear(e.target.value);
        break;
      case "month":
        setMonth(e.target.value);
        break;
      case "day":
        setDay(e.target.value);
        break;
    }
  };

  return (
    <section className="SignUpForm">
      <form onSubmit={handleSubmit} noValidate>
        <div>
          {formErrors.mainError && (
            <span className="hint error">{formErrors.mainError}</span>
          )}
        </div>
        {DisplayName()}
        {Username()}
        {EmailAddress()}
        {Password()}
        {ConfirmPassword()}
        {Gender()}
        {Country()}
        {BirthDate()}
        {UserType()}
        {SignUp()}
      </form>
    </section>
  );

  function Country() {
    return (
      <div>
        <select
          className="FormElement  form-col custom-select"
          defaultValue=""
          name="selectedCountry"
          onChange={(e) => {
            handleChange(e);
            countryHandle(e);
          }}
        >
          <option value="">Select your country</option>
          {Object.keys(countryList).map((key: string) => (
            <option key={key} value={key}>
              {countryList[key]}
            </option>
          ))}
        </select>
        <div>
          {formErrors.countryError && (
            <span className="error">{formErrors.countryError}</span>
          )}
        </div>
      </div>
    );
  }

  function SignUp() {
    return (
      <React.Fragment>
        <button type="submit" className="SignUpSubmit">
          Sign Up
        </button>
        <section className="or-seperator-2 OR-2"></section>
        <section>
          <h6 className="hint ">Already have an account? /</h6>
          <button
            type="button"
            className="SignUpSubmit"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            LOG IN
          </button>
        </section>
      </React.Fragment>
    );
  }

  function UserType() {
    return (
      <div>
        <select
          className="FormElement  form-col custom-select"
          defaultValue=""
          name="userType"
          onChange={handleChange}
        >
          <option value="01">Free</option>
          <option value="02">Premium</option>
          <option value="03">Artist</option>
        </select>
      </div>
    );
  }

  function BirthDate() {
    return (
      <div onSubmit={BirthdateHandle}>
        {Year()}
        {Month()}
        {Day()}
        <div>
          {formErrors.BirthdateError && (
            <span className="error">{formErrors.BirthdateError}</span>
          )}
        </div>
      </div>
    );
  }
  function Day() {
    return (
      <div>
        <select
          id="inputDay"
          className="FormElement  form-col custom-select"
          defaultValue=""
          name="day"
          onChange={handleChange}
        >
          <option value="">Day</option>
          {_.range(
            1,
            (Number(year) % 400 === 0 ||
              (Number(year) % 4 === 0 && Number(year) % 100 !== 0)) &&
              month === "02"
              ? 30
              : month === "02"
              ? 29
              : month === "04" ||
                month === "06" ||
                month === "09" ||
                month === "11"
              ? 31
              : 32
          ).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  }
  function Month() {
    return (
      <div>
        <select
          id="inputMonth"
          className="FormElement  form-col custom-select"
          defaultValue=""
          name="month"
          onChange={handleChange}
        >
          <option value="">Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
    );
  }
  function Year() {
    return (
      <div>
        <select
          id="inputYear"
          className="FormElement  form-col custom-select"
          defaultValue=""
          name="year"
          onChange={handleChange}
        >
          <option value="">Year</option>
          {_.range(2018, 1899).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  }
  function Gender() {
    return (
      <div>
        <select
          required
          id="inputGender"
          className="FormElement  form-col custom-select"
          onChange={(e) => {
            handleChange(e);
            genderHandle(e);
          }}
          name="gender"
        >
          <option value="">Gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
        </select>
        <div>
          {formErrors.GenderError && (
            <span className="error">{formErrors.GenderError}</span>
          )}
        </div>
      </div>
    );
  }
  function ConfirmPassword() {
    let same = hasSamePassword();
    return (
      <div>
        <div>
          <input
            required
            type={PasswordType}
            className="FormElement"
            placeholder={"Confirm Password"}
            onChange={(e) => {
              handleChange(e);
              ConfirmPasswordHandle(e);
            }}
            name="confirmPassword"
            value={confirmPassword}
          />
        </div>
        {same === false
          ? formErrors.ConfirmPasswordError && (
              <span className="error">{formErrors.ConfirmPasswordError}</span>
            )
          : null}
      </div>
    );
  }
  function Password() {
    return (
      <div>
        <div className="input-group">
          <input
            required
            type={PasswordType}
            className="FormElement"
            placeholder={"Password"}
            onChange={(e) => {
              handleChange(e);
              PasswordHandle(e);
            }}
            name="password"
            value={password}
          />
          <button className="showText " onClick={handleShowPassword}>
            {showText}
          </button>
        </div>
        {formErrors.PasswordError && (
          <span className="error">{formErrors.PasswordError}</span>
        )}
      </div>
    );
  }
  function EmailAddress() {
    return (
      <div>
        <input
          required
          type="email"
          className="FormElement"
          placeholder="email@address.com"
          onChange={(e) => {
            handleChange(e);
            EmailHandle(e);
          }}
          name="email"
        />
        {formErrors.EmailError && (
          <span className="error">{formErrors.EmailError}</span>
        )}
      </div>
    );
  }
  function Username() {
    return (
      <div>
        <input
          required
          value={username}
          type="text"
          className="FormElement"
          id="validationTextarea"
          placeholder="Enter Username"
          onChange={(e) => {
            handleChange(e);
            UsernameHandle(e);
          }}
          name="username"
        />
        <div>
          {formErrors.userNameError && (
            <span className="error">{formErrors.userNameError}</span>
          )}
        </div>
      </div>
    );
  }
  function DisplayName() {
    return (
      <div>
        <input
          required
          value={displayName}
          type="text"
          className="FormElement"
          placeholder="What should we call you?"
          onChange={(e) => {
            handleChange(e);
            DisplaynameHandle(e);
          }}
          name="displayName"
        />
        <div>
          {formErrors.displayNameError && (
            <span className="error">{formErrors.displayNameError}</span>
          )}
        </div>
      </div>
    );
  }
}

const emailRegex = RegExp(
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d|\W)[A-Za-z\d\W]{8,30}$/;

function checkPassword(Password: string) {
  return passwordRegex.test(Password);
}

export default class Validator {
  static validateUserName(value: string, [formErrors, setFormErrors]: any) {
    let valid = true;
    let errorMessage = "";
    if (!value) {
      errorMessage = "Please enter a username";
      valid = false;
    }
    setFormErrors({ ...formErrors, userNameError: errorMessage });
    return valid;
  }
  static validateDisplayName(value: string, [formErrors, setFormErrors]: any) {
    let valid = true;
    let errorMessage = "";
    if (!value) {
      errorMessage = "Please enter a Display Name";
      valid = false;
    }
    setFormErrors({ ...formErrors, displayNameError: errorMessage });
    return valid;
  }
  static validateCountry(value: string, [formErrors, setFormErrors]: any) {
    let valid = true;
    let errorMessage = "";
    if (!value) {
      errorMessage = "Please select a Country";
      valid = false;
    }
    setFormErrors({ ...formErrors, countryError: errorMessage });
    return valid;
  }

  static validateEmail(value: string, [formErrors, setFormErrors]: any) {
    let errorMessage = "";
    let valid = true;

    if (!value) {
      errorMessage = "Please enter your email";
      valid = false;
    }
    if (!emailRegex.test(value)) {
      errorMessage = "Invalid email address";
      valid = false;
    }
    setFormErrors({ ...formErrors, EmailError: errorMessage });
    return valid;
  }

  static validatePassword(value: string, [formErrors, setFormErrors]: any) {
    let errorMessage = "";
    let valid = true;

    if (!value) {
      errorMessage = "Please enter password";
      valid = false;
    } else if (value.length < 8) {
      errorMessage = "Minimum 8 characters required";
      valid = false;
    } else if (value.length > 30) {
      errorMessage = "Maximum 30 characters";
      valid = false;
    } else if (!checkPassword(value)) {
      errorMessage =
        "Password must contain a letter and a number or special character";
      valid = false;
    }
    setFormErrors({ ...formErrors, PasswordError: errorMessage });
    return valid;
  }

  static validateConfirmPassword(
    value: string,
    [formErrors, setFormErrors]: any
  ) {
    let errorMessage = "";
    let valid = true;
    if (value !== setFormErrors.Password) {
      errorMessage = "Invalid, Passwords do not match";
      valid = false;
    }
    setFormErrors({ ...formErrors, ConfirmPasswordError: errorMessage });
    return valid;
  }
  static validateGender(selected: string, [formErrors, setFormErrors]: any) {
    let errorMessage = "";
    let valid = true;
    if (!selected) {
      errorMessage = "Please select your gender";
      valid = false;
    }
    setFormErrors({ ...formErrors, GenderError: errorMessage });
    return valid;
  }
  static validateBirthdate(
    year: string,
    month: string,
    day: string,
    [formErrors, setFormErrors]: any
  ) {
    let errorMessage = "";
    let valid = true;
    if (!(year && month && day)) {
      errorMessage = "Please select your birth date";
      valid = false;
    }
    setFormErrors({ ...formErrors, BirthdateError: errorMessage });
    return valid;
  }

  static validateTerms(selected: boolean, [formErrors, setFormErrors]: any) {
    let errorMessage = "";
    if (!selected) {
      errorMessage = "Please agree to the terms";
    }
    setFormErrors({ ...formErrors, TermsError: errorMessage });
  }
}

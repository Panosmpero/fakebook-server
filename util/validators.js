const validateRegisterInput = (username, email, password, confirmPassword) => {
  const errors = {};
  if (!username.trim().length)
    errors.username = "Username field must not be empty";
  if (!email.trim().length) {
    errors.email = "Email field must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) errors.email = "Email is not valid";
  }

  if (!password.trim().length) {
    errors.password = "Password must not be empty";
  } else {
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords must match";
  }

  const valid = Object.keys(errors).length < 1;

  return {
    errors,
    valid,
  };
};

const validateLoginInput = (username, password) => {
  const errors = {};
  if (!username.trim().length)
    errors.username = "Username field must not be empty";
  if (!password.trim().length) errors.password = "Password must not be empty";

  const valid = Object.keys(errors).length < 1;

  return {
    errors,
    valid,
  };
};

module.exports = { validateRegisterInput, validateLoginInput };

import { PhoneNumberUtil } from 'google-libphonenumber';
export const validate = (names, args) => {

  let errors = "";
  if (names && names.length > 0) {

    names.map((name) => {
      if (args[name] === '') {


        const txt = name.replaceAll('_', ' ') + " is required"
        const str = txt.charAt(0).toUpperCase() + txt.slice(1);
        return (errors = str)
      }
      if (Array.isArray(args[name])) {

        if (args[name].length <= 0) {
          return (errors = `Category  field is required`)
        }
      }
    })
  }
  return errors;
};

export const validatenested = (main, names, args) => {

  let errors = "";
  if (names && names.length > 0) {

    names.map((name) => {

      if (args[main] === '') {
        return (errors = `${main} is required`);
      }

      if (!args[main][name]) {


        return (errors = `${name} is required`);
      }


      if (!args[main][name]) {
        return (errors = `${name} field is required`)
      }


    })
  }
  return errors;
};
export const validatePhone = (names, args) => {

  let errors = "";

  if (names && names.length > 0) {

    names.map((name) => {

      if (!args[name] || args[name] === "+") {

        return (errors = "Phone number is required")
      }

      try {
        var valid = false
        const phoneUtil = PhoneNumberUtil.getInstance();
        valid = phoneUtil.isValidNumber(phoneUtil.parse(args[name]));
        if (!valid) {
          return (errors = "Phone number is invalid")
        }


      } catch (err) {
        return (errors = "Phone number is invalid")
      }
    })
  }
  return errors;
};
export const validateNestedPhone = (main, names, args) => {

  let errors = "";

  if (names && names.length > 0) {

    names.map((name) => {

      if (!args[main][name] || args[main][name] === "+") {

        return (errors = "Phone number is required")
      }

      try {
        var valid = false
        const phoneUtil = PhoneNumberUtil.getInstance();
        valid = phoneUtil.isValidNumber(phoneUtil.parse(args[main][name]));
        if (!valid) {
          return (errors = "Phone number is invalid")
        }


      } catch (err) {
        return (errors = "Phone number is invalid")
      }
    })
  }
  return errors;
};
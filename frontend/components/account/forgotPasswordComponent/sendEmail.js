import React, { useState } from "react";
import InputField from "../../inputField";
import { emailErrorMessage } from "../../validationMessages";
import { validateEmail } from "../../../utills/Validation";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import { mutationWithoutToken } from "../../../utills/helpers";
import { SEND_FORGOT_PASSWORD_EMAIL } from "../../../queries/forgotPasswordQuery";
import notify from "../../../utills/notifyToast";
import PropTypes from "prop-types";
const SendEmail = ({ token }) => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleChange = (e) => {
    const { value } = get(e, "target", {});
    setEmail(value);
  };
  const onSubmit = async () => {
    setIsButtonDisabled(true);
    try {
      if (email) {
        const response = await mutationWithoutToken(
          SEND_FORGOT_PASSWORD_EMAIL,
          {
            email,
          }
        );
        if (response) {
          const { success, message } = get(
            response,
            "data.sendForgetPasswordEmail",
            {}
          );
          if (success) {
            notify(message, success);
          } else {
            setIsButtonDisabled(false);
            notify(message, false);
          }
        }
      }
    } catch (error) {
      setIsButtonDisabled(false);
      notify("An error occurred", false);
    }
  };
  const resetEmail = () => {
    reset()
    setIsButtonDisabled(false);
    setEmail("");
  };

  return (
    <>
      <div className="forgotPassword-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {!token && (
            <>
              <InputField
                type="email"
                className="form-control register-top-space"
                id="email"
                placeholder="Email"
                name="email"
                registerRef={register("email", {
                  required: {
                    value: !email,
                    message: emailErrorMessage,
                  },
                  validate: validateEmail,
                })}
                value={email}
                onChange={handleChange}
                errors={errors}
              />
              <button
                type="submit"
                className="btn btn-primary mt-3 primary-btn-color"
                disabled={isButtonDisabled}
              >
                Send Email
              </button>
              <button
                className="btn btn-primary mt-3 primary-btn-color reset-btn"
                onClick={resetEmail}
              >
                Reset
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};
SendEmail.propTypes = {
  token: PropTypes.string.isRequired,
};
export default SendEmail;
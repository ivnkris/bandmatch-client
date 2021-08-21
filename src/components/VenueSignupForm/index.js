import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { useUserContext } from "../../contexts/UserProvider";

import FormInput from "../FormInput";
import Title from "../Title";
import FormContainer from "../FormContainer";
import MultiSelectDropDown from "../MultiSelectDropdown";
import Button from "../Button";
import { SIGNUP, SIGNUP_VENUE_USER } from "../../graphql/mutations";
import { GENRESINSTRUMENTS } from "../../graphql/queries";

import "./VenueSignupForm.css";

const VenueSignupForm = () => {
  let history = useHistory();
  const { dispatch } = useUserContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const [signUp, { loading }] = useMutation(SIGNUP_VENUE_USER, {
    onCompleted: (data) => {
      const payload = {
        token: data.signUpVenueUser.token,
        email: data.signUpVenueUser.user.email,
        firstName: data.signUpVenueUser.user.firstName,
        lastName: data.signUpVenueUser.user.lastName,
        id: data.signUpVenueUser.user.id,
        type: data.signUpVenueUser.user.type,
      };

      localStorage.setItem("user", JSON.stringify(payload));

      dispatch({
        type: "LOGIN",
        payload,
      });

      history.push(`/profile/${data.signup.user.id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitForm = async (formData) => {
    const newUser = {};

    await signUp({
      variables: {
        signupInput: { ...newUser, isPremium: false },
      },
    });
  };

  if (loading) {
    return (
      <div className="pb-5 text-center">
        <div className="spinner-border " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(submitForm)}>
        <section>
          <Title type="section" text="REGISTER" />
          <FormInput
            placeholder="First Name"
            error={errors.firstName}
            register={register("firstName", { required: true })}
          />
          <FormInput
            placeholder="Last Name"
            error={errors.lastName}
            register={register("lastName", { required: true })}
          />
          <FormInput
            placeholder="Profile Image"
            error={errors.imageUrl}
            register={register("imageUrl", { required: true })}
          />
          <FormInput
            placeholder="Email"
            type="email"
            error={errors.email}
            register={register("email", {
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            required={true}
          />
          <FormInput
            type="password"
            placeholder="Password"
            error={errors.password}
            register={register("password", {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
          />

          <FormInput
            type="password"
            placeholder="Confirm Password"
            error={errors.confirmPassword}
            register={register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === watch("password") ||
                "Make sure your passwords match.",
              shouldUnregister: true,
            })}
          />
          {errors.confirmPassword && (
            <div className="error-message">Make sure your passwords match.</div>
          )}
        </section>
        {errors.password && (
          <div className="error-message">
            Your password must contain at least 8 characters, with at least one
            letter, one number and one special character.
          </div>
        )}
        <div className="button-block py-3">
          <Button
            label="CREATE ACCOUNT"
            mode="primary"
            size="medium"
            type="submit"
          ></Button>
        </div>
      </form>

      <div className="text-center my-2">
        Already have an account?{" "}
        <a className="signup-link" href="/login">
          Login
        </a>
      </div>
    </FormContainer>
  );
};

export default VenueSignupForm;

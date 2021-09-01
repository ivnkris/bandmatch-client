import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Stepper } from "react-form-stepper";

import { useUserContext } from "../../contexts/UserProvider";

import FormInput from "../FormInput";
import Title from "../Title";
import FormContainer from "../FormContainer";
import Button from "../Button";
import ImageUpload from "../ImageUpload";
import { SIGNUP_VENUE_USER } from "../../graphql/mutations";

import "./VenueSignupForm.css";

const VenueSignupForm = () => {
  let history = useHistory();
  const { dispatch } = useUserContext();

  const [formStep, setFormStep] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };

  const lastFormStep = () => {
    setFormStep(formStep - 1);
  };

  const onFirstSubmit = (formData) => {
    setUserEmail(formData.email);
    nextFormStep();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const [signUp, { loading }] = useMutation(SIGNUP_VENUE_USER, {
    onCompleted: (data) => {
      const payload = {
        token: data.signupVenueUser.token,
        email: data.signupVenueUser.user.email,
        firstName: data.signupVenueUser.user.firstName,
        lastName: data.signupVenueUser.user.lastName,
        id: data.signupVenueUser.user.id,
        type: data.signupVenueUser.type,
        name: data.signupVenueUser.user.name,
      };

      localStorage.setItem("user", JSON.stringify(payload));

      dispatch({
        type: "LOGIN",
        payload,
      });

      history.push(`/venues/${data.signupVenueUser.user.id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const submitForm = async (formData) => {
    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      postcode: formData.postcode,
      name: formData.name,
      websiteUrl: formData.websiteUrl,
      photoUrl: formData.photoUrl,
      description: formData.description,
    };

    await signUp({
      variables: {
        signupVenueUserInput: { ...newUser, isPremium: false },
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
      {formStep === 0 && (
        <form onSubmit={handleSubmit(onFirstSubmit)}>
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
              <div className="error-message">
                Make sure your passwords match.
              </div>
            )}
          </section>
          {errors.password && (
            <div className="error-message">
              Your password must contain at least 8 characters, with at least
              one letter, one number and one special character.
            </div>
          )}
          <div className="button-block py-3">
            <Button
              label="NEXT STEP"
              mode="primary"
              size="medium"
              type="submit"
            ></Button>
          </div>
        </form>
      )}

      {formStep === 1 && (
        <form onSubmit={handleSubmit(nextFormStep)}>
          <section>
            <Title type="section" text="YOUR VENUE" />
            <FormInput
              placeholder="Venue Name"
              error={errors.name}
              register={register("name", { required: true })}
            />

            <ImageUpload
              email={userEmail}
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
            />
          </section>

          <div className="button-block d-flex gap-4 mt-2 py-3">
            <Button
              label="GO BACK"
              mode="secondary"
              size="medium"
              type="button"
              onClick={lastFormStep}
            ></Button>
            <Button
              label="NEXT STEP"
              mode="primary"
              size="medium"
              type="submit"
            ></Button>
          </div>
        </form>
      )}

      {formStep === 2 && (
        <form onSubmit={handleSubmit(submitForm)}>
          <section>
            <Title type="section" text="VENUE DETAILS" />
            <FormInput
              placeholder="Short Description..."
              error={errors.description}
              register={register("description", { required: true })}
            />

            <FormInput
              placeholder="Venue Postcode"
              error={errors.postcode}
              register={register("postcode", { required: true })}
            />

            <FormInput
              placeholder="Venue Website URL"
              error={errors.websiteUrl}
              register={register("websiteUrl", { required: false })}
            />
          </section>

          <div className="button-block d-flex gap-4 mt-2 py-3">
            <Button
              label="GO BACK"
              mode="secondary"
              size="medium"
              type="button"
              onClick={lastFormStep}
            ></Button>
            <Button
              label="CREATE ACCOUNT"
              mode="primary"
              size="medium"
              type="submit"
            ></Button>
          </div>
        </form>
      )}
      <Stepper
        steps={[
          { label: "Account Details" },
          { label: "Your Venue" },
          { label: "Venue Details" },
        ]}
        activeStep={formStep}
        styleConfig={{
          activeBgColor: "#ffd324",
          completedBgColor: "#bb9d24",
          activeTextColor: "#131313",
          completedTextColor: "#131313",
          inactiveTextColor: "#131313",
        }}
      />

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

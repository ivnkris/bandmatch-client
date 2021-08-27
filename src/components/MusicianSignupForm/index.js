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
import { SIGNUP } from "../../graphql/mutations";
import { GENRESINSTRUMENTS } from "../../graphql/queries";

import "./MusicianSignupForm.css";
import ImageUpload from "../ImageUpload";
import locationOptions from "../../data/locationOptions";

const MusicianSignupForm = () => {
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
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  const [signUp, { loading }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      const payload = {
        token: data.signup.token,
        email: data.signup.user.email,
        firstName: data.signup.user.firstName,
        lastName: data.signup.user.lastName,
        id: data.signup.user.id,
        type: data.signup.type,
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

  const { data: formSelectData } = useQuery(GENRESINSTRUMENTS);

  let genreOptions;
  let instrumentOptions;
  let lookingForOptions;

  if (formSelectData) {
    genreOptions = formSelectData.genres.map((genre) => {
      return {
        value: genre.id,
        label: genre.name.charAt(0).toUpperCase() + genre.name.slice(1),
      };
    });

    instrumentOptions = formSelectData.instruments.map((instrument) => {
      return {
        value: instrument.id,
        label:
          instrument.name.charAt(0).toUpperCase() + instrument.name.slice(1),
      };
    });

    lookingForOptions = formSelectData.instruments.map((instrument) => {
      return {
        value: instrument.id,
        label:
          instrument.role.charAt(0).toUpperCase() + instrument.role.slice(1),
      };
    });
  }

  const submitForm = async (formData) => {
    if (formData.openToCollaboration === "true") {
      formData.openToCollaboration = true;
    } else {
      formData.openToCollaboration = false;
    }

    if (formData.openToJoiningBand === "true") {
      formData.openToJoiningBand = true;
    } else {
      formData.openToJoiningBand = false;
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      imageUrl,
      description: formData.description,
      location: formData.location,
      websiteUrl: formData.websiteUrl,
      soundCloudUrl: formData.soundCloudUrl,
      genre: formData.genre,
      instruments: formData.instruments,
      experienceLevel: formData.experienceLevel,
      lookingFor: formData.lookingFor,
      openToCollaboration: formData.openToCollaboration,
      openToJoiningBand: formData.openToJoiningBand,
    };

    await signUp({
      variables: {
        signupInput: { ...newUser, isPremium: false },
      },
    });
  };

  const renderButton = () => {
    if (formStep > 3) {
      return undefined;
    } else if (formStep === 3) {
      return (
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
      );
    } else if (formStep === 0) {
      return (
        <div className="button-block py-3">
          <Button
            label="NEXT STEP"
            mode="primary"
            size="medium"
            type="submit"
          ></Button>
        </div>
      );
    } else {
      return (
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
      );
    }
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
          {renderButton()}
        </form>
      )}

      {formStep === 1 && (
        <form onSubmit={handleSubmit(nextFormStep)}>
          <section>
            <Title type="section" text="SET UP YOUR PROFILE" />

            <ImageUpload
              email={userEmail}
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
            />

            <section className="dropdown-div">
              <div className="select-label">Where are you based?</div>
              <select
                className="select-dropdown"
                id="location"
                name="location"
                placeholder="Select your location"
                {...register("location", { required: true })}
              >
                {locationOptions.map((location) => {
                  return (
                    <option className="option-text" value={location.name}>
                      {location.name}
                    </option>
                  );
                })}
              </select>
            </section>

            <FormInput
              placeholder="Short bio"
              error={errors.description}
              register={register("description", { required: true })}
            />

            <FormInput
              placeholder="Website URL"
              error={errors.websiteUrl}
              register={register("websiteUrl", { required: false })}
            />

            <FormInput
              placeholder="SoundCloud URL"
              error={errors.soundCloudUrl}
              register={register("soundCloudUrl", { required: false })}
            />
          </section>
          {renderButton()}
        </form>
      )}

      {formStep === 2 && (
        <form onSubmit={handleSubmit(nextFormStep)}>
          <section>
            <Title type="section" text="YOUR MUSIC" />

            <MultiSelectDropDown
              options={genreOptions}
              placeholder="Select your genre(s)"
              isMulti={true}
              name="genre"
              control={control}
              label="What genre(s) do you play?"
              required={true}
            />
            {errors.genre && <div className="error-message">* Required</div>}

            <MultiSelectDropDown
              options={instrumentOptions}
              placeholder="Select your instrument(s)"
              isMulti={true}
              name="instruments"
              control={control}
              label="What instrument(s) do you play?"
              required={true}
            />
            {errors.instruments && (
              <div className="error-message">* Required</div>
            )}

            <section className="dropdown-div">
              <div className="select-label">What level are you?</div>
              <select
                className="select-dropdown"
                id="experienceLevel"
                name="experienceLevel"
                placeholder="Select your experience level"
                {...register("experienceLevel", { required: true })}
              >
                <option className="option-text" value="newbie">
                  Newbie
                </option>
                <option className="option-text" value="midway">
                  Midway
                </option>
                <option className="option-text" value="expert">
                  Expert
                </option>
              </select>
            </section>
          </section>
          {renderButton()}
        </form>
      )}

      {formStep === 3 && (
        <form onSubmit={handleSubmit(submitForm)}>
          <section>
            <Title type="section" text="YOUR GOALS" />

            <MultiSelectDropDown
              options={lookingForOptions}
              placeholder="Musician type..."
              isMulti={true}
              name="lookingFor"
              control={control}
              label="Who do you want to work with?"
              required={true}
            />
            {errors.lookingFor && (
              <div className="error-message">* Required</div>
            )}

            <section className="dropdown-div">
              <div className="select-label">Interested in collaborations?</div>
              <select
                className="select-dropdown"
                id="openToCollaboration"
                name="openToCollaboration"
                placeholder="Select..."
                {...register("openToCollaboration", { required: true })}
              >
                <option className="option-text" value="true">
                  Yes
                </option>
                <option className="option-text" value="false">
                  No
                </option>
              </select>
            </section>

            <section className="dropdown-div">
              <div className="select-label">Interested in joining a band?</div>
              <select
                className="select-dropdown"
                id="openToJoiningBand"
                name="openToJoiningBand"
                placeholder="Select..."
                {...register("openToJoiningBand", { required: true })}
              >
                <option className="option-text" value="true">
                  Yes
                </option>
                <option className="option-text" value="false">
                  No
                </option>
              </select>
            </section>
          </section>
          {renderButton()}
        </form>
      )}

      <div className="text-center my-2">
        Already have an account?{" "}
        <a className="signup-link" href="/login">
          Login
        </a>
      </div>
    </FormContainer>
  );
};

export default MusicianSignupForm;

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import FormInput from "../FormInput";
import Title from "../Title";
import FormContainer from "../FormContainer";
import MultiSelectDropDown from "../MultiSelectDropdown";
import Button from "../Button";
import { SIGNUP } from "../../graphql/mutations";

import genreOptions from "../../data/genreOptions";
import instrumentOptions from "../../data/instrumentOptions";

import "./SignUpForm.css";
const SignUpForm = ({ redirect = "/assemble" }) => {
  const history = useHistory();

  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };

  const lastFormStep = () => {
    setFormStep(formStep - 1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const [signUp, { loading }] = useMutation(SIGNUP, {
    onCompleted: () => {
      history.push(redirect);
    },
    onError: () => {},
  });

  const onSubmit = async (formData) => {
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

    await signUp({
      variables: {
        signupInput: { ...formData, isPremium: false },
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderButton = () => {
    if (formStep > 3) {
      return undefined;
    } else if (formStep === 3) {
      console.log(isValid);
      return (
        <div className="button-block d-flex gap-4 mt-2 py-3">
          <Button
            label="GO BACK"
            disabled={!isValid}
            mode="secondary"
            size="medium"
            type="button"
            onClick={lastFormStep}
          ></Button>
          <Button
            label="CREATE ACCOUNT"
            disabled={!isValid}
            mode="primary"
            size="medium"
            type="submit"
          ></Button>
        </div>
      );
    } else if (formStep === 0) {
      return (
        <div className="button-block  py-3">
          <Button
            label="NEXT STEP"
            disabled={!isValid}
            mode="primary"
            size="medium"
            type="button"
            onClick={nextFormStep}
          ></Button>
        </div>
      );
    } else {
      return (
        <div className="button-block d-flex gap-4 mt-2 py-3">
          <Button
            label="GO BACK"
            disabled={!isValid}
            mode="secondary"
            size="medium"
            type="button"
            onClick={lastFormStep}
          ></Button>
          <Button
            label="NEXT STEP"
            disabled={!isValid}
            mode="primary"
            size="medium"
            type="button"
            onClick={nextFormStep}
          ></Button>
        </div>
      );
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formStep === 0 && (
          <section>
            <Title text="REGISTER" />
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
              error={errors.email}
              register={register("email", { required: true })}
            />
            <FormInput
              type="password"
              placeholder="Password"
              error={errors.password}
              register={register("password", { required: true })}
            />
            <FormInput
              type="password"
              placeholder="Confirm Password"
              error={errors.password}
            />
          </section>
        )}

        {formStep === 1 && (
          <section>
            <Title text="SET UP YOUR PROFILE" />

            <FormInput
              placeholder="Profile Image"
              error={errors.imageUrl}
              register={register("imageUrl", { required: false })}
            />
            <FormInput
              placeholder="Short bio"
              error={errors.description}
              register={register("description", { required: true })}
            />
            <FormInput
              placeholder="Postcode"
              error={errors.postcode}
              register={register("postcode", { required: true })}
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
        )}

        {formStep === 2 && (
          <section>
            <Title text="YOUR MUSIC" />

            <MultiSelectDropDown
              options={genreOptions}
              placeholder="Select your genre(s)"
              isMulti={true}
              name="genre"
              control={control}
              label="What genre(s) do you play?"
            />

            <MultiSelectDropDown
              options={instrumentOptions}
              placeholder="Select your instrument(s)"
              isMulti={true}
              name="instruments"
              control={control}
              label="What instrument(s) do you play?"
            />

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
                <option className="option-text" value="amateur">
                  Amateur
                </option>
                <option className="option-text" value="expert">
                  Expert
                </option>
              </select>
            </section>
          </section>
        )}

        {formStep === 3 && (
          <section>
            <Title text="YOUR GOALS" />

            <MultiSelectDropDown
              options={instrumentOptions}
              placeholder="Musician type..."
              isMulti={true}
              name="lookingFor"
              control={control}
              label="Who do you want to work with?"
            />

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
        )}

        {renderButton()}

        <div className="text-center my-2">
          Already have an account?{" "}
          <a className="signup-link" href="/login">
            Login
          </a>
        </div>
      </form>
    </FormContainer>
  );
};

export default SignUpForm;

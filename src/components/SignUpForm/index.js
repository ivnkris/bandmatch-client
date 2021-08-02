import { useForm } from "react-hook-form";
import { useState } from "react";

import FormInput from "../FormInput";
import Title from "../Title";
import FormContainer from "../FormContainer";
import MultiSelectDropDown from "../MultiSelectDropdown";
import Button from "../Button";

import genreOptions from "../../data/genreOptions";
import instrumentOptions from "../../data/instrumentOptions";
import experienceOptions from "../../data/experienceOptions";

import "./SignUpForm.css";
const SignUpForm = () => {
  const [formStep, setFormStep] = useState(0);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  const renderButton = () => {
    if (formStep > 3) {
      return undefined;
    } else if (formStep === 3) {
      return (
        <div className="button-block">
          <Button
            label="Create Account"
            disabled={!isValid}
            mode="primary"
            size="large"
            type="button"
          ></Button>
        </div>
      );
    } else {
      return (
        <div className="button-block">
          <Button
            label="Next Step"
            disabled={!isValid}
            mode="primary"
            size="large"
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
              placeholder="Password"
              error={errors.password}
              register={register("password", { required: true })}
            />
            <FormInput placeholder="Confirm Password" error={errors.password} />
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

            <label for="cars">What level are you?</label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              placeholder="Select your experience level"
              {...register("experienceLevel", { required: true })}
            >
              <option value="newbie">Newbie</option>
              <option value="amateur">Amateur</option>
              <option value="expert">Expert</option>
            </select>

            <FormInput
              placeholder="Website URL"
              error={errors.websiteUrl}
              register={register("websiteUrl", { required: true })}
            />

            <FormInput
              placeholder="SoundCloud URL"
              error={errors.soundCloudUrl}
              register={register("soundCloudUrl", { required: true })}
            />
          </section>
        )}

        {formStep === 3 && (
          <section>
            <Title text="YOUR GOALS" />

            <MultiSelectDropDown
              options={instrumentOptions}
              placeholder="Who are you looking for?"
              isMulti={true}
              name="lookingFor"
              control={control}
              label="Are you looking for someone in particular?"
            />

            <label for="openToCollaboration">
              Are you interested in collaborations?
            </label>
            <select
              id="openToCollaboration"
              name="openToCollaboration"
              placeholder="Select..."
              {...register("openToCollaboration", { required: true })}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label for="openToJoiningBand">
              Are you interested in joining a band?
            </label>
            <select
              id="openToJoiningBand"
              name="openToJoiningBand"
              placeholder="Select..."
              {...register("openToJoiningBand", { required: true })}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </section>
        )}

        {renderButton()}

        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </FormContainer>
  );
};

export default SignUpForm;

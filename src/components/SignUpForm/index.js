import { useForm } from "react-hook-form";
import { useState } from "react";

import FormInput from "../FormInput";
import Title from "../Title";
import FormContainer from "../FormContainer";
import MultipleSelectInput from "../MultipleSelectInput";
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

            <MultipleSelectInput
              register={register("genre", { required: true })}
              options={genreOptions}
              name="genre"
              label="What genre(s) do you play?"
            />

            <MultipleSelectInput
              register={register("instruments", { required: true })}
              options={instrumentOptions}
              name="instruments"
              label="What instrument(s) do you play?"
            />

            <MultipleSelectInput
              register={register("genre", { required: true })}
              options={experienceOptions}
              name="experienceLevel"
              label="What level are you?"
              isMulti="false"
            />

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

            <MultipleSelectInput
              register={register("lookingFor", { required: true })}
              options={[
                {
                  value: "true",
                  label: "Yes",
                },
                {
                  value: "false",
                  label: "No",
                },
              ]}
              name="lookingFor"
              label="Are you looking for someone in particular?"
              isMulti="true"
            />

            <MultipleSelectInput
              register={register("openToCollaboration", { required: true })}
              name="openToCollaboration"
              options={[
                {
                  value: "true",
                  label: "Yes",
                },
                {
                  value: "false",
                  label: "No",
                },
              ]}
              label="Are you interested in collaborations?"
              isMulti="false"
            />

            <MultipleSelectInput
              register={register("openToJoiningBand", { required: true })}
              name="openToJoiningBand"
              options={[
                {
                  value: "true",
                  label: "Yes",
                },
                {
                  value: "false",
                  label: "No",
                },
              ]}
              label="Are you interested in joining a band?"
              isMulti="false"
            />
          </section>
        )}

        {renderButton()}

        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </FormContainer>
  );
};

export default SignUpForm;

import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "react-bootstrap/Button";

import FormInput from "../FormInput";
import Title from "../Title";

import "./SignUpForm.css";
import FormContainer from "../../FormContainer";
import MultipleSelectInput from "../MultipleSelectInput";

const SignUpForm = () => {
  const [formStep, setFormStep] = useState(0);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const nextFormStep = () => {
    setFormStep(formStep + 1);
  };

  return (
    <FormContainer>
      <form>
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

            <label for="fname">What genre(s) do you play?</label>
            <MultipleSelectInput
              register={register("genre", { required: true })}
            />
          </section>
        )}

        {formStep < 2 && (
          <div className="button-block">
            <Button
              // disabled={!isValid}
              variant="primary"
              size="lg"
              type="button"
              onClick={nextFormStep}
            >
              Next Step
            </Button>
          </div>
        )}

        {formStep === 2 && (
          <div className="button-block">
            <Button
              // disabled={!isValid}
              variant="primary"
              size="lg"
              type="button"
              onClick={nextFormStep}
            >
              Complete Registration
            </Button>
          </div>
        )}
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </FormContainer>
  );
};

export default SignUpForm;

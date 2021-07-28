import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "react-bootstrap/Button";

import FormInput from "../FormInput";
import Title from "../Title";

import "./SignUpForm.css";
import FormContainer from "../../FormContainer";

const SignUpForm = () => {
  const [formStep, setFormStep] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
              placeholder="Postcode"
              error={errors.postcode}
              register={register("postcode", { required: true })}
            />
            <FormInput
              placeholder="Short bio"
              error={errors.description}
              register={register("description", { required: true })}
            />
            <FormInput
              placeholder="Profile Image"
              error={errors.imageUrl}
              register={register("imageUrl", { required: false })}
            />
          </section>
        )}

        {formStep === 2 && (
          <section>
            <Title text="YOUR MUSIC" />

            <label for="fname">What genre(s) do you play?</label>
            <div className="inline">
              <FormInput
                type="checkbox"
                error={errors.genre}
                register={register("genre", { required: true })}
              />
              <label class="form-check-label">Rock</label>
            </div>
            <div className="inline">
              <FormInput
                type="checkbox"
                error={errors.genre}
                register={register("genre", { required: true })}
              />
              <label class="form-check-label">Pop</label>
            </div>
          </section>
        )}

        {formStep < 2 && (
          <div className="button-block">
            <Button
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
              variant="primary"
              size="lg"
              type="button"
              onClick={nextFormStep}
            >
              Complete Registration
            </Button>
          </div>
        )}
      </form>
    </FormContainer>
  );
};

export default SignUpForm;

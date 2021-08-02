import { useForm } from "react-hook-form";

import FormInput from "../FormInput";
import Title from "../Title";
import FormContainer from "../FormContainer";
import Button from "../Button";

import "./LoginForm.css";
const LoginForm = () => {
  const {
    register,

    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Title text="LOGIN" />

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
        </section>
        <div className="button-block">
          <Button
            label="LOGIN"
            disabled={!isValid}
            mode="primary"
            size="large"
            type="button"
          ></Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default LoginForm;

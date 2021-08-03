import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import FormInput from "../FormInput";
import Title from "../Title";
import FormContainer from "../FormContainer";
import Button from "../Button";
import { LOGIN } from "../../graphql/mutations";
import { UserContext } from "../../contexts/UserContext";

import "./LoginForm.css";
const LoginForm = ({ redirect = "/assemble" }) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const {
        token,
        user: { email, id, firstName, lastName },
      } = data.login;

      onLogin({
        id,
        email,
        token,
        firstName,
        lastName,
      });

      history.push(redirect || "/assemble");
      console.log(token);
    },
    onError: () => {},
  });

  const { onLogin } = useContext(UserContext);

  const onSubmit = async (formData) => {
    await login({
      variables: {
        loginInput: formData,
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
            type="password"
            register={register("password", { required: true })}
          />
        </section>
        <div className="button-block py-3">
          <Button
            label="LOGIN"
            disabled={!isValid}
            mode="primary"
            size="medium"
            type="submit"
          ></Button>
        </div>
        <div className="text-center my-2">
          Don't have an account?{" "}
          <a className="signup-link" href="/signup">
            Sign Up
          </a>
        </div>
      </form>
    </FormContainer>
  );
};

export default LoginForm;

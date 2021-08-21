import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import FormInput from "../FormInput";
import Title from "../Title";
import FormContainer from "../FormContainer";
import Button from "../Button";
import { LOGIN } from "../../graphql/mutations";
import { useUserContext } from "../../contexts/UserProvider";

import "./LoginForm.css";

const LoginForm = () => {
  let history = useHistory();
  const { dispatch } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const payload = {
        token: data.login.token,
        email: data.login.user.email,
        firstName: data.login.user.firstName,
        lastName: data.login.user.lastName,
        id: data.login.user.id,
        type: data.login.type,
      };

      localStorage.setItem("user", JSON.stringify(payload));

      dispatch({
        type: "LOGIN",
        payload,
      });

      history.push(`/profile/${data.login.user.id}`);
    },
    onError: () => {},
  });

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
          <Title type="section" text="LOGIN" />

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

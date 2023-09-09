import { useRef, useState } from "react";
import { useEffect } from "react";

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  SubmitHandler,
} from "@redwoodjs/forms";
import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags, useMutation } from "@redwoodjs/web";
import { toast, Toaster } from "@redwoodjs/web/toast";

import { useAuth } from "src/auth";

import { CreateUserMutation, CreateUserMutationVariables } from "types/graphql";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      name
    }
  }
`;

interface FormValues {
  email: string;
  password: string;
  name: string;
}

const SignupPage = () => {
  const { isAuthenticated, signUp, logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER_MUTATION);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.feed());
    }
  }, [isAuthenticated]);

  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoading(true);
    const response = await signUp({
      email: data.email,
      password: data.password,
    });

    console.log({ response });
    if (response.error?.message) {
      toast.error(response.error.message);
    } else {
      await createUser({
        variables: {
          input: {
            id: response.data.user.id,
            email: data.email,
            name: data.name,
          },
        },
      });
      toast.success("Please verify your email.");
    }
    setLoading(false);
  };

  return (
    <>
      <MetaTags title="Signup" />

      <main className="home-background h-screen w-screen animate-fade-in transition-all">
        <div className=" w-full h-full flex items-center  justify-center flex-col backdrop-blur-sm bg-opacity-40 bg-night">
          <Toaster toastOptions={{ className: "rw-toast", duration: 6000 }} />
          <div className=" bg-white rounded shadow shadow-gray-400 w-96 h-auto p-4 flex flex-col">
            <div className="rw-segment">
              <div className="rw-segment-main">
                <div className="rw-form-wrapper">
                  <Form onSubmit={onSubmit} className="flex flex-col">
                    <Label
                      name="Name"
                      className="text-night font-archivo mb-1"
                      errorClassName="font-archivo text-night mt-4 mb-1"
                    >
                      Name
                    </Label>
                    <TextField
                      name="name"
                      className="text-night p-2 rounded bg-gray-100"
                      errorClassName="text-night p-2 rounded bg-red-100"
                      ref={nameRef}
                      validation={{
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      }}
                    />
                    <FieldError
                      name="name"
                      className="text-crayola-red font-light"
                    />

                    <Label
                      name="email"
                      className="text-night font-archivo mt-4 mb-1"
                      errorClassName="font-archivo text-night mt-4 mb-1"
                    >
                      Email
                    </Label>
                    <TextField
                      name="email"
                      className="text-night p-2 rounded bg-gray-100"
                      errorClassName="text-night p-2 rounded bg-red-100"
                      validation={{
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                      }}
                    />
                    <FieldError
                      name="email"
                      className="text-crayola-red font-light"
                    />

                    <Label
                      name="password"
                      className="font-archivo text-night mt-4 mb-1"
                      errorClassName="font-archivo text-night mt-4 mb-1"
                    >
                      Password
                    </Label>
                    <PasswordField
                      name="password"
                      className="text-night p-2 rounded bg-gray-100"
                      errorClassName="text-night p-2 rounded bg-red-100"
                      autoComplete="current-password"
                      validation={{
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                      }}
                    />
                    <FieldError
                      name="password"
                      className="text-crayola-red font-light"
                    />

                    <Submit
                      disabled={loading}
                      className={`${
                        loading ? "animate-pulse" : ""
                      } text-white font-archivo font-bold text-center from-crayola-red to-majorelle-blue p-2 rounded bg-gradient-to-br flex items-center justify-center mt-4 mb-4`}
                    >
                      Sign Up
                    </Submit>
                  </Form>
                </div>
              </div>
            </div>
            <div className="rw-login-link">
              <span>Already have an account?</span>{" "}
              <Link
                to={routes.login()}
                className="font-archivo font-bold text-majorelle-blue"
              >
                Log in!
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignupPage;

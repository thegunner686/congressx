import { useRef } from "react";
import { useEffect } from "react";

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from "@redwoodjs/forms";
import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { toast, Toaster } from "@redwoodjs/web/toast";

import { useAuth } from "src/auth";

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.feed());
    }
  }, [isAuthenticated]);

  // focus on username box on page load
  const usernameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      email: data.username,
      password: data.password,
    });
    console.log({ response });

    // @ts-ignore
    if (response?.message) {
      // @ts-ignore
      toast(response?.message);
    } else if (response.error?.message) {
      toast.error(response.error.message);
    } else {
      toast.success("Welcome!");
    }
  };

  return (
    <>
      <MetaTags title="Signup" />

      <main className="animate-fade-in flex flex-col items-center justify-center flex-grow">
        <Toaster toastOptions={{ className: "rw-toast", duration: 6000 }} />
        <div className=" bg-white rounded shadow shadow-gray-400 w-96 h-auto p-4 flex flex-col">
          <div className="rw-segment">
            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="flex flex-col">
                  <Label
                    name="username"
                    className="text-night font-archivo"
                    errorClassName="text-red-500"
                  >
                    Username
                  </Label>
                  <TextField
                    name="username"
                    className="text-night p-2 rounded bg-gray-100"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    }}
                  />
                  <FieldError name="username" className="rw-field-error" />

                  <Label
                    name="password"
                    className="font-archivo text-night mt-4 mb-1"
                    errorClassName="text-red-500"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="text-night p-2 rounded bg-gray-100"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    }}
                  />
                  <FieldError name="password" className="rw-field-error" />

                  <Submit className="text-white font-archivo font-bold text-center from-crayola-red to-majorelle-blue p-2 rounded bg-gradient-to-br flex items-center justify-center mt-4 mb-4">
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
      </main>
    </>
  );
};

export default SignupPage;

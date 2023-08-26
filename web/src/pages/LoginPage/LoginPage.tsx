import { useRef } from "react";
import { useEffect } from "react";

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from "@redwoodjs/forms";
import { Link, navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { toast, Toaster } from "@redwoodjs/web/toast";

import { useAuth } from "src/auth";

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.feed());
    }
  }, [isAuthenticated]);

  const usernameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      authMethod: "password",
      email: data.username,
      password: data.password,
    });

    // @ts-ignore
    if (response.message) {
      // @ts-ignore
      toast(response.message);
    } else if (response.error?.message) {
      toast.error(response.error.message);
    } else {
      toast.success("Welcome back!");
    }
  };

  return (
    <>
      <MetaTags title="Login" />

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
                    className="text-night p-2 rounded"
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
                    className="text-night p-2 rounded"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    }}
                  />

                  <Link
                    to={routes.forgotPassword()}
                    className="font-archivo font-bold text-majorelle-blue mt-4"
                  >
                    Forgot Password?
                  </Link>

                  <FieldError name="password" className="rw-field-error" />

                  <Submit className="text-white font-archivo font-bold text-center from-crayola-red to-majorelle-blue p-2 rounded bg-gradient-to-br flex items-center justify-center mt-4 mb-4">
                    Login
                  </Submit>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Don&apos;t have an account?</span>{" "}
            <Link
              to={routes.signup()}
              className="font-archivo font-bold text-majorelle-blue"
            >
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;

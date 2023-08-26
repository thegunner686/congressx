import { useEffect, useRef } from "react";

import { Form, Label, TextField, Submit, FieldError } from "@redwoodjs/forms";
import { navigate, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";
import { toast, Toaster } from "@redwoodjs/web/toast";

import { useAuth } from "src/auth";

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home());
    }
  }, [isAuthenticated]);

  const usernameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    usernameRef?.current?.focus();
  }, []);

  const onSubmit = async (data: { username: string }) => {
    const response = await forgotPassword(data.username);

    // @ts-ignore
    if (response.error?.message) {
      // @ts-ignore
      toast.error(response.error.message);
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        // @ts-ignore
        "A link to reset your password was sent to " + response.email,
      );
      navigate(routes.login());
    }
  };

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="animate-fade-in flex flex-col items-center justify-center flex-grow">
        <Toaster toastOptions={{ className: "rw-toast", duration: 6000 }} />
        <header className="mt-8 mb-8">
          <h1 className="font-archivo text-night text-2xl">Forgot Password</h1>
        </header>
        <div className=" bg-white rounded shadow shadow-gray-400 w-96 h-auto p-4 flex flex-col">
          <div className="rw-segment">
            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="flex flex-col">
                  <Label
                    name="username"
                    className="text-night font-archivo"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
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

                  <Submit className="text-white font-archivo font-bold text-center from-crayola-red to-majorelle-blue p-2 rounded bg-gradient-to-br flex items-center justify-center mt-4 mb-4">
                    Submit
                  </Submit>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPasswordPage;

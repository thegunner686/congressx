// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private, Set } from "@redwoodjs/router";

import ScaffoldLayout from "src/layouts/ScaffoldLayout";

import { useAuth } from "./auth";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import { UserProvider } from "./contexts/UserContext";
import AppLayout from "./layouts/AppLayout/AppLayout";

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set
        wrap={ScaffoldLayout}
        title="States"
        titleTo="states"
        buttonLabel="New State"
        buttonTo="newState"
      >
        <Route
          path="/states/{id}/edit"
          page={StateEditStatePage}
          name="editState"
        />
      </Set>
      <Set
        wrap={ScaffoldLayout}
        title="Users"
        titleTo="users"
        buttonLabel="New User"
        buttonTo="newUser"
      >
        <Route
          path="/users/{id}/edit"
          page={UserEditUserPage}
          name="editUser"
        />
        <Route path="/users/{id}" page={UserUserPage} name="user" />
      </Set>
      <Set
        wrap={ScaffoldLayout}
        title="States"
        titleTo="states"
        buttonLabel="New State"
        buttonTo="newState"
      >
        <Route path="/states/new" page={StateNewStatePage} name="newState" />
        <Route
          path="/states/{id}/edit"
          page={StateEditStatePage}
          name="editState"
        />
        <Route path="/states/{id}" page={StateStatePage} name="state" />
        <Route path="/states" page={StateStatesPage} name="states" />
      </Set>
      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route
          path="/forgot-password"
          page={ForgotPasswordPage}
          name="forgotPassword"
        />
        <Route
          path="/reset-password"
          page={ResetPasswordPage}
          name="resetPassword"
        />
      </Set>
      <Private unauthenticated="home" wrap={[UserProvider, AppLayout]}>
        <Route path="/feed" page={FeedPage} name="feed" />
        <Route path="/discover" page={DiscoverPage} name="discover" />
        <Route
          path="/state-selection"
          page={StateSelectionPage}
          name="stateSelection"
        />
      </Private>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;

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
import { RepresentativesProvider } from "./contexts/RepresentativesContext";
import AppLayout from "./layouts/AppLayout/AppLayout";

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set
        wrap={ScaffoldLayout}
        title="Representatives"
        titleTo="representatives"
        buttonLabel="New Representative"
        buttonTo="newRepresentative"
      >
        <Route
          path="/representatives/new"
          page={RepresentativeNewRepresentativePage}
          name="newRepresentative"
        />
        <Route
          path="/representatives/{id}/edit"
          page={RepresentativeEditRepresentativePage}
          name="editRepresentative"
        />
        <Route
          path="/representatives/{id}"
          page={RepresentativeRepresentativePage}
          name="representative"
        />
        <Route
          path="/representatives"
          page={RepresentativeRepresentativesPage}
          name="representatives"
        />
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
      <Private
        unauthenticated="home"
        wrap={[UserProvider, RepresentativesProvider, AppLayout]}
      >
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

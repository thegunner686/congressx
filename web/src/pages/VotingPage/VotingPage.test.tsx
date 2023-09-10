import { render } from "@redwoodjs/testing/web";

import VotingPage from "./VotingPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("VotingPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<VotingPage />);
    }).not.toThrow();
  });
});

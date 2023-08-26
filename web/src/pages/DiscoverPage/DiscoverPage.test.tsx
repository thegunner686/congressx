import { render } from "@redwoodjs/testing/web";

import DiscoverPage from "./DiscoverPage";

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe("DiscoverPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<DiscoverPage />);
    }).not.toThrow();
  });
});

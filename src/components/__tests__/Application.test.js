import React from "react";

import { render, cleanup, act } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", async () => {
  //If your component involves asynchronous operations (e.g., data fetching, useEffect with asynchronous code), make sure you're handling those within the act block.
  await act(async () => {
    render(<Application />);
  });
});

import React from "react";

import { render, cleanup, act, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

xit("renders without crashing", async () => {
  //If your component involves asynchronous operations (e.g., data fetching, useEffect with asynchronous code), make sure you're handling those within the act block.
  await act(async () => {
    render(<Application />);
  });
});

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);
  //The waitForElement function returns a promise that resolves when the callback returns a truthy value
  return waitForElement(() => getByText("Monday"))
  .then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

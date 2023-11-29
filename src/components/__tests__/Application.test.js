import React from "react";

import { render, cleanup, act, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
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

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //This container represents the DOM tree that we are working with, and we can pass it to any of the imported queries
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    await act(async () => {
      fireEvent.click(getByText(appointment, "Save"));
    });
  
    // console.log(prettyDOM(appointment));
  });

});

//We should use the ByLabelText, ByPlaceholderText, ByText, ByDisplayValue, ByAltText, ByTitle and ByRole queries most of the time. They allow us to make queries based on what the user sees.

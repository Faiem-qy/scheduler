import React from "react";
import axios from "axios";

import { render, cleanup, act, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, debug } from "@testing-library/react";

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
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    // debug()
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // 4. Change name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Be-boop" }
    });
    // 5. Click the "Save" button.
    // 6. Check that the element with the text "Saving" is displayed.
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();
    // 7. Wait until the saved info shown.
    await waitForElement(() => getByText(appointment, "Be-boop"));
    // 8. Check that the DayListItem with the text "Monday" spots stay the same.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    //we want the mock to revert to the default behaviour after the single request that this test generates is complete. This replaces the mock from our src/__mocks__/axios.js module temporarily, until the put function is called once.
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Mill" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));


    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    
    fireEvent.click(queryByAltText(appointment, "Close"));
    fireEvent.click(getByText(appointment, "Cancel"));

    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug()
  });

  // it("shows the delete error when failing to delete an existing appointment", async () => {
  //   //axios.delete.mockRejectedValueOnce();
  // });


});

//We should use the ByLabelText, ByPlaceholderText, ByText, ByDisplayValue, ByAltText, ByTitle and ByRole queries most of the time. They allow us to make queries based on what the user sees.

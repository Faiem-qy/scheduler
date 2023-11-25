/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render,screen } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment";
import "../../../public/images/add.png"
import Empty from "components/Appointment/Empty";

/*
  A test that renders a React Component
*/
// it("renders without crashing", () => {
//   render(<Application />);
// });

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("renders image showing a plus sign when empty", () => {
    render(<Empty />);  
    const testImage = document.querySelector("img");
    expect(testImage.src).toContain("images/add.png");
  });

  it("renders alt showing correct value", () => {
    render(<Empty />);  
    const testImage = document.querySelector("img");
    expect(testImage.alt).toContain("Add");
  });
});

import React from "react";

import { render, cleanup, getByTestId, getByPlaceholderText, fireEvent, getByText } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  const interviewer ={
    id: 1,
    student: "Lydia Miller-Jones",
    avatar: "https://i.imgur.com/LpaY82x.png"
  }

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn(); //fake function

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    const { getByText } = render(
      <Form onSave={onSave} interviewers={interviewers} name=""/> 
      //if no name ="person name" then expect "Student name cannot be blank"
    );

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
    
    // expect(getByTestId("student-name-input")).toHaveValue("Lydia Jones");
    expect(getByText("Student name cannot be blank")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();    
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the interviewer prop should be null */
    const { getByText } = render(
      <Form onSave={onSave} interviewers={interviewers} name="Lydia Miller-Jones" interviewer={null}/> 
    );

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));
  
    expect(getByText("Please select an interviewer")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name and interviewer is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const {queryByText, getByText } = render(
      <Form onSave={onSave} interviewers={interviewers} name="Lydia Miller-Jones" interviewer={interviewer.id}/> 
    );
    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    expect(queryByText("Student name cannot be blank")).toBeNull();
    expect(queryByText("Please select an interviewer")).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    // expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});
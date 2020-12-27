import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

const defaultProps = {
  task: "default todo",
  id: "1"
}

it("renders without crashing", function() {
  render(<Todo {...defaultProps} />, );
});

it("matches snapshot", function() {
  const { asFragment } = render(<Todo {...defaultProps} />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when editing", function() {
  const { asFragment, getByText } = render(<Todo {...defaultProps} />);
  const editButton = getByText("Edit");
  fireEvent.click(editButton);
  expect(asFragment()).toMatchSnapshot();
});

it("runs the update function on form submit", function() {
  const updateMock = jest.fn();
  const { getByText } = render(<Todo {...defaultProps} update={updateMock} />);
  const editButton = getByText("Edit");
  fireEvent.click(editButton);
  const updateButton = getByText("Update!");
  fireEvent.click(updateButton);
  expect(updateMock).toHaveBeenCalled();
});

it("runs the delete function on button click", function() {
  const removeMock = jest.fn();
  const { getByText } = render(<Todo {...defaultProps} remove={removeMock} />);
  const deleteButton = getByText("X");
  fireEvent.click(deleteButton);
  expect(removeMock).toHaveBeenCalled();
});

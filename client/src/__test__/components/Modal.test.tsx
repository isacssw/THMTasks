import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../components/Modal";

describe("Modal component", () => {
  test("should render modal with correct title and input", () => {
    const mockInputText = "Test Input";
    const mockAction = "Update";
    const mockSetInputText = jest.fn();
    const mockSetPopupToggle = jest.fn();
    const mockActionHandler = jest.fn();

    render(
      <Modal
        inputText={mockInputText}
        action={mockAction}
        setInputText={mockSetInputText}
        setPopupToggle={mockSetPopupToggle}
        actionHandler={mockActionHandler}
      />
    );

    expect(screen.getByText(`${mockAction} task`)).toBeTruthy();

    const inputElement = screen.getByPlaceholderText("write a task title ...");

    expect(inputElement).toBeTruthy();
    expect((inputElement as HTMLInputElement).value).toBe(mockInputText);
  });

  test("should call setPopupToggle when close button is clicked", () => {
    const mockSetPopupToggle = jest.fn();
    const mockActionHandler = jest.fn();

    render(
      <Modal
        inputText=""
        action=""
        setInputText={() => {}}
        setPopupToggle={mockSetPopupToggle}
        actionHandler={mockActionHandler}
      />
    );

    const closeButton = screen.getByText("x");
    fireEvent.click(closeButton);

    expect(mockSetPopupToggle).toHaveBeenCalledWith(false);
  });

  test("should call setInputText and actionHandler when input is changed and submit button is clicked", async () => {
    const mockInputText = "New Test Input";
    const mockSetInputText = jest.fn();
    const mockSetPopupToggle = jest.fn();
    const mockActionHandler = jest.fn();

    render(
      <Modal
        inputText={mockInputText}
        action=""
        setInputText={mockSetInputText}
        setPopupToggle={mockSetPopupToggle}
        actionHandler={mockActionHandler}
      />
    );

    const inputElement = screen.getByPlaceholderText("write a task title ...");
    fireEvent.change(inputElement, { target: { value: "Changed Text" } });

    expect(mockSetInputText).toHaveBeenCalledWith("Changed Text");

    const submitButton = screen.getByText("Task");
    fireEvent.click(submitButton);

    expect(mockActionHandler).toHaveBeenCalled();
  });
});

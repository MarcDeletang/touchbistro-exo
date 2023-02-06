import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("e2e testing for App", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("The submit button is disabled when a request is sent", async () => {
    render(<App />);
    const getMedianButton = screen.getByText("Get the median(s) prime(s)");
    const input = screen.getByLabelText<HTMLInputElement>(
      "Choose your target value"
    );
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: () => [2, 3],
            status: 200,
          });
        }, 500);
      });
    });
    fireEvent.change(input, { target: { value: "77" } });
    fireEvent.click(getMedianButton);
    await waitFor(() => {
      expect(getMedianButton).toHaveAttribute("disabled");
    });
    await waitFor(() => {
      expect(screen.getByText("Median found: 2,3")).toBeInTheDocument();
    });
    expect(global.fetch).toBeCalledTimes(1);
  });

  it("A request is sent on a button click and the result is displayed, then cleared by button click", async () => {
    render(<App />);
    const getMedianButton = screen.getByText("Get the median(s) prime(s)");
    const clearResultButton = screen.getByText("Clear the median(s)");
    const input = screen.getByLabelText<HTMLInputElement>(
      "Choose your target value"
    );
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => [2, 3],
        status: 200,
      })
    );
    fireEvent.change(input, { target: { value: "77" } });
    fireEvent.click(getMedianButton);
    await waitFor(() => {
      expect(screen.getByText("Median found: 2,3")).toBeInTheDocument();
    });
    fireEvent.click(clearResultButton);
    await waitFor(() => {
      expect(screen.queryByText("Median found: 2,3")).not.toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/primes/median?max=77"
    );
  });

  it("The API error returned is displayed if a request failed, then cleared by click on error", async () => {
    render(<App />);
    const getMedianButton = screen.getByText("Get the median(s) prime(s)");
    const input = screen.getByLabelText<HTMLInputElement>(
      "Choose your target value"
    );
    const errorMessage = "max must be greater than 3";
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: [errorMessage],
          }),
        status: 400,
      })
    );
    fireEvent.change(input, { target: { value: "77" } });
    fireEvent.click(getMedianButton);
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    const clearErrorButton = screen.getByTitle("Close");
    fireEvent.click(clearErrorButton);
    await waitFor(() => {
      expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/primes/median?max=77"
    );
  });
});

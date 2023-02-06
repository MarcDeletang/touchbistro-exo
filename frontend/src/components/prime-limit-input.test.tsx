import { fireEvent, render, screen } from "@testing-library/react";
import { PrimeLimitInput } from "./prime-limit-input";

describe("Testing prime limit input", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("The input value is updated", () => {
    const setCurrent = jest.fn();
    render(
      <PrimeLimitInput current="0" max={10} min={1} setCurrent={setCurrent} />
    );
    const input = screen.getByLabelText<HTMLInputElement>(
      "Choose your target value"
    );
    fireEvent.change(input, { target: { value: "7" } });
    expect(setCurrent).toHaveBeenCalledWith("7");
  });

  it("The input value is not updated because newVal > max", () => {
    const setCurrent = jest.fn();
    render(
      <PrimeLimitInput current="0" max={10} min={1} setCurrent={setCurrent} />
    );
    const input = screen.getByLabelText<HTMLInputElement>(
      "Choose your target value"
    );
    fireEvent.change(input, { target: { value: "11" } });
    expect(setCurrent).not.toHaveBeenCalled();
  });

  it("The input value is not updated because newVal < min", () => {
    const setCurrent = jest.fn();
    render(
      <PrimeLimitInput current="0" max={10} min={1} setCurrent={setCurrent} />
    );
    const input = screen.getByLabelText<HTMLInputElement>(
      "Choose your target value"
    );
    fireEvent.change(input, { target: { value: "0" } });
    expect(setCurrent).not.toHaveBeenCalled();
  });

  it("The input value is not updated because newVal isn't a number", () => {
    const setCurrent = jest.fn();
    render(
      <PrimeLimitInput current="0" max={10} min={1} setCurrent={setCurrent} />
    );
    const input = screen.getByLabelText<HTMLInputElement>(
      "Choose your target value"
    );
    fireEvent.change(input, { target: { value: "FAIL" } });
    expect(setCurrent).not.toHaveBeenCalled();
  });
});

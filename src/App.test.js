import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", function () {
  beforeEach(() => {
    render(<App />);
  });

  test("should correct render app elements", async () => {
    const head = screen.getByText(/hello world/i);
    const btn = screen.getByRole("button");
    const input = screen.getByPlaceholderText("type something");

    expect(head).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("should have access to data block after 100ms after render", async () => {
    const dataBlock = await screen.findByText(/data/i);

    expect(dataBlock).toBeInTheDocument();
  });

  test("should correct processing click event", () => {
    const btn = screen.getByTestId("button-toggle");

    expect(screen.queryByTestId("toggle")).toBeNull();

    fireEvent.click(btn);

    expect(screen.queryByTestId("toggle")).toBeInTheDocument();
  });

  /**
   * TODO: знадобиться для написання тестів валідації на формі авторизації (зробити окремим проектом)
   */
  test("should correct processing change event", async () => {
    expect(screen.getByPlaceholderText("type something")).toHaveValue("");
    expect(screen.queryByTestId("controlled-paragraph")).toBeNull();

    // Create synthetic event
    fireEvent.change(screen.getByTestId("controlled-input"), {
      target: { value: "a" },
    });

    expect(screen.getByTestId("controlled-input")).toHaveValue("a");
    expect(screen.queryByTestId("controlled-paragraph")).toContainHTML("a");

    // Create realistic user events
    await userEvent.type(
      screen.getByTestId("controlled-input"),
      "Hello world!"
    );

    expect(screen.getByTestId("controlled-input")).toHaveValue("aHello world!");
    expect(screen.queryByTestId("controlled-paragraph")).toContainHTML(
      "aHello world!"
    );
  });
});

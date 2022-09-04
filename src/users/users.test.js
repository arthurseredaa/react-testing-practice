import { render, screen } from "@testing-library/react";
import Users from "./Users";
import axios from "axios";

jest.mock("axios");

describe("Users components", function () {
  let response;

  beforeEach(() => {
    response = {
      data: [
        {
          id: 1,
          name: "Leanne Graham",
        },
        {
          id: 2,
          name: "Ervin Howell",
        },
        {
          id: 3,
          name: "Clementine Bauch",
        },
        {
          id: 4,
          name: "Patricia Lebsack",
        },
      ],
    };
  });

  afterEach(() => jest.clearAllMocks());

  it("should correct render users list", async function () {
    axios.get.mockReturnValue(response);
    render(<Users />);

    const users = await screen.findAllByTestId("user-item");

    expect(axios.get).toBeCalledTimes(1);
    expect(users.length).toBe(4);
    screen.debug();
  });
});

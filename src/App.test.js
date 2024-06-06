/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

jest.mock("./constants/questions", () => ({
  questions: [
    {
      id: 1,
      title: "How you feel today?",
      options: [
        { id: 1, text: "Brilliant! I have so much energy", votes: 238 },
        { id: 2, text: "Always can be worse.", votes: 128 },
        { id: 3, text: "Please, end my misery.", votes: 99 },
      ],
    },
    {
      id: 2,
      title: "How you like the Opinary test?",
      options: [
        { id: 1, text: "It was great and so challenging.", votes: 383 },
        { id: 2, text: "Not bad, but you can improve.", votes: 60 },
        { id: 3, text: "It was a nightmare, never again.", votes: 22 },
      ],
    },
  ],
}));

test("renders App component with PollWidget components", async () => {
  const { getByText } = render(<App />);

  expect(getByText("Survey Poll Widget")).toBeInTheDocument();
});

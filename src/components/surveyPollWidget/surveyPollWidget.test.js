import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SurveyPollWidget from "./index";

describe("SurveyPollWidget", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders the question and options", () => {
    const question = {
      id: 1,
      title: "How do you like the new feature?",
      options: [
        { id: 1, text: "Love it", votes: 0 },
        { id: 2, text: "It's okay", votes: 0 },
        { id: 3, text: "Don't like it", votes: 0 },
      ],
    };

    render(<SurveyPollWidget question={question} />);

    expect(
      screen.getByText("How do you like the new feature?")
    ).toBeInTheDocument();
    expect(screen.getByText("Love it")).toBeInTheDocument();
    expect(screen.getByText("It's okay")).toBeInTheDocument();
    expect(screen.getByText("Don't like it")).toBeInTheDocument();
  });

  test("allows voting on an option and updates local storage", () => {
    const question = {
      id: 1,
      title: "How do you like the new feature?",
      options: [
        { id: 1, text: "Love it", votes: 0 },
        { id: 2, text: "It's okay", votes: 0 },
        { id: 3, text: "Don't like it", votes: 0 },
      ],
    };

    render(<SurveyPollWidget question={question} />);

    fireEvent.click(screen.getByText("Love it"));

    const storedVotes = JSON.parse(localStorage.getItem("votes"));
    expect(storedVotes[1][0].votes).toBe(1);
  });

  test("prevents voting on an option if already submitted", () => {
    const question = {
      id: 1,
      title: "How do you like the new feature?",
      options: [
        { id: 1, text: "Love it", votes: 0 },
        { id: 2, text: "It's okay", votes: 0 },
        { id: 3, text: "Don't like it", votes: 0 },
      ],
    };

    render(<SurveyPollWidget question={question} />);

    fireEvent.click(screen.getByText("Love it"));

    const storedVotes = JSON.parse(localStorage.getItem("votes"));
    expect(storedVotes[1][0].votes).toBe(1);
    expect(storedVotes[1][1].votes).toBe(0);
  });
});

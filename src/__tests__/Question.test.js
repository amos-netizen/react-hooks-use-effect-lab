import React from "react";
import { render, screen, act } from "@testing-library/react";
import Question from "../components/Question"; // Verify this path
import '@testing-library/jest-dom/extend-expect';

jest.useFakeTimers();

const testQuestion = {
  id: 1,
  prompt: "lorem testum",
  answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
  correctIndex: 0,
};

const noop = () => {};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn();
  render(<Question question={testQuestion} onAnswered={onAnswered} />);

  // Fast-forward time by 10 seconds
  act(() => {
    jest.advanceTimersByTime(10000);
  });

  // Flush any pending timers
  jest.runAllTimers();

  // Verify that onAnswered was called with false
  expect(onAnswered).toHaveBeenCalledTimes(1);
  expect(onAnswered).toHaveBeenCalledWith(false);
});

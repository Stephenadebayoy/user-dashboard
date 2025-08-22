/** @format */

import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingButton } from "./";

jest.mock("../star-loader", () => {
  const StarLoaderMock = () => <div data-testid="star-loader" />;
  StarLoaderMock.displayName = "StarLoaderMock";
  return StarLoaderMock;
});
jest.mock("../../../packages", () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

describe("LoadingButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when not loading", () => {
    render(<LoadingButton>Click Me</LoadingButton>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
    expect(screen.queryByTestId("star-loader")).not.toBeInTheDocument();
  });

  it("renders loader and default loading text when loading", () => {
    render(<LoadingButton loading={true}>Click Me</LoadingButton>);
    expect(screen.getByTestId("star-loader")).toBeInTheDocument();
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
    expect(screen.queryByText("Click Me")).not.toBeInTheDocument();
  });

  it("renders loader with custom loading text", () => {
    render(
      <LoadingButton loading={true} loadingText="Loading...">
        Click Me
      </LoadingButton>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("disables button when loading", () => {
    render(<LoadingButton loading={true}>Click Me</LoadingButton>);
    expect(screen.getByTestId("button")).toBeDisabled();
  });

  it("applies custom className and loadingClass", () => {
    render(
      <LoadingButton
        className="my-custom-btn"
        loadingClass="my-loader"
        loading={true}
      >
        Test
      </LoadingButton>
    );
    expect(screen.getByTestId("button")).toHaveClass("my-custom-btn");
    expect(screen.getByTestId("loading-wrapper")).toHaveClass("my-loader");
  });
});

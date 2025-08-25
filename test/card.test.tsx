/** @format */

import React from "react";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../packages";

describe("Card components", () => {
  it("renders Card with children and default classes", () => {
    render(
      <Card data-testid="card">
        <p>Inside Card</p>
      </Card>
    );
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent("Inside Card");
    expect(card.className).toContain("rounded-xl");
  });

  it("renders CardHeader with custom class and content", () => {
    render(
      <CardHeader data-testid="card-header" className="bg-red-500">
        <span>Header</span>
      </CardHeader>
    );
    const header = screen.getByTestId("card-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Header");
    expect(header.className).toContain("bg-red-500");
  });

  it("renders CardTitle correctly", () => {
    render(<CardTitle data-testid="card-title">Card Title</CardTitle>);
    const title = screen.getByTestId("card-title");
    expect(title.tagName.toLowerCase()).toBe("h3");
    expect(title).toHaveTextContent("Card Title");
    expect(title.className).toContain("font-semibold");
  });

  it("renders CardDescription correctly", () => {
    render(
      <CardDescription data-testid="card-description">
        Description here
      </CardDescription>
    );
    const description = screen.getByTestId("card-description");
    expect(description.tagName.toLowerCase()).toBe("p");
    expect(description).toHaveTextContent("Description here");
    expect(description.className).toContain("text-sm");
  });

  it("renders CardContent with default padding", () => {
    render(
      <CardContent data-testid="card-content">
        <p>Some content</p>
      </CardContent>
    );
    const content = screen.getByTestId("card-content");
    expect(content).toHaveTextContent("Some content");
    expect(content.className).toContain("p-6");
  });

  it("renders CardFooter with default layout", () => {
    render(
      <CardFooter data-testid="card-footer">
        <p>Footer stuff</p>
      </CardFooter>
    );
    const footer = screen.getByTestId("card-footer");
    expect(footer).toHaveTextContent("Footer stuff");
    expect(footer.className).toContain("flex");
  });
});

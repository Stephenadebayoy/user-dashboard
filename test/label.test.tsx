/** @format */

import { render, screen } from "@testing-library/react";
import React from "react";
import { Label } from "../packages";

describe("Label Component", () => {
  it("renders label with text content", () => {
    render(<Label htmlFor="input-id">Name</Label>);
    const label = screen.getByText("Name");
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe("label");
    expect(label).toHaveAttribute("for", "input-id");
  });

  it("applies custom className", () => {
    render(<Label className="text-red-500">Email</Label>);
    const label = screen.getByText("Email");
    expect(label).toHaveClass("text-red-500");
  });

  it("renders correctly when associated input is disabled", () => {
    render(
      <>
        <Label htmlFor="disabled-input">Disabled</Label>
        <input id="disabled-input" disabled className="peer" />
      </>
    );
    const label = screen.getByText("Disabled");
    expect(label).toBeInTheDocument();
  });
});

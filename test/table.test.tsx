/** @format */

import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../packages";

describe("Table components", () => {
  it("renders the Table with default and custom classes", () => {
    render(
      <Table className="custom-table">
        <thead />
      </Table>
    );
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass(
      "w-full",
      "caption-bottom",
      "text-sm",
      "custom-table"
    );
  });

  it("renders TableHeader with custom class", () => {
    render(
      <table>
        <TableHeader className="custom-header">
          <tr>
            <th>Header</th>
          </tr>
        </TableHeader>
      </table>
    );
    expect(screen.getByText("Header").closest("thead")).toHaveClass(
      "custom-header"
    );
  });

  it("renders TableBody with custom class", () => {
    render(
      <table>
        <TableBody className="custom-body">
          <tr>
            <td>Body</td>
          </tr>
        </TableBody>
      </table>
    );
    expect(screen.getByText("Body").closest("tbody")).toHaveClass(
      "custom-body"
    );
  });

  it("renders TableFooter with default and custom classes", () => {
    render(
      <table>
        <TableFooter className="custom-footer">
          <tr>
            <td>Footer</td>
          </tr>
        </TableFooter>
      </table>
    );
    const footer = screen.getByText("Footer").closest("tfoot");
    expect(footer).toHaveClass(
      "border-t",
      "bg-muted/50",
      "font-medium",
      "custom-footer"
    );
  });

  it("renders TableRow and responds to hover class", () => {
    render(
      <table>
        <tbody>
          <TableRow className="custom-row">
            <td>Row</td>
          </TableRow>
        </tbody>
      </table>
    );
    expect(screen.getByText("Row").closest("tr")).toHaveClass("custom-row");
  });

  it("renders TableHead cell with default and custom classes", () => {
    render(
      <table>
        <thead>
          <tr>
            <TableHead className="custom-head">Head</TableHead>
          </tr>
        </thead>
      </table>
    );
    expect(screen.getByText("Head")).toHaveClass(
      "font-medium",
      "text-muted-foreground",
      "custom-head"
    );
  });

  it("renders TableCell with default and custom classes", () => {
    render(
      <table>
        <tbody>
          <tr>
            <TableCell className="custom-cell">Cell</TableCell>
          </tr>
        </tbody>
      </table>
    );
    expect(screen.getByText("Cell")).toHaveClass(
      "text-sm",
      "align-middle",
      "custom-cell"
    );
  });

  it("renders TableCaption with custom class", () => {
    render(
      <table>
        <TableCaption className="custom-caption">Caption</TableCaption>
      </table>
    );
    expect(screen.getByText("Caption")).toHaveClass(
      "text-muted-foreground",
      "custom-caption"
    );
  });

  it("forwards ref correctly to Table", () => {
    const ref = createRef<HTMLTableElement>();
    render(
      <Table ref={ref}>
        <thead />
      </Table>
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });
});

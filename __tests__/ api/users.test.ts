/** @format
 * @jest-environment node
 */
import { GET } from "@/app/(app)/api/users/route";
import { NextRequest } from "next/server";

describe("/api/users API", () => {
  it("returns users successfully (happy path)", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/users?page=1&limit=5"
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.meta).toHaveProperty("total");
  });

  it("returns 400 for invalid query params", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/users?page=-1&limit=500"
    );
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid query parameters");
    expect(data.details.length).toBeGreaterThan(0);
  });
});

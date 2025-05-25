import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { getGroupedUserSummary } from "./userSummaryService";
import { mockUsers } from "../__mocks__/mockUsers";
import fastify from "../server";

vi.mock("axios");

describe("getGroupedUserSummary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("groups users by department correctly", async () => {
    (axios.get as any).mockResolvedValue({ data: { users: mockUsers } });

    const summary = await getGroupedUserSummary();

    expect(summary.Engineering.male).toBe(1);
    expect(summary.Engineering.female).toBe(1);
    expect(summary.Engineering.hair.Black).toBe(1);
    expect(summary.Engineering.hair.Blond).toBe(1);
    expect(summary.Engineering.addressUser.TerryMedhurst).toBe("10001");
    expect(summary.Engineering.ageRange).toBe("30-40");

    expect(summary.Marketing.male).toBe(1);
    expect(summary.Marketing.female).toBe(0);
    expect(summary.Marketing.hair.Black).toBe(1);
    expect(summary.Marketing.addressUser.JohnSmith).toBe("30003");
    expect(summary.Marketing.ageRange).toBe("25-25");
  });

  it("handles empty users array", async () => {
    (axios.get as any).mockResolvedValue({ data: { users: [] } });

    const summary = await getGroupedUserSummary();
    expect(summary).toEqual({});
  });

  it("handles unexpected error", async () => {
    (axios.get as any).mockRejectedValue(new Error("Network error"));

    await expect(getGroupedUserSummary()).rejects.toThrow("Network error");
  });

  it("GET /grouped-users responds under 300ms", async () => {
    const start = performance.now();
    const response = await fastify.inject({
      method: "GET",
      url: "/grouped-users",
    });
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(300);
  });
});

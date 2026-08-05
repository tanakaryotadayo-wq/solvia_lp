import { describe, expect, it } from "vitest";
import { leadSchema } from "../lib/lead-schema";

const validLead = {
  activityStage: "just-started",
  platforms: ["TikTok LIVE"],
  concern: "配信の話題が続かず、次回から試せる改善案を相談したいです。",
  contactMethod: "line",
  contactValue: "example_line_id",
  consentAccepted: true,
  source: "website",
  website: "",
};

describe("leadSchema", () => {
  it("accepts a minimal valid consultation", () => {
    expect(leadSchema.safeParse(validLead).success).toBe(true);
  });

  it("rejects honeypot submissions", () => {
    expect(
      leadSchema.safeParse({ ...validLead, website: "spam.example" }).success,
    ).toBe(false);
  });

  it("rejects vague one-line concerns", () => {
    expect(leadSchema.safeParse({ ...validLead, concern: "困った" }).success).toBe(
      false,
    );
  });

  it("rejects a submission without explicit consent", () => {
    expect(
      leadSchema.safeParse({ ...validLead, consentAccepted: false }).success,
    ).toBe(false);
  });

  it("validates an email contact according to the selected method", () => {
    expect(
      leadSchema.safeParse({
        ...validLead,
        contactMethod: "email",
        contactValue: "not-an-email",
      }).success,
    ).toBe(false);
  });
});

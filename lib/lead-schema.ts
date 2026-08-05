import { z } from "zod";

export const activityStages = [
  "not-started",
  "just-started",
  "active",
  "considering-transfer",
] as const;

export const contactMethods = ["line", "email"] as const;
export const supportedPlatforms = ["TikTok LIVE", "Pococha", "17LIVE", "その他"] as const;

export const leadSchema = z
  .object({
    activityStage: z.enum(activityStages),
    platforms: z.array(z.enum(supportedPlatforms)).min(1).max(supportedPlatforms.length),
    concern: z.string().trim().min(10).max(600),
    contactMethod: z.enum(contactMethods),
    contactValue: z.string().trim().min(3).max(160),
    consentAccepted: z.literal(true),
    source: z.literal("website").default("website"),
    website: z.string().max(0).optional().default(""),
    utm: z
      .object({
        source: z.string().trim().max(120).optional(),
        medium: z.string().trim().max(120).optional(),
        campaign: z.string().trim().max(120).optional(),
        content: z.string().trim().max(120).optional(),
      })
      .optional(),
  })
  .superRefine((input, context) => {
    if (
      input.contactMethod === "email" &&
      !z.string().email().safeParse(input.contactValue).success
    ) {
      context.addIssue({
        code: "custom",
        path: ["contactValue"],
        message: "有効なメールアドレスを入力してください",
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;

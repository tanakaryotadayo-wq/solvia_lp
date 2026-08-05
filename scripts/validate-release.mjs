import { readFile } from "node:fs/promises";

const production =
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_RELEASE_MODE === "production";

const release = JSON.parse(
  await readFile(new URL("../content/release.json", import.meta.url), "utf8"),
);
const claims = JSON.parse(
  await readFile(new URL("../content/claims.json", import.meta.url), "utf8"),
);

if (!production) {
  console.log("Solvia release gate: preview mode");
  process.exit(0);
}

const required = [
  "SOLVIA_OPERATING_ENTITY",
  "SOLVIA_REPRESENTATIVE",
  "SOLVIA_OPERATING_ADDRESS",
  "SOLVIA_CONTACT_EMAIL",
  "SOLVIA_PRIVACY_EFFECTIVE_DATE",
  "SOLVIA_INITIAL_FEE",
  "SOLVIA_MONTHLY_FEE",
  "SOLVIA_REWARD_FORMULA",
  "SOLVIA_PAYMENT_SCHEDULE",
  "SOLVIA_CONTRACT_TERM",
  "SOLVIA_TERMINATION_NOTICE",
  "SOLVIA_ACCOUNT_OWNERSHIP",
  "SOLVIA_MINOR_POLICY",
  "DATABASE_URL",
  "LEAD_HASH_SECRET",
  "LEAD_NOTIFICATION_WEBHOOK_URL",
  "LEAD_WEBHOOK_SECRET",
  "CRON_SECRET",
];

const missing = required.filter((key) => !process.env[key]?.trim());
const errors = [];
const unverifiedClaims = claims.filter(
  (claim) =>
    claim.status !== "verified" ||
    !claim.owner?.trim() ||
    !claim.evidence?.trim() ||
    !claim.validFrom?.trim(),
);

if (release.releaseState !== "approved") {
  errors.push('content/release.json must use releaseState "approved"');
}
if (!release.reviewedAt || Number.isNaN(Date.parse(release.reviewedAt))) {
  errors.push("content/release.json reviewedAt must be a valid approval date");
}
if (!release.reviewedBy?.trim()) {
  errors.push("content/release.json reviewedBy is required");
}
if (process.env.SOLVIA_RELEASE_APPROVED !== "true") {
  errors.push("SOLVIA_RELEASE_APPROVED must be true");
}
if (process.env.NEXT_PUBLIC_RELEASE_MODE !== "production") {
  errors.push("NEXT_PUBLIC_RELEASE_MODE must be production");
}
if (missing.length) {
  errors.push(`missing production variables: ${missing.join(", ")}`);
}
if (unverifiedClaims.length) {
  errors.push(
    `unverified public claims: ${unverifiedClaims.map((claim) => claim.id).join(", ")}`,
  );
}

const email = process.env.SOLVIA_CONTACT_EMAIL;
if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errors.push("SOLVIA_CONTACT_EMAIL must be a valid email address");
}

const privacyDate = process.env.SOLVIA_PRIVACY_EFFECTIVE_DATE;
if (privacyDate && !/^\d{4}-\d{2}-\d{2}$/.test(privacyDate)) {
  errors.push("SOLVIA_PRIVACY_EFFECTIVE_DATE must use YYYY-MM-DD");
}

const webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK_URL;
if (webhookUrl) {
  try {
    if (new URL(webhookUrl).protocol !== "https:") {
      errors.push("LEAD_NOTIFICATION_WEBHOOK_URL must use HTTPS");
    }
  } catch {
    errors.push("LEAD_NOTIFICATION_WEBHOOK_URL must be a valid URL");
  }
}

for (const secretName of ["LEAD_HASH_SECRET", "LEAD_WEBHOOK_SECRET", "CRON_SECRET"]) {
  const value = process.env[secretName];
  if (value && value.length < 32) {
    errors.push(`${secretName} must contain at least 32 characters`);
  }
}

if (errors.length) {
  console.error(`Solvia release gate blocked production:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log("Solvia release gate: approved");

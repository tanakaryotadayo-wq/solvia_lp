import claimsData from "./claims.json";

export type ClaimStatus = "verified" | "operator-review" | "disabled";

export type Claim = {
  id: string;
  statement: string;
  status: ClaimStatus;
  owner: string;
  evidence: string;
  validFrom: string;
  validTo?: string;
};

/**
 * Public claims live here instead of being scattered through JSX.
 * A production release is rejected when an active claim lacks verification.
 */
export const claims = claimsData as Claim[];

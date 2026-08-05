import "server-only";
import release from "../content/release.json";

export function isApprovedProductionRelease() {
  return (
    process.env.VERCEL_ENV === "production" &&
    process.env.NEXT_PUBLIC_RELEASE_MODE === "production" &&
    process.env.SOLVIA_RELEASE_APPROVED === "true" &&
    release.releaseState === "approved"
  );
}

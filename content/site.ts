import { isApprovedProductionRelease } from "../lib/release";
import { publicSiteConfig } from "./public-site";

const productionApproved = isApprovedProductionRelease();
const privacyEffectiveDate =
  process.env.SOLVIA_PRIVACY_EFFECTIVE_DATE || "公開前確認中";

export const siteConfig = {
  ...publicSiteConfig,
  operatingEntity: process.env.SOLVIA_OPERATING_ENTITY || "公開前確認中",
  representative: process.env.SOLVIA_REPRESENTATIVE || "公開前確認中",
  operatingAddress: process.env.SOLVIA_OPERATING_ADDRESS || "公開前確認中",
  contactEmail: process.env.SOLVIA_CONTACT_EMAIL || "公開前確認中",
  privacyEffectiveDate,
  consentVersion: productionApproved
    ? `privacy-${privacyEffectiveDate}`
    : "privacy-preview-not-persisted",
  isProductionApproved: productionApproved,
  contract: {
    initialFee: process.env.SOLVIA_INITIAL_FEE || "公開前確認中",
    monthlyFee: process.env.SOLVIA_MONTHLY_FEE || "公開前確認中",
    rewardFormula: process.env.SOLVIA_REWARD_FORMULA || "公開前確認中",
    paymentSchedule: process.env.SOLVIA_PAYMENT_SCHEDULE || "公開前確認中",
    term: process.env.SOLVIA_CONTRACT_TERM || "公開前確認中",
    terminationNotice: process.env.SOLVIA_TERMINATION_NOTICE || "公開前確認中",
    accountOwnership: process.env.SOLVIA_ACCOUNT_OWNERSHIP || "公開前確認中",
    minorPolicy: process.env.SOLVIA_MINOR_POLICY || "公開前確認中",
  },
} as const;

export const navigation = [
  { href: "/#support", label: "サポート" },
  { href: "/#method", label: "進め方" },
  { href: "/contract", label: "契約・費用" },
  { href: "/#faq", label: "FAQ" },
] as const;

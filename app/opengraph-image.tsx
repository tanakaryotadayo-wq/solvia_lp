import { ImageResponse } from "next/og";
import { publicSiteConfig } from "../content/public-site";

export const alt = "配信を見て、次の一手まで返す。solvia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px 78px",
        background: "#f6f1e9",
        color: "#171513",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, fontWeight: 700 }}>
        <span style={{ width: 18, height: 18, borderRadius: 99, background: "#e93d73" }} />
        solvia
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <span style={{ fontSize: 23, letterSpacing: 5, color: "#e93d73", fontWeight: 700 }}>
          LIVE STREAM GROWTH PARTNER
        </span>
        <span style={{ fontSize: 70, lineHeight: 1.14, fontWeight: 800, letterSpacing: -3 }}>
          配信を見て、<br />次の一手まで返す。
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span>ライバー事務所 solvia</span>
        <span>{publicSiteConfig.siteUrl.replace(/^https?:\/\//, "")}</span>
      </div>
      <div style={{ position: "absolute", width: 410, height: 410, border: "3px solid #e93d73", borderRadius: 999, right: -120, top: -140 }} />
      <div style={{ position: "absolute", width: 180, height: 180, background: "#cadf62", borderRadius: 999, right: 120, bottom: -145 }} />
    </div>,
    size,
  );
}

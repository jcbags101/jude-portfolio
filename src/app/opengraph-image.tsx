import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f2efe7",
          color: "#17150f",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: "1px solid #cfc9ba",
            paddingBottom: "20px",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#575248",
          }}
        >
          <div style={{ display: "flex" }}>{site.role}</div>
          <div style={{ display: "flex" }}>Philippines</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -5,
            lineHeight: 1.0,
            maxWidth: 1000,
          }}
        >
          I build software people actually use.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #cfc9ba",
            paddingTop: "22px",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#d6401c" }}>
            7+ years full-stack
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

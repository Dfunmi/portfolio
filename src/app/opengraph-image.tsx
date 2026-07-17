import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0b",
          backgroundImage:
            "radial-gradient(circle at 12% 20%, rgba(110,86,207,0.35), transparent 45%), radial-gradient(circle at 88% 85%, rgba(51,115,220,0.28), transparent 45%)",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 24,
            color: "#b4a4f7",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Frontend Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "#a6a6b0",
            maxWidth: 860,
            lineHeight: 1.4,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size }
  );
}

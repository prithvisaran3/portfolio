import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Prithvi Saran Sathyasaran - Mobile App Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(10, 132, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(175, 82, 222, 0.3) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "white",
              marginBottom: "20px",
            }}
          >
            Prithvi Saran Sathyasaran
          </h1>
          <p
            style={{
              fontSize: "36px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "10px",
            }}
          >
            Mobile App Developer
          </p>
          <p
            style={{
              fontSize: "28px",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Flutter · iOS · Android
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


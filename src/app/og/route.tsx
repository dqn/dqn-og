import { ImageResponse } from "@vercel/og";

export const runtime = "experimental-edge";

const font = fetch(
  new URL("../../../assets/NotoSansJP-Bold.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";

  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          padding: 48,
          width: "100%",
          height: "100%",
          backgroundImage: "url(http://localhost:3001/og-base.png)",
        }}
      >
        <div
          style={{
            fontSize: 64,
            padding: 32,
            borderRadius: 16,
            width: "100%",
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "NotoSansJP-Bold",
            fontWeight: "bold",
            color: "#383635",
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "NotoSansJP-Bold",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}

import { ImageResponse } from "@vercel/og";

const font = fetch("https://dqn-og.vercel.app/font.woff").then((res) =>
  res.arrayBuffer(),
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") ?? "";

  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          padding: 48 + 32,
          fontSize: 64,
          fontFamily: "NotoSansJP-Bold",
          fontWeight: "bold",
          color: "#383635",
          width: "100%",
          height: "100%",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "pre-wrap",
          backgroundImage: "url(https://dqn-og.vercel.app/og-base.png)",
        }}
      >
        {text}
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
    },
  );
}

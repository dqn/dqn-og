import { ImageResponse } from "@vercel/og";

export const runtime = "experimental-edge";

// @ts-expect-error
function fetchFont(): Promise<ArrayBuffer> {
  const url = new URL("../../../assets/font.woff", import.meta.url);
  return fetch(url).then((res) => res.arrayBuffer());
}

export async function GET(req: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text") || "";

  console.log(process.env["SKIP"]);

  const fontData = new Uint8Array([]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          padding: 48,
          width: "100%",
          height: "100%",
          backgroundImage: "url(https://dqn-og.vercel.app/og-base.png)",
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
            // fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "#383635",
            whiteSpace: "pre-wrap",
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
    },
  );
}

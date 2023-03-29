import { ImageResponse } from "@vercel/og";

export const runtime = "experimental-edge";

const encodedPath = [
  46, 46, 47, 46, 46, 47, 46, 46, 47, 97, 115, 115, 101, 116, 115, 47, 102, 111,
  110, 116, 46, 119, 111, 102, 102,
];

const path = encodedPath.map((n) => String.fromCharCode(n)).join("");
const font = fetch(new URL(path, import.meta.url)).then((res) =>
  res.arrayBuffer(),
);

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

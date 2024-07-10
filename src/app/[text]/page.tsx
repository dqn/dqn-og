import type { Metadata } from "next";

type Props = {
  params: { text: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const text = params.text;

  return {
    title: "dqn-og",
    metadataBase: new URL("https://dqn-og.vercel.app/"),
    openGraph: {
      images: [`/og?text=${text}`],
    },
  };
}

const Page: React.FC = () => {
  return <div className="text-red-500">Hello</div>;
};

export default Page;

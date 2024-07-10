import type { Metadata } from "next";
import { Main } from "./Main";

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
  return <Main />;
};

export default Page;

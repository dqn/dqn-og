const siteName = "dqn-og";
const baseUrl = "https://dqn-og.vercel.app";

type Props = {
  params: {
    text: string;
  };
};

const Head: React.FC<Props> = ({ params }) => {
  const text = params.text;
  const description = decodeURIComponent(text);

  return (
    <>
      <title>dqn-og</title>
      <meta
        content={description}
        property="og:description"
        key="og:description"
      />
      <>
        <meta
          content={`${baseUrl}/og?text=${text}`}
          property="og:image"
          key="og:image"
        />
        <meta content="article" property="og:image:type" key="og:image:type" />
        <meta content="1200" property="og:image:width" key="og:image:width" />
        <meta content="630" property="og:image:height" key="og:image:height" />
      </>
      <meta content={siteName} property="og:site_name" key="og:site_name" />
      <meta content={siteName} property="og:title" key="og:title" />
      <meta content="article" property="og:type" />
      <meta content={baseUrl} property="og:url" key="og:url" />
      <meta
        content="summary_large_image"
        name="twitter:card"
        key="twitter:card"
      />
      <meta content={siteName} name="twitter:title" key="twitter:title" />
    </>
  );
};

export default Head;

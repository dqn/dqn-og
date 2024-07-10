"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { useState } from "react";

export const Main: React.FC = () => {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [resultUrl, setResultUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateClick = async () => {
    setIsPending(true);
    const res = await fetch(`/og?text=${encodeURIComponent(text)}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
    setResultUrl(location.origin + "/" + encodeURIComponent(text));
    setIsPending(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(resultUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <main className="mx-auto max-w-[480px] p-4">
      <h1 className="text-xl font-bold">og generator</h1>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        className="mt-8 w-full rounded-md border border-stone-700 p-2 [field-sizing:content]"
        placeholder="Enter text"
      />
      <div className="text-center">
        <button
          type="button"
          onClick={handleGenerateClick}
          className="mt-4 w-full rounded bg-[#665886] py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isPending || text === ""}
        >
          Generate
        </button>
      </div>
      <div className="mt-4">
        {isPending ? (
          <AspectRatio
            ratio={1200 / 630}
            className="flex animate-pulse items-center justify-center bg-slate-400 text-xl font-bold text-white"
          >
            Generating...
          </AspectRatio>
        ) : (
          <div>
            {imageUrl && (
              <Image src={imageUrl} width={1200} height={630} alt={text} />
            )}
          </div>
        )}
      </div>
      {imageUrl && (
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            value={resultUrl}
            className="flex-1 rounded-md border border-stone-700 p-2"
            readOnly
          />
          <button
            onClick={handleCopyClick}
            className="rounded bg-[#665886] px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isCopied}
          >
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
    </main>
  );
};

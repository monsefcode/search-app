import SearchInput from "@/components/SearchInput";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <SearchInput />
      <Component {...pageProps} />
    </main>
  );
}

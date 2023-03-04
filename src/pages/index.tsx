import Head from "next/head";
import { Inter } from "next/font/google";

export default function Home() {
  return (
    <>
      <Head>
        <title>Search App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <h1
          className="
          text-4xl
          font-bold
          text-center
          text-blue-200
          mt-10
        "
        >
          Search App
        </h1>
      </section>
    </>
  );
}

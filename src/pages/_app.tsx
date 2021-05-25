import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ErrorToastController } from "../modules/errors/ErrorToastController";

import "../styles/globals.css";

function ServiceQuotesApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
      <ErrorToastController />
    </>
  );
}

export default ServiceQuotesApp;

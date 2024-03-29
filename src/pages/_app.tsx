import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/queryClient";
import { AppProps } from "next/app";
import Head from "next/head";
import { ToastController } from "../modules/toasts/ToastController";
import { AuthProvider } from "../modules/auth/AuthProvider";
import { ConfirmModal } from "../shared-components/ConfirmModal";
import Router from "next/router";
import NProgress from "nprogress";

import "../styles/globals.css";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function ServiceQuotesApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="manifest" href="/manifest.json" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
          />
        </Head>
        <Component {...pageProps} />
        <ToastController />
        <ConfirmModal />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default ServiceQuotesApp;

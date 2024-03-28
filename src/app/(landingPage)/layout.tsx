import Head from "next/head";
import Script from "next/script";
import React, { ReactNode } from "react";

// Define props interface for the layout component
interface LayoutProps {
  children: ReactNode;
}

// Layout component
function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-4WG1G1YSLH"
        />

        <Script strategy="lazyOnload" id="my-script">
          {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4WG1G1YSLH');`}
        </Script>
      </Head>
      <div>{children}</div>
    </>
  );
}

export default Layout;

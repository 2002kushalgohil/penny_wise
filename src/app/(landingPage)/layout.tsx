import Script from "next/script";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
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
      <div>{children}</div>
    </>
  );
}

export default Layout;

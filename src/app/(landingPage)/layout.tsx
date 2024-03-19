import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (<div className="h-full">{children}</div>);
}

export default layout;

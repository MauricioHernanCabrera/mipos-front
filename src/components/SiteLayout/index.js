import React from "react";
import { SiteLayout, SiteBody } from "./styles";

const CoreSiteLayout = ({ children }) => {
  return (
    <SiteLayout>
      <SiteBody>{children}</SiteBody>
    </SiteLayout>
  );
};

export default CoreSiteLayout;

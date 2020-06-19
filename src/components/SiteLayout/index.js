import React from "react";
import { SiteLayout, SiteBody, SiteFooter } from "./styles";
import PanicButton from "./../PanicButton";

const CoreSiteLayout = ({ children }) => {
  return (
    <SiteLayout>
      <SiteBody>{children}</SiteBody>
      <SiteFooter>
        <PanicButton />
      </SiteFooter>
    </SiteLayout>
  );
};

export default CoreSiteLayout;

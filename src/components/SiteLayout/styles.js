import styled from "styled-components";
import { COLOR_LIGHT } from "./../../styles/variables";
import { Layout } from "antd";

export const SiteLayout = styled(Layout)`
  min-height: 100vh;
`;

export const SiteBody = styled(Layout)`
  background-color: ${COLOR_LIGHT};
`;

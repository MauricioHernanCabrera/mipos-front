import styled from "styled-components";
import { COLOR_PRIMARY, COLOR_LIGHT } from "./../../styles/variables";
import { Form } from "antd";

export const OpenContainer = styled.div``;

export const OpenHeader = styled.div`
  padding: 16px 24px;
  background-color: ${COLOR_PRIMARY};
  color: ${COLOR_LIGHT};
  font-size: 16px;
  font-weight: 700;
`;

export const OpenBody = styled(Form)`
  margin: 24px;
`;

import styled from "styled-components";
import { COLOR_PRIMARY } from "./../../styles/variables";
import { Form } from "antd";

export const FormItemWrapper = styled(Form.Item)`
  .ant-form-item-label {
    padding-bottom: 2px;
    label {
      height: auto;
      &::before {
        display: none;
      }
    }
  }

  .ant-form-item-control {
    .ant-form-item-control-input {
      .ant-form-item-control-input-content {
        .ant-input-number {
          width: 100%;
        }
        .ant-input-affix-wrapper {
          &:hover {
            border-color: ${COLOR_PRIMARY};
          }
        }
        input,
        textarea {
          &:hover {
            border-color: ${COLOR_PRIMARY};
          }
        }
      }
    }
  }
`;

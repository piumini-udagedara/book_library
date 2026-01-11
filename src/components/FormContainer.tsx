import { Form, type FormProps } from "antd";
import styled from "styled-components";
import theme from "../theme";

export const FormContainer = styled(Form)<FormProps>`
  .ant-form-item .ant-form-item-label > label {
    color: ${theme.black};
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .ant-form-item .ant-form-item-label {
    padding: 0 0 6px !important;
  }
  .ant-form-item-required {
    flex-direction: row-reverse;
  }
  .ant-form-item-required::before {
    margin-left: 4px;
    color: ${theme.red500} !important;
    font-size: 16px;
    font-family: inherit !important;
    line-height: 1 !important;
    content: "*";
  }

  .ant-form-item-required::after {
    width: 0;
    margin: 0 !important;
  }
  .ant-form-item {
    margin-bottom: 0px;
    padding-bottom: 24px;
  }
`;

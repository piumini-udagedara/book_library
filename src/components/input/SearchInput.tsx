"use client";

import { Input as AntInput, type InputProps } from "antd";
import styled from "styled-components";
import theme from "../../theme";
import { Search } from "../../assets";
import type { FC } from "react";

type Props = Omit<InputProps, "size"> & {
  width?: string;
};

const StyledInput = styled(AntInput)<Props>`
  border: 1px solid ${theme.gray300};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: 40px !important;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  padding: 10px 16px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

  &:hover:not(:disabled) {
    border-color: ${theme.blue50};
  }
  &:focus,
  &:focus-within {
    border-color: ${theme.blue50};
  }
  .ant-input-affix-wrapper .ant-input-prefix {
    margin-inline-end: 6px;
  }
  .ant-input {
    &::placeholder {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: ${theme.gray500};
    }
  }
`;

export const SearchInput: FC<Props> = ({ width, ...props }) => {
  return (
    <StyledInput
      width={width}
      {...props}
      prefix={<img src={Search} />}
      placeholder="Search"
    />
  );
};

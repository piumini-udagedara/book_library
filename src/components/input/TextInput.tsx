import { Input as AntInput, type InputProps } from "antd";
import styled from "styled-components";
import theme from "../../theme";
import type { FC } from "react";
import { Typography } from "../Typography";

type Props = Omit<InputProps, "size"> & {
  label?: string;
  hint?: string;
  flexDirection?: string;
  size?: "small" | "large";
};

const StyledInput = styled(AntInput)<Props>`
  ${(props) => props.flexDirection === "row" && "width: 344px;"}
  border: 1px solid ${theme.gray300};
  width: 100%;
  line-height: 20px;
  padding: ${(props) => props.size === "small" && "0 12px"};
  height: ${(props) => (props.size == "small" ? "32px !important" : "40px")};
  &:focus {
    border: 1px solid ${theme.blue500};
    box-shadow: none;
  }

  .ant-input[disabled] {
    background-color: ${theme.gray200};
  }

  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border-color: ${theme.blue500};
  }

  &.ant-input-affix-wrapper:focus,
  &.ant-input-affix-wrapper-focused {
    border-color: ${theme.blue500};
    box-shadow: none;
  }

  &:hover {
    border: 1px solid ${theme.blue500};
  }
`;

export const TextInput: FC<Props> = (props) => {
  const { label, hint, flexDirection = "column", size = "large" } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {label && <Typography type="body-small-regular">{label}</Typography>}
      <StyledInput {...props} size={size} flexDirection={flexDirection} />
      {hint && (
        <Typography type="body-xs-regular" color={theme.green500}>
          {hint}
        </Typography>
      )}
    </div>
  );
};

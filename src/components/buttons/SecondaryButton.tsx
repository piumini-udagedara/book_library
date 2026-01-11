import React, { type FC } from "react";
import { Button, type ButtonProps } from "antd";
import theme from "../../theme";
import styled from "styled-components";

type Props = Omit<ButtonProps, "shape" | "ghost" | "danger" | "type"> & {
  size?: "small" | "large";
};

const StyledButton = styled(Button)<Props>`
  height: 40px;

  line-height: 20px;
  border-radius: 8px;
  box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.1);
  background-color: ${theme.white};
  color: ${theme.blue400};
  border: 1px solid ${theme.blue400};

  &.btn-disabled {
    border: 1px solid ${theme.gray400};
    color: ${theme.gray400};
  }

  &.btn-disabled .ant-btn-loading-icon {
    color: ${theme.gray400};
    padding-left: 0px;
  }

  &.btn-disabled:hover {
    background-color: ${theme.white};
    color: ${theme.gray400};
    border-color: ${theme.gray400};
  }

  &.btn-disabled:focus {
    background-color: ${theme.white};
    color: ${theme.gray400};
    border-color: ${theme.gray400};
  }

  &.btn-small {
    height: 32px;
  }

  .ant-btn-loading-icon {
    color: ${theme.blue500};
    padding-left: 0px;
  }

  &:focus {
    background-color: ${theme.blue50};
    color: ${theme.blue400};
    border-color: ${theme.blue600};
  }

  &:hover {
    background-color: ${theme.blue50};
    color: ${theme.blue400};
    border-color: ${theme.blue600};
  }

  .btn-custom-icon-left {
    margin-right: ${(props) => (props.icon ? "6px" : 0)};
    max-height: 20px;
    color: ${theme.blue500};
  }
`;
export const SecondaryButton: FC<Props> = ({ size = "large", ...props }) => {
  let icon: React.ReactNode | null = null;
  let className = `btn-${size} ${props.className || ""}`;
  if (props.icon || props.loading) {
    icon = <span className="btn-custom-icon-left">{props.icon}</span>;
  }
  if (props.disabled) {
    className = "btn-disabled " + className;
  }

  return (
    <StyledButton {...props} size={undefined} icon={icon} className={className}>
      {props.children}
    </StyledButton>
  );
};

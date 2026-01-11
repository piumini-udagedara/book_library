import { Button, type ButtonProps } from "antd";
import theme from "../../theme";
import styled from "styled-components";
import type { FC, ReactNode } from "react";

type Props = Omit<ButtonProps, "shape" | "ghost" | "danger" | "type"> & {
  size?: "small" | "large";
};

const StyledButton = styled(Button)<Props>`
  color: ${theme.white};
  background: ${theme.blue500};
  box-shadow: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  height: 40px;
  padding: 10px 16px;
  border-radius: 8px;
  &.btn-small {
    height: 32px;
    padding: 6px 16px;
  }
  &:focus {
    color: ${theme.white};
    background-color: ${theme.blue600};
    border: 1px solid ${theme.blue600};
  }

  &:hover {
    background-color: ${theme.blue600} !important;
    color: ${theme.white}!important;
    border-color: ${theme.blue600}!important;
  }
  :where(.css-dev-only-do-not-override-1drr2mu).ant-btn-primary:disabled,
  :where(
      .css-dev-only-do-not-override-1drr2mu
    ).ant-btn-primary.ant-btn-disabled {
    color: ${theme.white}!important;
    background-color: ${theme.gray400} !important;
    border-color: ${theme.gray400} !important;
  }
  &.btn-disabled:hover,
  &.btn-disabled:focus {
    outline: none;
    box-shadow: none;
    background-color: ${theme.gray400} !important;
  }
`;

export const PrimaryButton: FC<Props> = ({ size = "large", ...props }) => {
  let icon: ReactNode | null = null;
  let className = `btn-${size} ${props.className || ""}`;
  if (props.icon) {
    icon = <span className="btn-custom-icon-left">{props.icon}</span>;
  }
  if (props.disabled) {
    className = "btn-disabled " + className;
  }

  return (
    <StyledButton
      {...props}
      size={size}
      className={className}
      icon={icon}
      type="primary"
    >
      {props.children}
    </StyledButton>
  );
};

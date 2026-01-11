import type { CSSProperties } from "react";
import theme from "../theme";
import styled from "styled-components";

export type FontTypes =
  | "body-xxl-regular"
  | "body-xl-regular"
  | "body-xl-medium"
  | "body-xl-semibold"
  | "body-xl-bold"
  | "body-large-regular"
  | "body-large-medium"
  | "body-large-semibold"
  | "body-large-bold"
  | "body-medium-regular"
  | "body-medium-medium"
  | "body-medium-semibold"
  | "body-medium-bold"
  | "body-small-light"
  | "body-small-regular"
  | "body-small-medium"
  | "body-small-semibold"
  | "body-small-bold"
  | "body-xs-regular"
  | "body-xs-medium"
  | "body-xs-semibold"
  | "body-xs-bold";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  type: FontTypes;
  children?: string | React.ReactNode;
  id?: string;
  display?: CSSProperties["display"];
  onClick?: () => void;
  cursor?: CSSProperties["cursor"];
  p?: string;
  pt?: string;
  pl?: string;
  pr?: string;
  pb?: string;
};

const getStyleFontType = (type: FontTypes): string => {
  switch (type) {
    case "body-xxl-regular":
      return `
        font-size: 30px;
        font-weight: 700;
        line-height: 38px;
      `;
    case "body-xl-regular":
      return `
        font-size: 20px;
        font-weight: 400;
        line-height: 30px;
      `;
    case "body-xl-medium":
      return `
        font-size: 20px;
        font-weight: 500;
        line-height: 30px;
      `;
    case "body-xl-semibold":
      return `
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
      `;
    case "body-xl-bold":
      return `
        font-size: 20px;
        font-weight: 700;
        line-height: 30px;
      `;
    case "body-large-regular":
      return `
        font-size: 18px;
        font-weight: 400;
        line-height: 28px;
      `;
    case "body-large-medium":
      return `
        font-size: 18px;
        font-weight: 500;
        line-height: 28px;
      `;
    case "body-large-semibold":
      return `
        font-size: 18px;
        font-weight: 600;
        line-height: 28px;
      `;
    case "body-large-bold":
      return `
        font-size: 18px;
        font-weight: 600;
        line-height: 28px;
      `;
    case "body-medium-regular":
      return `
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      `;
    case "body-medium-medium":
      return `
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
      `;
    case "body-medium-semibold":
      return `
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
      `;
    case "body-medium-bold":
      return `
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
      `;
    case "body-small-light":
      return `
          font-size: 14px;
          font-weight: 300;
          line-height: 28px;
        `;
    case "body-small-regular":
      return `
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      `;
    case "body-small-medium":
      return `
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      `;
    case "body-small-semibold":
      return `
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
      `;
    case "body-small-bold":
      return `
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
      `;
    case "body-xs-regular":
      return `
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
      `;
    case "body-xs-medium":
      return `
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
      `;
    case "body-xs-semibold":
      return `
        font-size: 12px;
        font-weight: 600;
        line-height: 18px;
      `;
    case "body-xs-bold":
      return `
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
      `;
    default:
      return "";
  }
};

const Typography = styled.p<Props>`
  margin: 0;
  letter-spacing: -0.02em;
  ${(props) => (props.display ? `display: ${props.display};` : "")}
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  ${(props) => (props.p ? `padding: ${props.p};` : "")}
  ${(props) => (props.pt ? `padding-top: ${props.pt};` : "")}
  ${(props) => (props.pl ? `padding-left: ${props.pl};` : "")}
  ${(props) => (props.pt ? `padding-right: ${props.pr};` : "")}
  ${(props) => (props.pb ? `padding-bottom: ${props.pb};` : "")}
  ${(props) => getStyleFontType(props.type)}
  color: ${(props) => (props.color ? props.color : theme.black)};
`;

export { Typography };

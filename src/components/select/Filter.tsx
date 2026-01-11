import { Select } from "antd";
import styled from "styled-components";
import theme from "../../theme";

export const Filter = styled(Select)`
  min-width: 150px;
  flex-shrink: 0;

  .ant-select-selector {
    background: ${theme.white} !important;
    border: 1px solid ${theme.gray300} !important;
    border-radius: 8px !important;
    height: 40px !important;

    .ant-select-selection-item {
      line-height: 46px !important;
    }

    .ant-select-selection-placeholder {
      line-height: 46px !important;
    }
  }

  .ant-select-arrow {
    color: #666;
  }

  &:hover .ant-select-selector {
    background: ${theme.white} !important;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }

  &.ant-select-focused .ant-select-selector {
    background: ${theme.white} !important;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3) !important;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
`;

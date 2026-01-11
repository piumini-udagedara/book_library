import Select from "antd/lib/select";
import styled from "styled-components";
import theme from "../../theme";

export const SelectInput = styled(Select)`
  box-sizing: border-box;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  line-height: 20px;
  .ant-select-selector {
    border: ${`1px solid ${theme.gray300}`}!important;
    box-sizing: border-box !important;
    border-radius: 8px !important;
    box-shadow: none !important;
  }
  .ant-select-selector:hover {
    border: ${` 1px solid ${theme.blue500}`} !important;
    box-sizing: border-box !important;
    filter: drop-shadow(0px 0px 10px rgba(0, 82, 234, 0.1));
    border-radius: 8px !important;
  }
  .ant-select-selector:focus {
    border: 1px solid ${theme.blue500} !important;
    box-shadow: 0 0 0 2px rgba(90, 90, 90, 0.1) !important;
  }
  .ant-select-arrow {
    color: ${theme.black};
  }
  .ant-select-selection-item-content {
    color: ${theme.blue600};
  }
  .ant-select-selection-item-remove {
    color: ${theme.blue600};
  }
`;

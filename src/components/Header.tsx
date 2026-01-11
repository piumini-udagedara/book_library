import React from "react";
import { Layout, Button, Flex } from "antd";
import styled from "styled-components";
import { Typography } from "./Typography";
import theme from "../theme";
import {
  AppstoreOutlined,
  Booklibrary,
  UnorderedListOutlined,
} from "../assets";

import { SearchInput } from "./input/SearchInput";

const { Header: AntHeader } = Layout;

const StyledHeader = styled(AntHeader)`
  background: ${theme.white};
  padding: 0 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  height: 80px !important;

  @media (max-width: 768px) {
    padding: 16px;
    align-items: stretch;
    gap: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  width: 100%;

  margin: 0 auto;

  @media (max-width: 768px) {
    align-items: stretch;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const ViewToggleButton = styled(Button)`
  height: 40px !important;
  padding: 10px 24px !important;
`;

interface HeaderProps {
  viewMode: "grid" | "list";
  onViewToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewToggle,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <StyledHeader>
      <HeaderContent>
        <Flex align="center">
          <img src={Booklibrary} />
          <Typography type="body-xl-semibold" pl="8px">
            Book Library
          </Typography>
        </Flex>
        <HeaderControls>
          <SearchInput
            width="240px"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            allowClear
          />
          <ViewToggleButton
            onClick={onViewToggle}
            icon={
              viewMode === "grid" ? (
                <img src={UnorderedListOutlined} />
              ) : (
                <img src={AppstoreOutlined} />
              )
            }
          />
        </HeaderControls>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;

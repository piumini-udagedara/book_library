import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { Book } from "../types/book";
import styled from "styled-components";
import theme from "../theme";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { DangerButton } from "./buttons/DangerButton";

interface DeleteConfirmationProps {
  book: Book | null;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 16px;
  }
  .ant-modal-title {
    font-size: 20px;
    font-weight: 600;
  }
  .ant-modal-header {
    padding: 16px;
    margin-bottom: 0px;
    border-bottom: 1px solid ${theme.gray200};
  }
  .ant-modal-content {
    background: ${theme.white};
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px !important;
    border: 1px solid ${theme.gray200};
    padding: 0px !important;
  }
  .ant-modal-footer {
    padding: 16px;
    margin-top: 0px;
    border-top: 1px solid ${theme.gray200};
  }
`;

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  book,
  open,
  onConfirm,
  onCancel,
}) => {
  if (!book) return null;

  return (
    <StyledModal
      title={
        <span style={{ color: theme.red300 }}>
          <ExclamationCircleOutlined /> Delete Book
        </span>
      }
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      cancelText="Cancel"
      width={450}
      footer={[
        <SecondaryButton size="small" key="cancel" onClick={onCancel}>
          Cancel
        </SecondaryButton>,
        <DangerButton key="submit" size="small" onClick={onConfirm}>
          Delete
        </DangerButton>,
      ]}
    >
      <div style={{ padding: "16px 0" }}>
        <p>
          Are you sure you want to delete <strong>"{book.title}"</strong> by{" "}
          <strong>{book.author}</strong>?
        </p>
        <p
          style={{
            color: "#ef4444",
            fontWeight: 500,
            fontSize: "0.912px",
            marginBottom: 0,
          }}
        >
          This action cannot be undone.
        </p>
      </div>
    </StyledModal>
  );
};

export default DeleteConfirmation;

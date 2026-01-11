import React, { useEffect } from "react";
import { Modal, Form, Select } from "antd";
import type { Book, BookFormData } from "../types/book";
import styled from "styled-components";
import { CATEGORIES } from "../constants/categories";
import theme from "../theme";
import { TextInput } from "./input/TextInput";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { FormContainer } from "./FormContainer";
import { SelectInput } from "./select/SelectComp";

const { Option } = Select;

const formCategories = CATEGORIES.filter((cat) => cat !== "All");

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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface BookFormProps {
  book?: Book | null;
  open: boolean;
  onSave: (bookData: BookFormData) => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({
  book,
  open,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();

  // Populate form when editing
  useEffect(() => {
    if (book && open) {
      form.setFieldsValue({
        title: book.title,
        author: book.author,
        rating: book.rating,
        category: book.category,
        cover: book.cover,
      });
    } else if (!book && open) {
      form.resetFields();
    }
  }, [book, open, form]);

  /**
   * Handle form submission
   */
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <StyledModal
      title={book ? "Edit Book" : "Add New Book"}
      open={open}
      onCancel={onCancel}
      footer={[
        <SecondaryButton key="cancel" onClick={onCancel}>
          Cancel
        </SecondaryButton>,
        <PrimaryButton key="submit" onClick={handleSubmit}>
          {book ? "Update Book" : "Add Book"}
        </PrimaryButton>,
      ]}
      width={600}
    >
      <FormContainer
        form={form}
        layout="vertical"
        initialValues={{
          rating: 3,
          category: "Fiction",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Title is required" },
            { max: 200, message: "Title must be less than 200 characters" },
          ]}
        >
          <TextInput placeholder="Enter book title" size="large" />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[
            { required: true, message: "Author is required" },
            {
              max: 100,
              message: "Author name must be less than 100 characters",
            },
          ]}
        >
          <TextInput placeholder="Enter author name" size="large" />
        </Form.Item>

        <FormRow>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <SelectInput size="large" placeholder="Select category">
              {formCategories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </SelectInput>
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[
              { required: true, message: "Rating is required" },
              {
                type: "number",
                min: 1,
                max: 5,
                message: "Rating must be between 1 and 5",
              },
            ]}
          >
            <SelectInput size="large" placeholder="Select rating">
              {[1, 2, 3, 4, 5].map((num) => (
                <Option key={num} value={num}>
                  {num} {num === 1 ? "Star" : "Stars"}
                </Option>
              ))}
            </SelectInput>
          </Form.Item>
        </FormRow>

        <Form.Item
          name="cover"
          label="Cover Image URL"
          rules={[
            {
              type: "url",
              message: "Please enter a valid URL",
            },
          ]}
        >
          <TextInput
            placeholder="https://example.com/book-cover.jpg"
            size="large"
          />
        </Form.Item>
      </FormContainer>
    </StyledModal>
  );
};

export default BookForm;

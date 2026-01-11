import React from "react";
import { Card, Rate, Tag, Space } from "antd";
import styled from "styled-components";
import type { Book } from "../types/book";
import { Typography } from "./Typography";
import theme from "../theme";
import { PrimaryButton } from "./buttons/PrimaryButton";
import EditIcon from "../assets/Icons/edit.svg?react";
import DeleteIcon from "../assets/Icons/delete.svg?react";
import { DangerButton } from "./buttons/DangerButton";

const StyledCard = styled(Card)`
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .ant-card-cover {
    height: 300px;
    overflow: hidden;
    background: ${theme.gray100};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-card-body {
    padding: 20px;
  }

  &.list-view {
    display: flex;
    flex-direction: row;
    max-height: 250px;

    .ant-card-cover {
      width: 150px;
      height: 100%;
      flex-shrink: 0;
      min-height: 250px;
    }

    .ant-card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  @media (max-width: 768px) {
    &.list-view {
      flex-direction: column;
      max-height: none;

      .ant-card-cover {
        width: 100%;
        height: 250px;
        min-height: 250px;
      }
    }
  }
`;

const BookCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BookMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 16px;
  margin-top: auto;
`;

const CategoryTag = styled(Tag)`
  background: ${theme.blue300};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.25rem 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .ant-rate {
    font-size: 16px;
  }
`;

const ActionButtons = styled(Space)`
  margin-top: 16px;
  width: 100%;

  .ant-btn {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    .ant-btn {
      width: 100%;
    }
  }
`;
const ActionGridButtons = styled(Space)`
  margin-top: 16px;
  width: 100%;
  border-top: 1px solid ${theme.gray300};
  padding: 12px 0px 0px;
  display: grid;
  grid-template-columns: 50% 50%;
  .ant-btn {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    .ant-btn {
      width: 100%;
    }
  }
`;

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
  viewMode: "grid" | "list";
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onEdit,
  onDelete,
  viewMode,
}) => {
  const coverImage =
    book.cover || "https://via.placeholder.com/200x300?text=No+Cover";

  return (
    <StyledCard
      className={viewMode === "list" ? "list-view" : ""}
      hoverable
      cover={
        <BookCover
          src={coverImage}
          alt={`Cover of ${book.title}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/200x300?text=No+Cover";
          }}
        />
      }
    >
      <BookInfo>
        <Typography type="body-medium-bold">{book.title}</Typography>
        <Typography type="body-medium-regular">by {book.author}</Typography>
        <BookMeta>
          <CategoryTag>{book.category}</CategoryTag>
          <RatingContainer>
            <Rate disabled defaultValue={book.rating} allowHalf />
            <Typography type="body-small-regular">{book.rating}</Typography>
          </RatingContainer>
        </BookMeta>
        {viewMode === "grid" ? (
          <ActionGridButtons>
            <PrimaryButton
              size="small"
              icon={<EditIcon />}
              onClick={() => onEdit(book)}
              block
            >
              Edit
            </PrimaryButton>

            <DangerButton
              size="small"
              block
              icon={<DeleteIcon />}
              onClick={() => onDelete(book.id)}
            >
              Delete
            </DangerButton>
          </ActionGridButtons>
        ) : (
          <ActionButtons>
            <PrimaryButton
              size="small"
              icon={<EditIcon />}
              onClick={() => onEdit(book)}
            >
              Edit
            </PrimaryButton>
            <DangerButton
              size="small"
              icon={<DeleteIcon />}
              onClick={() => onDelete(book.id)}
            >
              Delete
            </DangerButton>
          </ActionButtons>
        )}
      </BookInfo>
    </StyledCard>
  );
};

export default BookCard;

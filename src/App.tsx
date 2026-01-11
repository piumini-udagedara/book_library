import { useState, useEffect, useCallback } from "react";
import { Layout, Spin, Alert, message, Select } from "antd";
import type { Book, BookFormData, ViewMode } from "./types/book";
import { fetchBooks, createBook, updateBook, deleteBook } from "./services/api";
import Header from "./components/Header";
import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import DeleteConfirmation from "./components/DeleteConfirmation";
import styled from "styled-components";
import { CATEGORIES, type Category } from "./constants/categories";
import theme from "./theme";
import { Typography } from "./components/Typography";
import { PrimaryButton } from "./components/buttons/PrimaryButton";
import { Filter } from "./components/select/Filter";
import PlusIcon from "./assets/Icons/plus-white.svg?react";

const { Content } = Layout;
const { Option } = Select;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${theme.gray100};
`;

const MainContent = styled(Content)`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;

  @media (max-width: 1024px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ContentFilter = styled.div`
  display: flex;

  gap: 24px;
`;

const BooksContainer = styled.div<{ viewMode: "grid" | "list" }>`
  display: grid;
  gap: 24px;

  ${(props) =>
    props.viewMode === "grid"
      ? `
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    @media (max-width: 1024px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  `
      : `
    grid-template-columns: 1fr;
  `}
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  gap: 16px;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  text-align: center;
  gap: 16px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  opacity: 0.5;
`;

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  /**
   * Load books from API on component mount
   */
  useEffect(() => {
    loadBooks();
  }, []);

  /**
   * Filter books based on search query and category
   */
  useEffect(() => {
    let filtered = [...books];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    setFilteredBooks(filtered);
  }, [searchQuery, selectedCategory, books]);

  /**
   * Fetch all books from the API
   */
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load books. Please make sure JSON Server is running on port 3001.";
      setError(errorMessage);
      message.error(errorMessage);
      console.error("Error loading books:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle view mode toggle
   */
  const handleViewToggle = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  /**
   * Handle search input change
   */
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  /**
   * Handle category filter change
   */
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  /**
   * Handle add new book
   */
  const handleAddBook = () => {
    setEditingBook(null);
    setShowAddForm(true);
  };

  /**
   * Handle edit book
   */
  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setShowAddForm(true);
  };

  /**
   * Handle save book (create or update)
   */
  const handleSaveBook = async (bookData: BookFormData) => {
    try {
      setError(null);
      if (editingBook) {
        // Update existing book
        await updateBook(editingBook.id, bookData);
        message.success("Book updated successfully!");
      } else {
        // Create new book
        await createBook(bookData);
        message.success("Book added successfully!");
      }
      setShowAddForm(false);
      setEditingBook(null);
      await loadBooks(); // Reload books to get updated data
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to save book. Please try again.";
      setError(errorMessage);
      message.error(errorMessage);
      console.error("Error saving book:", err);
    }
  };

  /**
   * Handle delete book confirmation
   */
  const handleDeleteClick = (bookId: number) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setBookToDelete(book);
      setDeleteModalOpen(true);
    }
  };

  /**
   * Handle confirmed delete
   */
  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;

    try {
      setError(null);
      await deleteBook(bookToDelete.id);
      message.success("Book deleted successfully!");
      setBookToDelete(null);
      setDeleteModalOpen(false);
      await loadBooks(); // Reload books after deletion
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to delete book. Please try again.";
      setError(errorMessage);
      message.error(errorMessage);
      console.error("Error deleting book:", err);
    }
  };

  /**
   * Handle cancel operations
   */
  const handleCancel = useCallback(() => {
    setShowAddForm(false);
    setEditingBook(null);
    setBookToDelete(null);
    setDeleteModalOpen(false);
  }, []);

  return (
    <>
      <StyledLayout>
        <Header
          viewMode={viewMode}
          onViewToggle={handleViewToggle}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        <MainContent>
          <ContentHeader>
            <Typography type="body-xl-semibold">
              {searchQuery || selectedCategory !== "All"
                ? `Found ${filteredBooks.length} book${filteredBooks.length !== 1 ? "s" : ""}`
                : `My Library (${books.length} book${books.length !== 1 ? "s" : ""})`}
            </Typography>
            <ContentFilter>
              <Filter
                placeholder="Filter by category"
                value={selectedCategory}
                onChange={(value) => handleCategoryChange(value as Category)}
                size="large"
              >
                {CATEGORIES.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Filter>
              <PrimaryButton icon={<PlusIcon />} onClick={handleAddBook}>
                Add New Book
              </PrimaryButton>
            </ContentFilter>
          </ContentHeader>

          {/* Error Display */}
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
              style={{ marginBottom: "24px" }}
            />
          )}

          {/* Loading State */}
          {loading ? (
            <LoadingContainer>
              <Spin size="large" />
              <Typography type="body-medium-regular">
                Loading books...
              </Typography>
            </LoadingContainer>
          ) : filteredBooks.length === 0 ? (
            <EmptyStateContainer>
              <EmptyIcon>📚</EmptyIcon>
              <Typography type="body-xl-semibold">
                {searchQuery ? "No books found" : "Your library is empty"}
              </Typography>
              <Typography type="body-medium-regular">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Add your first book to get started"}
              </Typography>
              {!searchQuery && (
                <PrimaryButton icon={<PlusIcon />} onClick={handleAddBook}>
                  Add New Book
                </PrimaryButton>
              )}
            </EmptyStateContainer>
          ) : (
            <BooksContainer viewMode={viewMode}>
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onEdit={handleEditBook}
                  onDelete={handleDeleteClick}
                  viewMode={viewMode}
                />
              ))}
            </BooksContainer>
          )}
        </MainContent>
      </StyledLayout>

      {/* Book Form Modal */}
      <BookForm
        book={editingBook}
        open={showAddForm}
        onSave={handleSaveBook}
        onCancel={handleCancel}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        book={bookToDelete}
        open={deleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
      />
    </>
  );
}

export default App;

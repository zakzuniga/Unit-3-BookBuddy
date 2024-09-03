import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for API calls
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
  const data = await response.json();
  return data;
});

// Other async thunks and slice setup...

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    booksList: [],
    selectedBook: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.booksList = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedBook } = booksSlice.actions;

export default booksSlice.reducer;

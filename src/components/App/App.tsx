import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import EmptyState from '../EmptyState/EmptyState';
import css from './App.module.css';

const PER_PAGE = 12;
const SEARCH_DEBOUNCE_DELAY = 300;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () =>
      fetchNotes({ page: currentPage, perPage: PER_PAGE, search: searchQuery }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  if (totalPages > 0 && currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, SEARCH_DEBOUNCE_DELAY);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    updateSearchQuery(value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchValue} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button type="button" className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && notes.length === 0 && (
        <EmptyState
          message={
            searchQuery
              ? `No notes found for "${searchQuery}".`
              : 'You have no notes yet. Create your first one!'
          }
        />
      )}
      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}

      <Toaster position="top-right" />
    </div>
  );
}

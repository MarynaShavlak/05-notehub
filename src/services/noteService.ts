import axios from 'axios';
import type { NewNote, Note } from '../types/note';

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search: search?.trim() || undefined,
    },
  });

  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await notehubApi.post<Note>('/notes', newNote);

  return response.data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const response = await notehubApi.delete<Note>(`/notes/${noteId}`);

  return response.data;
};

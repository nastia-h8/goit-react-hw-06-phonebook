import { nanoid } from 'nanoid';
import { createSlice } from '@reduxjs/toolkit';
import { CONTACTS_LS_KEY } from 'constants/localeStorage';

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem(CONTACTS_LS_KEY);
  return (
    JSON.parse(savedContacts) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
};

const contactsInitialState = getInitialContacts();

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(newContact) {
        return {
          payload: {
            id: nanoid(),
            name: newContact.name,
            number: newContact.number,
          },
        };
      },
    },
    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

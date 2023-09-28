import { nanoid } from 'nanoid';

export const addContact = newContact => {
  return {
    type: 'contacts/addContact',
    payload: {
      id: nanoid(),
      name: newContact.name,
      number: newContact.number,
    },
  };
};

export const deleteContact = contactId => {
  return {
    type: 'contacts/deleteContact',
    payload: contactId,
  };
};

export const changeNameFilter = name => {
  return {
    type: 'filter/changeNameFilter',
    payload: name,
  };
};

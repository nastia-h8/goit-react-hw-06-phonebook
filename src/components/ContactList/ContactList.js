import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/actions';
import { getContacts, getFilter } from 'redux/selectors';

import { Message } from 'components/Message/Message';
import { CONTACTS_LS_KEY } from 'constants/localeStorage';

import { AiOutlineDelete } from 'react-icons/ai';
import { List, Item, Name, Button, NumberWrapper } from './ContactList.styled';

export function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem(CONTACTS_LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [contacts, filter]);

  return (
    <List>
      {visibleContacts.length > 0 ? (
        visibleContacts.map(({ id, name, number }) => (
          <Item key={id}>
            <Name>{name}</Name>
            <NumberWrapper>
              <span>Number: </span>
              {number}
            </NumberWrapper>
            <Button
              type="button"
              onClick={() => {
                dispatch(deleteContact(id));
              }}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </Item>
        ))
      ) : (
        <Message>No contacts found</Message>
      )}
    </List>
  );
}

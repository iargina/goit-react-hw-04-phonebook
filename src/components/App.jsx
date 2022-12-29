import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const deleteClient = id => {
    const newClients = contacts.filter(el => el.id !== id);
    return setContacts(newClients);
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const pushToContact = client => {
    const result = contacts.find(
      el => el.name.toLowerCase() === client.name.toLowerCase()
    );
    if (result) {
      alert(`${client.name} is already in your contact list`);
      return;
    }
    const newClient = { id: nanoid(), ...client };
    setContacts([newClient, ...contacts]);
  };

  const filterContact = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const renderOnChange = ev => {
    return setFilter(ev.currentTarget.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        color: '#010101',
      }}
    >
      <h2 className="formTitle">PhoneBook</h2>
      <ContactForm pushToContact={pushToContact} />
      <h2 className="contactListTitle">Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter renderOnChange={renderOnChange} stateFilter={filter} />
          <ContactList
            stateFilter={filter}
            deleteClient={deleteClient}
            contacts={filterContact()}
          />
        </>
      ) : (
        <p>Your have no contacts in your phone book</p>
      )}
    </div>
  );
};

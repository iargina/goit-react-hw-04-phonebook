import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  deleteClient = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };
  componentDidMount = () => {
    const data = localStorage.getItem('contacts');
    if (!data) {
      return;
    }
    this.setState({ contacts: JSON.parse(data) });
  };
  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };
  pushToContact = client => {
    const result = this.state.contacts.find(
      el => el.name.toLowerCase() === client.name.toLowerCase()
    );
    if (result) {
      alert(`${client.name} is already in your contact list`);
      return;
    }
    this.setState(prevState => {
      const newClient = { id: nanoid(), ...client };
      return {
        contacts: [newClient, ...prevState.contacts],
      };
    });
  };
  filterContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  renderOnChange = ev => {
    const stateOption = ev.currentTarget.name;
    this.setState({ [stateOption]: ev.currentTarget.value });
    return;
  };
  render() {
    const filteredContact = this.filterContact();
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
        <ContactForm pushToContact={this.pushToContact.bind(this)} />
        <h2 className="contactListTitle">Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter
              renderOnChange={this.renderOnChange.bind(this)}
              stateFilter={this.state.filter}
            />
            <ContactList
              stateFilter={this.state.filter}
              deleteClient={this.deleteClient.bind(this)}
              contacts={filteredContact}
            />
          </>
        ) : (
          <p>Your have no contacts in your phone book</p>
        )}
      </div>
    );
  }
}

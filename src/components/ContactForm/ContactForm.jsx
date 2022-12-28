import React, { Component } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  state = { name: '', number: '' };
  renderOnChange(ev) {
    const stateOption = ev.currentTarget.name;
    this.setState({ [stateOption]: ev.currentTarget.value });
    return;
  }
  onSubmit(event) {
    event.preventDefault();
    const client = {
      name: this.state.name,
      number: this.state.number,
    };
    this.props.pushToContact(client);
    this.setState({ name: '', number: '' });
    return;
  }

  render() {
    return (
      <form className={css.contactForm} onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="" className={css.formLabel}>
          Name
          <input
            type="text"
            name="name"
            className={css.input}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            value={this.state.name}
            onChange={this.renderOnChange.bind(this)}
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label htmlFor="" className={css.formLabel}>
          Phone number
          <input
            type="tel"
            name="number"
            className={css.input}
            value={this.state.number}
            onChange={this.renderOnChange.bind(this)}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={css.submit}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  pushToContact: PropTypes.func.isRequired,
};

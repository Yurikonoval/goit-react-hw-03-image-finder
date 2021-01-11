import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import './Searchbar.css';

export default class Seachbar extends Component {
  static propTypes = { onSubmit: PropTypes.func };

  state = {
    findValue: '',
  };

  handleInputChange = event => {
    this.setState({ findValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.findValue.trim() === '') {
      toast.error('Type something to find');
      return;
    }

    this.props.onSubmit(this.state.findValue);
    this.setState({ findValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.findValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

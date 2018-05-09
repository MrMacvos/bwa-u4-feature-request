import React, { Component } from 'react';
import './SearchBar.css';
import Spotify from '../../util/Spotify';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ''
		};
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleTermChange(event) {
		this.setState({term: event.target.value});
	}

	handleKeyPress(event) {
		let key = (event.which || event.keyCode || event.key);
		if(key === 13) this.search();
	}


	search() {
		Spotify.search(this.state.term, this.props.onSearch);
	}

	render() {
		return (
			<div className="SearchBar">
				<input onKeyPress={this.handleKeyPress} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
				<a onClick={this.search}>SEARCH</a>
			</div>
		);
	}
}

export default SearchBar;

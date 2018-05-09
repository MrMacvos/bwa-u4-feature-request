import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

/*
	https://jammming-mrmacvos.surge.sh

	Don't forget to set the redirURI in Spotify.js before uploading.
*/

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlistName: 'New Playlist',
			playlistTracks: [
				{name:'Marc', artist:'Hans', album:'Eibert', id:123}
				, {name:'Loes', artist:'Vos', album:'Dogterom', id:234}
				, {name:'Daan', artist:'En', album:'Bob', id:345}
			],
			searchResults: [
				{name:'Wafwaf', artist:'Taiga', album:'Ik blaf', id:1123}
				, {name:'Prrrprrr', artist:'Azrael', album:'Ik ben de baas', id:1234}
				, {name:'Miaaauw', artist:'Zsazsa', album:'Miauw', id:1345}
			]
		};
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.updateSearchResults = this.updateSearchResults.bind(this);
		this.resetPlaylist = this.resetPlaylist.bind(this);
	}

	updatePlaylistName(name) {
		this.setState({playlistName: name});
	}

	addTrack(track) {
		if(! this.state.playlistTracks.some(ptrack => track.id === ptrack.id)) {
			let x = this.state.playlistTracks; x.push(track);
			this.setState({playlistTracks: x});
		}
	}

	removeTrack(track) {
		if(this.state.playlistTracks.some(ptrack => track.id === ptrack.id)) {
			let x = this.state.playlistTracks.filter(ftrack => track.id !== ftrack.id);
			this.setState({playlistTracks: x});
		}
	}

	updateSearchResults(tracks) {
		this.setState({searchResults: tracks});
	}

	resetPlaylist() {
		this.setState({
			playlistName: 'New Playlist'
			, playlistTracks: []
		});
	}

	savePlaylist() {
		let trackURIs = this.state.playlistTracks.map(ptrack => ptrack.uri);
		let trackListName = this.state.playlistName;
		Spotify.savePlaylist(trackListName, trackURIs, this.resetPlaylist);
	}

	render() {
		return (
			<div>
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					{/* Add a SearchBar component */}
					<SearchBar onSearch={this.updateSearchResults} />
					<div className="App-playlist">
						{/* Add a SearchResults component */}
						<SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
						{/* Add a Playlist component */}
						<Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;

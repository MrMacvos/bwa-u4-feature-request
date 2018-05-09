import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
	constructor(props) {
		super(props);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
	}

	renderAction() {
		return (this.props.isRemoval ? <a className="Track-action" onClick={this.removeTrack}>-</a> : <a className="Track-action" onClick={this.addTrack}>+</a>);
	}

	addTrack() {
		this.props.onAdd(this.props.track);
	}

	removeTrack() {
		this.props.onRemove(this.props.track);
	}

	render() {
		return (
			<div className="TrackContent"><br />
			{(this.props.track.cover ? <div className="Track"><img src={this.props.track.cover} alt="Cover" /><video controls="true" autoPlay="" name="media"><source src={this.props.track.preview} type="audio/mpeg" /></video></div> : '' )}
			<div className="Track">
				<div className="Track-information">
					<h3>{this.props.track.name}</h3>
					<p>{this.props.track.artist} | {this.props.track.album}</p>
				</div>
				{this.renderAction()}
			</div>
			</div>
		);
	}
}

export default Track;

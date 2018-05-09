/*
Client ID 063c8609bee64690b2e960b955d7c899
Client Secret e6d39fdb2c83431296064f49da95d95f 

After authorization:
http://localhost:3000/#access_token=BQB33HS6-nDwGijkHKB5IRYhjejMg_eOFPeis7VPGyEQuulcux6-6KiOMwTc2wLerf2F2ZoPu8M0HpR0MHQctgT7rrL_IxSzM4Wyh2FJVqKm3iTj7AeJE82Ujrv1AYZPPcUiAKH_e6gX3EIdB1_st6sDk3FZYrs&token_type=Bearer&expires_in=3600

JSON : {
	"tracks": [
		{
			"album": {
				"album_type": "album",
				"artists": [
					{
						"external_urls": {
							"spotify": "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
						},
						"href": "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
						"id": "12Chz98pHFMPJEknJQMWvI",
						"name": "Muse",
						"type": "artist",
						"uri": "spotify:artist:12Chz98pHFMPJEknJQMWvI"
					}
				],
				"external_urls": {
					"spotify": "https://open.spotify.com/album/0lw68yx3MhKflWFqCsGkIs"
				},
				"href": "https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIs",
				"id": "0lw68yx3MhKflWFqCsGkIs",
				"images": [
					{
						"height": 640,
						"url": "https://i.scdn.co/image/9e5288926fadb82f873ccf2b45300c3a6f65fa14",
						"width": 640
					},
					{
						"height": 300,
						"url": "https://i.scdn.co/image/f1cad0d6974d6236abd07a59106e8450d85cae24",
						"width": 300
					},
					{
						"height": 64,
						"url": "https://i.scdn.co/image/81a3f82578dc938c53efdcb405f6a3d3ebbf009f",
						"width": 64
					}
				],
-->				"name": "Black Holes And Revelations",
				"release_date": "2006-06-19",
				"release_date_precision": "day",
				"type": "album",
				"uri": "spotify:album:0lw68yx3MhKflWFqCsGkIs"
			},
			"artists": [
				{
					"external_urls": {
						"spotify": "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
					},
					"href": "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
					"id": "12Chz98pHFMPJEknJQMWvI",
-->					"name": "Muse",
					"type": "artist",
					"uri": "spotify:artist:12Chz98pHFMPJEknJQMWvI"
				}
			],
			"disc_number": 1,
			"duration_ms": 366213,
			"explicit": false,
			"external_ids": {
				"isrc": "GBAHT0500600"
			},
			"external_urls": {
				"spotify": "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P"
			},
			"href": "https://api.spotify.com/v1/tracks/7ouMYWpwJ422jRcDASZB7P",
-->			"id": "7ouMYWpwJ422jRcDASZB7P",
			"is_local": false,
			"is_playable": true,
-->			"name": "Knights Of Cydonia",
			"popularity": 68,
			"preview_url": "https://p.scdn.co/mp3-preview/d7624ec5f93b6d92c1836a95c40ecce463584f6e?cid=774b29d4f13844c495f206cafdad9c86",
			"track_number": 11,
			"type": "track",
-->			"uri": "spotify:track:7ouMYWpwJ422jRcDASZB7P"
		}
	]
};

 */
let apiKey = '';
const clientID = '063c8609bee64690b2e960b955d7c899';
const redirURI = 'https://jammming-mrmacvos.surge.sh/';
/* const redirURI = 'http://localhost:3000/'; */

const Spotify = {
	search(term, callbackf) {
		return fetch(
			`https://api.spotify.com/v1/search?type=track&q=${term}`
			, {
				headers:{Authorization:`Bearer ${apiKey}`}
			})
			.then(response => response.json())
			.then(jsonResponse => {
				if(jsonResponse.tracks) {
					let retval = jsonResponse.tracks.items.map(function(track) {
						return {
							name: track.name
							, artist: track.artists[0].name
							, album: track.album.name
							, id: track.id
							, uri: track.uri
							, preview: track.preview_url
							, cover: track.album.images[1].url
						};
					});
					callbackf(retval);
				}
				else {
					return [];
				}
			});
	},

	savePlaylist(playlist, trackURIs, callbackf) {
		if(playlist !== '' && trackURIs.lentgh !== 0) {
			fetch(
				'https://api.spotify.com/v1/me'
				, {
					headers:{Authorization:`Bearer ${apiKey}`}
				})
				.then(response => response.json())
				.then(jsonResponse => {
/*	alert(JSON.stringify(jsonResponse));  */

					let userID = jsonResponse.id;
					fetch(`https://api.spotify.com/v1/users/${userID}/playlists`
						, {
							headers:{Authorization:`Bearer ${apiKey}`}
							, method: 'post'
							, body: JSON.stringify({"name":playlist, "public":"false"})
						})
						.then(response => response.json())
						.then(jsonResponse => {
/*	alert(JSON.stringify(jsonResponse)); */
							let playlistID = jsonResponse.id;
							fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`
								, {
									headers:{Authorization:`Bearer ${apiKey}`}
									, method: 'post'
									, body: JSON.stringify({"uris":trackURIs})
								})
								.then(response => response.json())
								.then(jsonResponse => {
/*	alert(JSON.stringify(jsonResponse)); */
									if(jsonResponse.error) {
										alert(jsonResponse.error.status);
									}
									else {
										callbackf();
									}
								});
						});
				});
		}
	},

	getAccessToken() {
		if(apiKey === '') {
			const url = window.location.href;
			apiKey = url.match(/access_token=([^&]*)/);
			if(apiKey === '' || apiKey === 'undefined' || apiKey === null) {
				window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public playlist-read-private user-library-modify user-library-read playlist-modify-private&redirect_uri=${redirURI}`;
			}
			else {
				apiKey = apiKey[1];
				const expiresIn = url.match(/expires_in=([^&]*)/)[1];
				window.setTimeout(() => apiKey = '', expiresIn * 1000);
				window.history.pushState(apiKey, null, '/');
			}
		}
		return apiKey;
	}
};
apiKey = Spotify.getAccessToken();

export default Spotify;


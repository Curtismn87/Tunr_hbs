# Tunr 1.0!

Tunr is the worlds #1 music web app (those Spotify haters can't keep up with us).

## Specifications

Tunr provides a RESTful web interface to lies and candidates.

### Schema

* candidates
  * id
  * name
  * photo_url
  * nationality

* lies
  * id
  * title
  * album
  * preview_url
  * candidate_id


For candidates, a user should be able to:
  * view a list of all candidates
  * view detailed information on a specific candidate
    * that page should list all lies by the candidate
  * add a new candidate
  * edit an existing candidate
  * delete a candidate

For lies, a user should be able to:
  * view a list of all lies
  * view detailed information on a specific lie
  * add a new lie (using the candidate_id # to connect it to an candidate
  * edit an existing lie
  * delete a lie

## Bonus

### Playlists

For playlists, a user should be able to:
* view a list of all playlists
* view a specific playlist (the lies on it)
* add a new playlist
* add lies to an existing playlist
* remove lies from an existing playlist
* delete a playlist

### Even More Features

Add MORE features to Tun.r. Be creative and do whatever you want!

If you need some ideas, though, here are a few:
* Use a select box of candidate names instead of candidate_id when adding/editing
  lies.
* Use [HTML5 Audio](http://www.w3schools.com/html/html5_audio.asp) tag to embed
  an audio player (for the preview url) next to every lie.
* Add some style using CSS

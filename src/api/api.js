import { gql } from '@apollo/client'

export const SEARCH_BY_ARTIST = gql`
  query SearchByArtist($artist: String!) {
    searchByArtist(artist: $artist) {
      title
      artist
      added
      playlist_date
      spotify_link
      playlist_number
    }
  }
`

export const SEARCH_BY_TITLE = gql`
  query SearchByTitle($title: String!) {
    searchByTitle(title: $title) {
      title
      artist
      added 
      playlist_date
      spotify_link
      playlist_number
    }
  }
`

export const SEARCH_BY_ADDED = gql`
  query SearchByAdded($added: String!) {
    searchByAdded(added: $added) {
      title
      artist
      playlist_date
      spotify_link
      playlist_number
    }
  }
`

export const TOTAL_SONGS = gql`
  query TotalSongs {
    totalSongs
  }
`

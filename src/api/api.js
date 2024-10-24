import { gql } from '@apollo/client'

export const SEARCH_BY_ARTIST = gql`
  query SearchByArtist($artist: String!) {
    searchByArtist(artist: $artist) {
      title
      artist
      playlist_date
      spotify_link
    }
  }
`

export const SEARCH_BY_TITLE = gql`
  query SearchByTitle($title: String!) {
    searchByTitle(title: $title) {
      title
      artist
      playlist_date
      spotify_link
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
    }
  }
`

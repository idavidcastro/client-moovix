import { gql } from "@apollo/client";

export const GET_POPULAR_MOVIES = gql`
  query GetPopularMovies {
    popularMovies {
      id
      title
      overview
      release_date
      poster_path
      vote_average
    }
  }
`;

export const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      title
      overview
      release_date
      poster_path
      vote_average
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($id: ID!) {
    movieById(id: $id) {
      id
      title
      overview
      release_date
      poster_path
      vote_average
    }
  }
`;
export const GET_TOP_RATED_MOVIES = gql`
  query GetTopRatedMovies {
    topRatedMovies {
      id
      title
      overview
      release_date
      poster_path
      vote_average
    }
  }
`;

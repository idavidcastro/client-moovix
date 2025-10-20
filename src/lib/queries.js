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
      backdrop_path
      adult
      genre_ids
      original_language
      popularity
      vote_count
      original_title
    }
  }
`;

export const GET_NOW_PLAYING_MOVIES = gql`
  query GetNowPlayingMovies {
    nowPlayingMovies {
      id
      title
      overview
      release_date
      poster_path
      vote_average
      backdrop_path
      adult
      genre_ids
      original_language
      popularity
      vote_count
      original_title
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
      backdrop_path
      adult
      genre_ids
      original_language
      popularity
      vote_count
      original_title
    }
  }
`;

export const GET_MOVIE_VIDEOS = gql`
  query GetMovieVideos($movieId: ID!) {
    getMovieVideos(movieId: $movieId) {
      key
      site
      type
      name
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
      backdrop_path
    }
  }
`;

export const GET_UPCOMING_MOVIES = gql`
  query GetUpcomingMovies {
    upcomingMovies {
      id
      title
      overview
      release_date
      poster_path
      vote_average
      backdrop_path
      adult
      genre_ids
      original_language
      popularity
      vote_count
      original_title
    }
  }
`;

export const GET_MOVIE_GENRES = gql`
  query GetMovieGenres {
    movieGenres {
      id
      name
    }
  }
`;
export const GET_MOVIE_CREDITS = gql`
  query GetMovieCredits($id: ID!) {
    movieCredits(id: $id) {
      cast {
        id
        name
        character
        profile_path
      }
      crew {
        id
        name
        job
        department
      }
    }
  }
`;

export const GET_MOVIE_DETAILS = gql`
  query GetMovieDetails($id: ID!) {
    movieDetails(id: $id) {
      id
      title
      overview
      release_date
      runtime
      status
      tagline
      budget
      revenue
      poster_path
      backdrop_path
      vote_average
      genres {
        id
        name
      }
      production_companies {
        id
        name
        origin_country
        logo_path
      }
      production_countries {
        iso_3166_1
        name
      }
      spoken_languages {
        iso_639_1
        name
      }
    }
  }
`;

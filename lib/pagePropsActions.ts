"use server";

import { allRequests, movieRequests, tvRequests } from "./requests";
import { Movie } from "./typings";

export const getHomePageProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(allRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(allRequests.fetchTrending).then((res) => res.json()),
    fetch(allRequests.fetchTopRated).then((res) => res.json()),
    fetch(allRequests.fetchActionMovies).then((res) => res.json()),
    fetch(allRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(allRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(allRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(allRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  netflixOriginals.results?.forEach((content: Movie) => (content.type = "tv"));
  trendingNow.results?.forEach(
    (content: Movie) => (content.type = content.media_type)
  );
  topRated.results?.forEach((content: Movie) => (content.type = "movie"));
  actionMovies.results?.forEach((content: Movie) => (content.type = "movie"));
  comedyMovies.results?.forEach((content: Movie) => (content.type = "tv"));
  horrorMovies.results?.forEach((content: Movie) => (content.type = "movie"));
  romanceMovies.results?.forEach((content: Movie) => (content.type = "tv"));
  documentaries.results?.forEach((content: Movie) => (content.type = "tv"));

  return {
    netflixOriginals: netflixOriginals.results,
    trendingNow: trendingNow.results,
    topRated: topRated.results,
    actionMovies: actionMovies.results,
    comedyMovies: comedyMovies.results,
    horrorMovies: horrorMovies.results,
    romanceMovies: romanceMovies.results,
    documentaries: documentaries.results,
  };
};

export const getMoviePageProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(movieRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(movieRequests.fetchTrending).then((res) => res.json()),
    fetch(movieRequests.fetchTopRated).then((res) => res.json()),
    fetch(movieRequests.fetchActionMovies).then((res) => res.json()),
    fetch(movieRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(movieRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(movieRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(movieRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  netflixOriginals.results.forEach(
    (content: Movie) => (content.type = "movie")
  );
  trendingNow.results.forEach((content: Movie) => (content.type = "movie"));
  topRated.results.forEach((content: Movie) => (content.type = "movie"));
  actionMovies.results.forEach((content: Movie) => (content.type = "movie"));
  comedyMovies.results.forEach((content: Movie) => (content.type = "movie"));
  horrorMovies.results.forEach((content: Movie) => (content.type = "movie"));
  romanceMovies.results.forEach((content: Movie) => (content.type = "movie"));
  documentaries.results.forEach((content: Movie) => (content.type = "movie"));

  return {
    netflixOriginals: netflixOriginals.results,
    trendingNow: trendingNow.results,
    topRated: topRated.results,
    actionMovies: actionMovies.results,
    comedyMovies: comedyMovies.results,
    horrorMovies: horrorMovies.results,
    romanceMovies: romanceMovies.results,
    documentaries: documentaries.results,
  };
};

export const getTvShowsPageProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    sciFiShows,
    comedyShows,
    mysteryShows,
    romanceShows,
    documentaries,
  ] = await Promise.all([
    fetch(tvRequests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(tvRequests.fetchTrending).then((res) => res.json()),
    fetch(tvRequests.fetchTopRated).then((res) => res.json()),
    fetch(tvRequests.fetchSciFiShows).then((res) => res.json()),
    fetch(tvRequests.fetchComedyShows).then((res) => res.json()),
    fetch(tvRequests.fetchMysteryShows).then((res) => res.json()),
    fetch(tvRequests.fetchRomanceShows).then((res) => res.json()),
    fetch(tvRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  netflixOriginals.results.forEach((content: Movie) => (content.type = "tv"));
  trendingNow.results.forEach((content: Movie) => (content.type = "tv"));
  topRated.results.forEach((content: Movie) => (content.type = "tv"));
  sciFiShows.results.forEach((content: Movie) => (content.type = "tv"));
  comedyShows.results.forEach((content: Movie) => (content.type = "tv"));
  mysteryShows.results.forEach((content: Movie) => (content.type = "tv"));
  romanceShows.results.forEach((content: Movie) => (content.type = "tv"));
  documentaries.results.forEach((content: Movie) => (content.type = "tv"));

  return {
    netflixOriginals: netflixOriginals.results,
    trendingNow: trendingNow.results,
    topRated: topRated.results,
    sciFiShows: sciFiShows.results,
    comedyShows: comedyShows.results,
    mysteryShows: mysteryShows.results,
    romanceShows: romanceShows.results,
    documentaries: documentaries.results,
  };
};

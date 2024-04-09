"use server";

import { Media } from "../types/typings";
import { allRequests, movieRequests, tvRequests } from "./requests";

export const getHomePageProps = async () => {
  const [
    discoverMedias,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(allRequests.fetchDiscoverMedias).then((res) => res.json()),
    fetch(allRequests.fetchTrending).then((res) => res.json()),
    fetch(allRequests.fetchTopRated).then((res) => res.json()),
    fetch(allRequests.fetchActionMovies).then((res) => res.json()),
    fetch(allRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(allRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(allRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(allRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  discoverMedias.results?.forEach((content: Media) => (content.type = "tv"));
  trendingNow.results?.forEach(
    (content: Media) =>
      (content.type = content.media_type
        ? content.media_type
        : content.name || content.original_name
        ? "tv"
        : "movie")
  );
  topRated.results?.forEach((content: Media) => (content.type = "movie"));
  actionMovies.results?.forEach((content: Media) => (content.type = "movie"));
  comedyMovies.results?.forEach((content: Media) => (content.type = "tv"));
  horrorMovies.results?.forEach((content: Media) => (content.type = "movie"));
  romanceMovies.results?.forEach((content: Media) => (content.type = "tv"));
  documentaries.results?.forEach((content: Media) => (content.type = "tv"));

  return {
    discoverMedias: discoverMedias.results,
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
    discoverMedias,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(movieRequests.fetchDiscoverMedias).then((res) => res.json()),
    fetch(movieRequests.fetchTrending).then((res) => res.json()),
    fetch(movieRequests.fetchTopRated).then((res) => res.json()),
    fetch(movieRequests.fetchActionMovies).then((res) => res.json()),
    fetch(movieRequests.fetchComedyMovies).then((res) => res.json()),
    fetch(movieRequests.fetchHorrorMovies).then((res) => res.json()),
    fetch(movieRequests.fetchRomanceMovies).then((res) => res.json()),
    fetch(movieRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  discoverMedias.results.forEach((content: Media) => (content.type = "movie"));
  trendingNow.results.forEach((content: Media) => (content.type = "movie"));
  topRated.results.forEach((content: Media) => (content.type = "movie"));
  actionMovies.results.forEach((content: Media) => (content.type = "movie"));
  comedyMovies.results.forEach((content: Media) => (content.type = "movie"));
  horrorMovies.results.forEach((content: Media) => (content.type = "movie"));
  romanceMovies.results.forEach((content: Media) => (content.type = "movie"));
  documentaries.results.forEach((content: Media) => (content.type = "movie"));

  return {
    discoverMedias: discoverMedias.results,
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
    discoverMedias,
    trendingNow,
    topRated,
    sciFiShows,
    comedyShows,
    mysteryShows,
    romanceShows,
    documentaries,
  ] = await Promise.all([
    fetch(tvRequests.fetchDiscoverMedias).then((res) => res.json()),
    fetch(tvRequests.fetchTrending).then((res) => res.json()),
    fetch(tvRequests.fetchTopRated).then((res) => res.json()),
    fetch(tvRequests.fetchSciFiShows).then((res) => res.json()),
    fetch(tvRequests.fetchComedyShows).then((res) => res.json()),
    fetch(tvRequests.fetchMysteryShows).then((res) => res.json()),
    fetch(tvRequests.fetchRomanceShows).then((res) => res.json()),
    fetch(tvRequests.fetchDocumentaries).then((res) => res.json()),
  ]);

  discoverMedias.results.forEach((content: Media) => (content.type = "tv"));
  trendingNow.results.forEach((content: Media) => (content.type = "tv"));
  topRated.results.forEach((content: Media) => (content.type = "tv"));
  sciFiShows.results.forEach((content: Media) => (content.type = "tv"));
  comedyShows.results.forEach((content: Media) => (content.type = "tv"));
  mysteryShows.results.forEach((content: Media) => (content.type = "tv"));
  romanceShows.results.forEach((content: Media) => (content.type = "tv"));
  documentaries.results.forEach((content: Media) => (content.type = "tv"));

  return {
    discoverMedias: discoverMedias.results,
    trendingNow: trendingNow.results,
    topRated: topRated.results,
    sciFiShows: sciFiShows.results,
    comedyShows: comedyShows.results,
    mysteryShows: mysteryShows.results,
    romanceShows: romanceShows.results,
    documentaries: documentaries.results,
  };
};

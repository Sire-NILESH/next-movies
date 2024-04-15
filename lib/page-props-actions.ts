"use server";

import { Media } from "../types/typings";
import { allRequests, movieRequests, tvRequests } from "./requests";

/**
 * Helper function to fetch filtered requests from a request object.
 * Also sets the 'type' property for each Media to its respective MediaType.
 *
 * @param requestObj Request object with ids and URLs strings.
 * @param filteredFields ids to be fetched from `requestObj`
 * @returns
 */
const getResults = async function <T extends Record<string, string>>(
  requestObj: T,
  filteredFields: (keyof T)[]
) {
  if (filteredFields.length === 0) return [];

  const fetchFilteredFields = await Promise.all(
    filteredFields.map((field) =>
      fetch(requestObj[field] as string, {
        next: { revalidate: 86400 }, //this will revalidate the data after every 24 hrs.
      }).then((res) => res.json())
    )
  );

  // Important: manully adding a mediatype on 'type' field for each media
  fetchFilteredFields?.forEach((field) =>
    field?.results?.forEach(
      (content: Media) =>
        (content.type = content.media_type
          ? content.media_type
          : content.name || content.original_name
          ? "tv"
          : "movie")
    )
  );

  return fetchFilteredFields;
};

export const getHomePageProps = async () => {
  const data = await getResults(allRequests, [
    "fetchDiscoverMedias",
    "fetchTrending",
    "fetchTopRated",
    "fetchActionMovies",
    "fetchComedyMovies",
    "fetchHorrorMovies",
    "fetchRomanceMovies",
    "fetchDocumentaries",
  ]);

  // maintain the order
  return {
    discoverMedias: data[0]?.results,
    trendingNow: data[1]?.results,
    topRated: data[2]?.results,
    actionMovies: data[3]?.results,
    comedyMovies: data[4]?.results,
    horrorMovies: data[5]?.results,
    romanceMovies: data[6]?.results,
    documentaries: data[7]?.results,
  };
};

export const getMoviePageProps = async () => {
  const data = await getResults(movieRequests, [
    "fetchDiscoverMedias",
    "fetchTrending",
    "fetchTopRated",
    "fetchActionMovies",
    "fetchComedyMovies",
    "fetchHorrorMovies",
    "fetchRomanceMovies",
    "fetchDocumentaries",
  ]);

  // maintain the order
  return {
    discoverMedias: data[0]?.results,
    trendingNow: data[1]?.results,
    topRated: data[2]?.results,
    actionMovies: data[3]?.results,
    comedyMovies: data[4]?.results,
    horrorMovies: data[5]?.results,
    romanceMovies: data[6]?.results,
    documentaries: data[7]?.results,
  };
};

export const getTvShowsPageProps = async () => {
  const data = await getResults(tvRequests, [
    "fetchDiscoverMedias",
    "fetchTrending",
    "fetchTopRated",
    "fetchSciFiShows",
    "fetchComedyShows",
    "fetchMysteryShows",
    "fetchRomanceShows",
    "fetchDocumentaries",
  ]);

  // maintain the order
  return {
    discoverMedias: data[0]?.results,
    trendingNow: data[1]?.results,
    topRated: data[2]?.results,
    sciFiShows: data[3]?.results,
    comedyShows: data[4]?.results,
    mysteryShows: data[5]?.results,
    romanceShows: data[6]?.results,
    documentaries: data[7]?.results,
  };
};

import Banner from "@/components/banner";
import Row from "@/components/row";
import UserListRow from "@/components/user-list-row";
import { getTvShowsPageProps } from "@/lib/page-props-actions";
import React from "react";

const TvShowsPage = async () => {
  const data = await getTvShowsPageProps();
  return (
    <>
      <Banner netflixOriginals={data.netflixOriginals} />
      <section className="md:space-y-24">
        <Row title="Trending Now" movies={data.trendingNow} />
        <Row title="Sci-fi and Fantasy" movies={data.sciFiShows} />
        <Row title="Top Rated" movies={data.topRated} />
        <Row title="Documentaries" movies={data.documentaries} />
        {/* My List */}
        <UserListRow />
        <Row title="Comedies" movies={data.comedyShows} />
        <Row title="Mystery" movies={data.mysteryShows} />
        <Row title="Romance" movies={data.romanceShows} />
      </section>
    </>
  );
};

export default TvShowsPage;

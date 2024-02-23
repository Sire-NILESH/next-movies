import Banner from "@/components/banner";
import Row from "@/components/row";
import UserListRow from "@/components/user-list-row";
import { getHomePageProps } from "@/lib/page-props-actions";
import React from "react";

const HomePage = async () => {
  const data = await getHomePageProps();

  return (
    <>
      <Banner netflixOriginals={data.netflixOriginals} />
      <section className="md:space-y-24">
        <Row title="Trending Now" movies={data.trendingNow} />
        <Row title="Comedies" movies={data.comedyMovies} />
        <Row title="Top Rated" movies={data.topRated} />
        <Row title="Documentaries" movies={data.documentaries} />
        {/* My List */}
        <UserListRow />
        <Row title="Action Thrillers" movies={data.actionMovies} />
        <Row title="Scary Movies" movies={data.horrorMovies} />
        <Row title="Romance Movies" movies={data.romanceMovies} />
      </section>
    </>
  );
};

export default HomePage;

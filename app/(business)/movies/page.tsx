import Banner from "@/components/banner";
import Row from "@/components/row";
import UserListRow from "@/components/user-list-row";
import { getMoviePageProps } from "@/lib/pagePropsActions";
import React, { Suspense } from "react";

const MoviesPage = async () => {
  const data = await getMoviePageProps();

  return (
    <>
      <Banner netflixOriginals={data.netflixOriginals} />

      <section className="md:space-y-24">
        <Row title="Trending Now" movies={data.trendingNow} />
        <Row title="Top Rated" movies={data.topRated} />
        <Row title="Action Thrillers" movies={data.actionMovies} />
        {/* My List */}
        <UserListRow />
        <Row title="Comedies" movies={data.comedyMovies} />
        <Row title="Scary Movies" movies={data.horrorMovies} />
        <Row title="Romance Movies" movies={data.romanceMovies} />
        <Row title="Documentaries" movies={data.documentaries} />
      </section>
    </>
  );
};

export default MoviesPage;

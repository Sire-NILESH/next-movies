import Banner from "@/components/banner";
import Row from "@/components/row";
import UserListRow from "@/components/user-list-row";
import { getMoviePageProps } from "@/lib/page-props-actions";
import React, { Suspense } from "react";

const MoviesPage = async () => {
  const data = await getMoviePageProps();

  return (
    <>
      <Banner netflixOriginals={data.netflixOriginals} />

      <section className="md:space-y-24">
        <Row title="Trending Now" medias={data.trendingNow} />
        <Row title="Top Rated" medias={data.topRated} />
        <Row title="Action Thrillers" medias={data.actionMovies} />
        {/* My List */}
        <UserListRow />
        <Row title="Comedies" medias={data.comedyMovies} />
        <Row title="Scary Movies" medias={data.horrorMovies} />
        <Row title="Romance Movies" medias={data.romanceMovies} />
        <Row title="Documentaries" medias={data.documentaries} />
      </section>
    </>
  );
};

export default MoviesPage;

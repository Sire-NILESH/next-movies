import Banner from "@/components/banner";
import Row from "@/components/row";
import UserListRow from "@/components/user-list-row";
import { getTvShowsPageProps } from "@/lib/page-props-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Shows",
};

const TvShowsPage = async () => {
  const data = await getTvShowsPageProps();
  return (
    <>
      <Banner medias={data.discoverMedias} />
      <section className="md:space-y-24">
        <Row title="Trending Now" medias={data.trendingNow} />
        <Row title="Sci-fi and Fantasy" medias={data.sciFiShows} />
        <Row title="Top Rated" medias={data.topRated} />
        <Row title="Documentaries" medias={data.documentaries} />
        {/* My List */}
        <UserListRow />
        <Row title="Comedies" medias={data.comedyShows} />
        <Row title="Mystery" medias={data.mysteryShows} />
        <Row title="Romance" medias={data.romanceShows} />
      </section>
    </>
  );
};

export default TvShowsPage;

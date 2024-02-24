import Banner from "@/components/banner";
import Row from "@/components/row";
import UserListRow from "@/components/user-list-row";
import { getHomePageProps } from "@/lib/page-props-actions";

const HomePage = async () => {
  const data = await getHomePageProps();

  return (
    <>
      <Banner netflixOriginals={data.netflixOriginals} />
      <section className="md:space-y-24">
        <Row title="Trending Now" medias={data.trendingNow} />
        <Row title="Comedies" medias={data.comedyMovies} />
        <Row title="Top Rated" medias={data.topRated} />
        <Row title="Documentaries" medias={data.documentaries} />
        {/* My List */}
        <UserListRow />
        <Row title="Action Thrillers" medias={data.actionMovies} />
        <Row title="Scary Movies" medias={data.horrorMovies} />
        <Row title="Romance Movies" medias={data.romanceMovies} />
      </section>
    </>
  );
};

export default HomePage;

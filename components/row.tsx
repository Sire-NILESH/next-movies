import { Media } from "@/types/typings";
import RowScroll from "./row-scroll";

interface Props {
  title: string;
  medias: Media[];
}

function Row({ title, medias }: Props) {
  return (
    <div className="h-40 space-y-1 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>

      <RowScroll medias={medias} />
    </div>
  );
}

export default Row;

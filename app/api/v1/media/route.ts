import { getCurrentSessionAction } from "@/lib/actions/authActions";
import { mediaDetailRequest } from "@/lib/requests";
import { GET_MediaDetailRouteSchema } from "@/lib/validationSchemas";
import { Genre, MediaDetails, MediaTrailerElement } from "@/types/typings";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getCurrentSessionAction();

    if (!session)
      return NextResponse.json(
        { error: { message: "You need to be logged in" } },
        { status: 401 }
      );

    const url = new URL(req.url);

    const paramMediaId = url.searchParams.get("id");
    const paramMediaType = url.searchParams.get("type");

    const params = {
      id: paramMediaId,
      type: paramMediaType,
    };

    // server side parse/invalidate the user provided param
    const parse = GET_MediaDetailRouteSchema.safeParse(params);

    if (!parse.success)
      return NextResponse.json(
        { error: { message: "Provided param invalidation failed" } },
        { status: 400 }
      );

    // extract parsed params
    const mediaId = parse.data.id;
    const mediaType = parse.data.type;

    const response = await fetch(
      mediaDetailRequest(Number(mediaId), mediaType)
    );

    const data = await response.json();

    const mediaDetails: MediaDetails = {
      mediaId: Number(mediaId),
      mediaType,
      trailer: null,
      // genres: [] as Genre[],
      genres: null,
    };

    if (data?.videos) {
      const index = data.videos.results.findIndex(
        (element: MediaTrailerElement) => element.type === "Trailer"
      );

      mediaDetails.trailer = data.videos?.results[index]?.key;
    }

    if (data?.genres) {
      mediaDetails.genres = data.genres as Genre[];
    }

    return NextResponse.json({ data: mediaDetails }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

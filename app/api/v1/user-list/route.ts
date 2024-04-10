import { getCurrentSessionAction } from "@/lib/actions/authActions";
import db from "@/lib/db/prisma";
import { Media } from "@/types/typings";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const session = await getCurrentSessionAction();

    if (!session)
      return NextResponse.json(
        { error: { message: "You need to be logged in" } },
        { status: 401 }
      );

    const user = session.user;

    const userDBData = await db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        user_list: {
          include: {
            items: {
              include: {
                media: true,
              },
            },
          },
        },
      },
    });

    if (userDBData?.user_list?.items) {
      const list = userDBData?.user_list?.items.map((item) => {
        // @ts-ignore
        delete item.media.db_id;
        return item.media as Media;
      });

      return NextResponse.json({ data: { list } }, { status: 200 });
    }

    return NextResponse.json({ data: { list: null } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

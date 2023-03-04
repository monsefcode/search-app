// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") throw new Error("Invalid query");

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query as string,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: query as string,
                mode: "insensitive",
              },
            },
            {
              author: {
                name: {
                  contains: query as string,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        include: {
          author: true,
        },
      });

      console.log(posts);

      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

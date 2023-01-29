// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = `*[_type == "post" && _id == '${id}']{
        _id,
         caption,
           video{
            asset->{
              _id,
              url
            }
          },
          userId,
        postedBy->{
          _id,
          userName,
          image
        },
         likes,
        comments[]{
          comment,
          _key,
          postedBy->{
            _ref,
          _id,
        },
        }
      }`;

    const data = await client.fetch(query);

    res.status(200).json(data[0]);
  }
}

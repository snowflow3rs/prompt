import Prompt from "@app/models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Fail to connect sever", { status: 500 });
  }
};

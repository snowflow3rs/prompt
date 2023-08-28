import Prompt from "@app/models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Fail to connect sever", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const exitPrompt = await Prompt.findById(params.id);

    if (!exitPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    exitPrompt.prompt = prompt;
    exitPrompt.tag = tag;
    await exitPrompt.save();
    return new Response("Successfully update", { status: 200 });
  } catch (error) {
    return new Response("Fail to connect sever", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Delete Successfully", { status: 200 });
  } catch (error) {
    return new Response("Fail to connect sever", { status: 500 });
  }
};

"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const handleSubmitted = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitted(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitted={submitted}
      handleSubmitted={handleSubmitted}
    />
  );
};

export default CreatePrompt;

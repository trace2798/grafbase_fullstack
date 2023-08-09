"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constant";
import { updatePost, createNewPost, fetchToken } from "@/lib/actions";
import { FormState, PostInterface, SessionInterface } from "@/common.types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

type Props = {
  type: string;
  session: SessionInterface;
  project?: PostInterface;
};

const PostForm = ({ type, session, project }: Props) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    category: project?.category || "",
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image!");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewPost(form, session?.user?.id, token);
        router.push("/");
      }

      if (type === "edit") {
        await updatePost(form, project?.id as string, token);
        router.push("/");
      }
    } catch (error) {
      alert(
        `Failed to ${
          type === "create" ? "create" : "edit"
        } a project. Try again!`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col items-start justify-start w-full max-w-5xl gap-10 pt-12 mx-auto text-lg lg:pt-24"
    >
      <div className="flex items-start justify-start w-full lg:min-h-fit min-h-[200px] relative">
        <Label
          htmlFor="poster"
          className="z-10 flex items-center justify-center w-full h-full p-20 text-center text-gray-100 border-2 border-dashed border-gray-50"
        >
          {!form.image && "Choose a picture for this post."}
        </Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="absolute z-30 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="z-20 object-contain sm:p-10"
            alt="image"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flex items-start justify-start w-full">
        {/* <Button
          title={
            submitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        /> */}
        <Button type="submit" disabled={submitting}>
          <Plus className="w-4 h-4 mr-2" /> Publish Post
        </Button>
      </div>
    </form>
  );
};

export default PostForm;

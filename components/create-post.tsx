"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SessionInterface } from "@/common.types";
import { createNewPost, fetchToken } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import ImageUpload from "./image-upload";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

type Props = {
  session: SessionInterface;
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  image: z.string().min(2),
  category: z.string().min(2).max(50),
});

const CreatePost = ({ session }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  //   const [form, setForm] = useState<FormState>({
  //     title: project?.title || "",
  //     description: project?.description || "",
  //     image: project?.image || "",
  //     category: project?.category || "",
  //   });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
    },
  });
  const { toast } = useToast();
  type FormData = z.infer<typeof formSchema>;

  //   const handleStateChange = (fieldName: keyof FormState, value: string) => {
  //     setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  //   };

  //   const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
  //     e.preventDefault();

  //     const file = e.target.files?.[0];

  //     if (!file) return;

  //     if (!file.type.includes("image")) {
  //       alert("Please upload an image!");

  //       return;
  //     }

  //     const reader = new FileReader();

  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       const result = reader.result as string;

  //       handleStateChange("image", result);
  //     };
  //   };

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const { token } = await fetchToken();
      setLoading(true);
      await createNewPost(values, session?.user?.id, token);
      router.push("/");
      // console.log(values, "VALUES VALUES");
      form.reset();
      toast({
        title: "Post Submitted",
        description: "Post Successfully submitted",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to submit data",
        description: "Make sure all fields are filled up.",
        variant: "destructive",
      });
    }
  };
  const handleTypeCategoryChange = (value: string) => {
    setSelectedCategoryType(value);
    form.setValue("category", value); // Update the format property in the form data
  };
  const [selectedCategoryType, setSelectedCategoryType] = useState("");

  //   const handleFormSubmit = async (e: FormEvent) => {
  //     e.preventDefault();

  //     setSubmitting(true);

  //     const { token } = await fetchToken();

  //     try {
  //       if (type === "create") {
  //         await createNewPost(form, session?.user?.id, token);
  //         router.push("/");
  //       }

  //       if (type === "edit") {
  //         await updatePost(form, project?.id as string, token);
  //         router.push("/");
  //       }
  //     } catch (error) {
  //       alert(
  //         `Failed to ${
  //           type === "create" ? "create" : "edit"
  //         } a project. Try again!`
  //       );
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-start w-full max-w-5xl gap-10 pt-12 mx-auto text-lg lg:pt-24"
      >
        {/* <div className="flex items-start justify-start w-full lg:min-h-fit min-h-[200px] relative">
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
        </div> */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  disabled={loading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title of your Post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Description of your post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormLabel>Category</FormLabel>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md">
              <FormControl>
                <Select
                  value={selectedCategoryType}
                  defaultValue={""}
                  onValueChange={handleTypeCategoryChange}
                >
                  <SelectTrigger className="w-fit md:w-[180px]">
                    <SelectValue>{selectedCategoryType}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a Coaching Plan</SelectLabel>
                      {["Tech", "Life"].map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-start justify-start w-full">
          <Button type="submit" disabled={submitting}>
            <Plus className="w-4 h-4 mr-2" /> Publish Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePost;

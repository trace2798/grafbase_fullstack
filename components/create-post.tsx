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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "./ui/label";
import { HoverContentComponent } from "./hover-content-component";

type Props = {
  session: SessionInterface;
};

const formSchema = z.object({
  title: z.string().min(4).max(50),
  description: z.string().min(2),
  image: z.string().min(2),
  category: z.string().min(2).max(50),
});

const CreatePost = ({ session }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
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

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    console.log(values, "CREATE POST")
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-start w-full gap-10 pt-12 mx-auto text-lg max-w-7xl "
      >
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="image" className="text-xl text-left w-fit">
              Image for your post
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent
              type="string"
              functionality="Image associated with the post"
              note="Using cloudinary"
            />
          </HoverCardContent>
        </HoverCard>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
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
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="title" className="text-xl text-left w-fit">
              Title
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent
              type="string"
              functionality="Title for the post."
              note="Min: 4, Max: 50"
            />
          </HoverCardContent>
        </HoverCard>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[80vw] lg:w-[30vw]"
                  placeholder="Title of your Post"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="description" className="text-xl text-left w-fit">
              Description
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent
              type="string"
              functionality="Description for the post"
              note="Required"
            />
          </HoverCardContent>
        </HoverCard>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="w-[80vw] lg:w-[40vw]"
                  placeholder="Description of your post"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Label htmlFor="category" className="text-xl text-left w-fit">
              Category
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent
              type="string"
              functionality="Category your post fit's in"
              note="Required"
            />
          </HoverCardContent>
        </HoverCard>
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

        <div className="flex items-start justify-start w-full pb-10 md:pb-0">
          <Button type="submit" disabled={submitting}>
            <Plus className="w-4 h-4 mr-2" /> Publish Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePost;

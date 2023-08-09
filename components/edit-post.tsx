"use client";

import { PostInterface, SessionInterface } from "@/common.types";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { fetchToken, updatePost } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { HoverContentComponent } from "./hover-content-component";
import ImageUpload from "./image-upload";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
  post?: PostInterface;
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
  image: z.string().min(2),
  category: z.string().min(2).max(50),
});

const EditPost = ({ session, post }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title,
      description: post?.description,
      image: post?.image,
      category: post?.category,
    },
  });
  const { toast } = useToast();
  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const { token } = await fetchToken();
      setLoading(true);
      await updatePost(values, post?.id as string, token);
      router.push("/");
      toast({
        title: "Updated",
        description: "Post Successfully updated",
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
  const [selectedCategoryType, setSelectedCategoryType] = useState(
    post?.category
  );
  const isLoading = form.formState.isSubmitting;

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
            <HoverContentComponent type="Client's name." />
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
            <HoverContentComponent type="Title for the post" />
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
            <HoverContentComponent type="Description for the post" />
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
            <Label htmlFor="title" className="text-xl text-left w-fit">
              Category
            </Label>
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            className="w-[260px] text-sm"
            side="left"
          >
            <HoverContentComponent type="Category your post fit's in." />
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
            <Plus className="w-4 h-4 mr-2" /> Publish Updated Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPost;

"use client";
import * as React from "react";

import { SessionInterface, UserForm } from "@/common.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchToken, updateUser } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ImageUpload from "./image-upload";

type Props = {
  session: SessionInterface;
  user?: UserForm;
};

const formSchema = z.object({
  name: z.string().min(4).max(50),
  description: z.string(),
  avatarUrl: z.string(),
});

const CardWithForm = ({ session, user }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const { toast } = useToast();
  const userId = session.user?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.user?.name,
      description: session.user?.description ?? "",
      avatarUrl: session.user.avatarUrl,
    },
  });

  type FormData = z.infer<typeof formSchema>;
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const { token } = await fetchToken();
      setLoading(true);

      await updateUser(values, userId as string, token);
      router.push("/");
      toast({
        title: "User updated successfully",
        description: "Post Successfully updated",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      // console.log(error);
      toast({
        title: "Failed to update user",
        description: "Sorry an error occurred while updating info",
        variant: "destructive",
      });
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you can update your display name and description
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={session.user?.name} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={session.user?.description}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Your Avatar</Label>
                <FormField
                  control={form.control}
                  name="avatarUrl"
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
              </div>
            </div>
            <div className="flex flex-col space-y-1.5 mt-3">
              <Label>Email</Label>
              <Input placeholder={session.user.email} disabled />
            </div>
            <Button type="submit" disabled={submitting} className="mt-5">
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CardWithForm;

{
  /* <Avatar>
<AvatarImage src={session?.user?.image ?? ""} />
<AvatarFallback>T</AvatarFallback>
</Avatar> */
}

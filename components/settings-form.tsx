"use client";
import * as React from "react";

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
import { SessionInterface, UserProfile } from "@/common.types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchToken, updateUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { PlusSquare } from "lucide-react";

type Props = {
  session: SessionInterface;
  user?: UserProfile;
};

const formSchema = z.object({
  name: z.string().min(4).max(50),
  description: z.string(),
  avatarUrl: z.string().min(2),
  email: z.string().min(5),
});

const CardWithForm = ({ session, user }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      description: user?.description ?? "",
      avatarUrl: user?.avatarUrl,
      email: user?.email,
    },
  });
  type FormData = z.infer<typeof formSchema>;
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      const { token } = await fetchToken();
      setLoading(true);

      await updateUser(values, user?.id as string, token);
      router.push("/");
      toast({
        title: "User updated successfully",
        description: "Post Successfully updated",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update user",
        description: "Make sure all fields are filled up.",
        variant: "destructive",
      });
    }
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Your information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                {/* <Input
                  id="name"
                  placeholder="Name of your project"
                  value={session.user.name}
                /> */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={session.user?.name}
                          {...field}
                          value={session.user?.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                {/* <Input
                  id="name"
                  placeholder="Name of your project"
                  value={session.user.email}
                  disabled
                /> */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          value={session.user?.email}
                        />
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
                        <Input
                          placeholder="Tell us something about you"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Avatar</Label>
                <Avatar>
                  <AvatarImage src={session?.user?.image ?? ""} />
                  <AvatarFallback>T</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" disabled={submitting}>
          <PlusSquare className="w-4 h-4 mr-2" /> Publish Updated Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWithForm;

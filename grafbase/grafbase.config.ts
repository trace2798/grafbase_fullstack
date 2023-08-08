import { g, config, auth } from "@grafbase/sdk";

// @ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 100 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().length({ min: 2, max: 1000 }).optional(),
    posts: g
      .relation(() => Post)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });

// @ts-ignore
const Post = g
  .model("Post", {
    title: g.string().length({ min: 3 }),
    description: g.string().optional(),
    image: g.url(),
    category: g.string().search(),
    createdBy: g.relation(() => User),
    votes: g
      .relation(() => vote)
      .optional()
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
    rules.private().create().delete().update();
  });

const vote = g.model("Vote", {
  user: g.relation(() => User),
  post: g.relation(() => Post),
});

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});

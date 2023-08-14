interface SiteConfig {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
      twitter: string;
      github: string;
    };
  }
  export const siteConfig: SiteConfig = {
    name: "Graphy",
    description:
      "An open source application to post your milestones and more. Authentication with Passage.",
    url: "https://grafbase-fullstack.vercel.app/",
    ogImage: "https://grafbase-fullstack.vercel.app/og.jpg",
    links: {
      twitter: "https://twitter.com/Tisonthemove247",
      github: "https://github.com/trace2798/grafbase_fullstack",
    },
  };
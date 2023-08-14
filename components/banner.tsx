"use client";

const Banner = () => {
  return (
    <>
      <div className="flex flex-col items-center px-3 py-1 text-sm font-medium rounded-lg md:flex-row bg-muted">
        This is my submission for{" "}
        <div>
          <a
            href="https://grafbase.com/"
            target="_blank"
            className="hover:text-blue-500 "
          >
            &nbsp; Grafbase&nbsp;
          </a>{" "}
          X{" "}
          <a
            href="https://hashnode.com/"
            target="_blank"
            className="hover:text-blue-500"
          >
            &nbsp;Hashnode
          </a>
          <a
            href="https://hashnode.com/hackathons/grafbase"
            target="_blank"
            className="hover:text-blue-500"
          >
            &nbsp; Hackathon
          </a>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center justify-center px-3 py-1 mx-5 mt-5 text-sm font-medium rounded-lg w-fit bg-muted">
          <a
            href="https://github.com/trace2798/grafbase_fullstack"
            target="_blank"
            className="text-center hover:text-blue-500"
          >
            &nbsp;Github Repo&nbsp;
          </a>
        </div>
        <div className="flex flex-col items-center px-3 py-1 mx-5 mt-5 text-sm font-medium rounded-lg bg-muted">
          <a
            href="https://shreyas-chaliha.hashnode.dev/post-your-thought-with-graphy"
            target="_blank"
            className="text-center hover:text-blue-500"
          >
            Hashnode Article
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;

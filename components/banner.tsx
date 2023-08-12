"use client";

const Banner = () => {
  return (
    <>
      <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-lg bg-muted">
        This is my submission for{" "}
        <a
          href="https://grafbase.com/"
          target="_blank"
          className="hover:text-blue-500"
        >
          &nbsp; Grafbase&nbsp;
        </a>{" "}
        X{" "}
        <a
          href="https://hashnode.com/"
          target="_blank"
          className="hover:text-blue-500"
        >
          &nbsp;Hashnode Hackathon
        </a>
      </div>
      <div className="flex">
        <div className="flex items-center justify-center px-3 py-1 mx-5 mt-5 text-sm font-medium rounded-lg w-fit bg-muted">
          <a
            href="https://github.com/trace2798/grafbase_fullstack"
            target="_blank"
            className="hover:text-blue-500"
          >
            &nbsp;Github Repo&nbsp;
          </a>
        </div>
        <div className="flex flex-col items-center px-3 py-1 mx-5 mt-5 text-sm font-medium rounded-lg bg-muted">
          <a
            href="hashnode.com"
            target="_blank"
            className="hover:text-blue-500"
          >
            Hashnode Article
          </a>
        </div>
      </div>
    </>
  );
};

export default Banner;

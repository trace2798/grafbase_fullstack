import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => (
  <>
    <Separator />
    <section className="flex items-center justify-center py-5">
      Proudly Open Source. Illustration from &nbsp;
      <Link
        href="https://absurd.design/chapter/intro"
        target="_blank"
        className="underline hover:text-blue-500 text-neutral-400"
      >
        {" "}
        absurd.design
      </Link>
    </section>
  </>
);

export default Footer;

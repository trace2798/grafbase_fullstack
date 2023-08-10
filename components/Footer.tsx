import Link from "next/link";
import { Separator } from "./ui/separator";

const Footer = () => (
  <>
    <Separator />
    <section className="flex items-center justify-center py-5">
      MIT License. Illustration from{" "}
      <Link href="https://absurd.design/chapter/intro" target="_blank" className="hover:text-blue-500">
        {" "}
        &nbsp;Absurd Design
      </Link>
    </section>
  </>
);

export default Footer;

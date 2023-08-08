import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@/constant";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <section className="flexStart footer">
    <div className="flex flex-col w-full gap-12">
      <div className="flex flex-col items-start">
        <Image src="/logo-purple.svg" width={116} height={38} alt="logo" />

        <p className="max-w-xs mt-5 text-sm font-normal text-start">
          Flexibble is the world&apos;s leading community for creatives to
          share, grow, and get hired.
        </p>
      </div>
    </div>

    <div className="flexBetween footer_copyright">
      <p>@ 2023 Flexibble. All rights reserved</p>
      <p className="text-gray">
        <span className="font-semibold text-black">10,214</span> projects
        submitted
      </p>
    </div>
  </section>
);

export default Footer;

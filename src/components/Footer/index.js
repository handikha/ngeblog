import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
export default function Footer() {
  const footers = [
    {
      title: "Blog.",
      items: [{ title: "\u00A9 2023 Handikha Jul" }, { type: "text" }],
    },
    {
      title: "About Us",
      items: [
        { title: "Lorem Ipsum", path: "/", type: "link" },
        { title: "Dolor Sit", path: "/", type: "link" },
        { title: "Lorem Ipsum", path: "/", type: "link" },
        { title: "Dolor Sit", path: "/", type: "link" },
      ],
    },
    {
      title: "Product",
      items: [
        { title: "Lorem Ipsum", path: "/", type: "link" },
        { title: "Dolor Sit", path: "/", type: "link" },
        { title: "Lorem Ipsum", path: "/", type: "link" },
        { title: "Dolor Sit", path: "/", type: "link" },
      ],
    },
    {
      title: "Contact Us",
      items: [
        { title: "mail@mail.com", path: "/", type: "text" },
        { title: "+62 859-1234-5678", path: "/", type: "text" },
        {
          title: <FaFacebookF className="inline text-lg" />,
          path: "/",
          type: "link",
          icon: true,
        },
        {
          title: <FaInstagram className="inline text-lg" />,
          path: "/",
          type: "link",
          icon: true,
        },
        {
          title: <FaTwitter className="inline text-lg" />,
          path: "/",
          type: "link",
          icon: true,
        },
      ],
    },
  ];
  return (
    <footer className="bg-lighter font-poppins">
      <div className="container flex flex-col justify-between gap-8 px-4 py-12 md:flex-row">
        {footers.map((footer, index) => (
          <div className="" key={index}>
            <h3 className="mb-2 text-lg font-semibold text-dark">
              {footer.title}
            </h3>
            <div className="mt-2 text-gray">
              {footer.items.map((item, index) =>
                item.type === "link" ? (
                  <a
                    key={index}
                    href={item.path}
                    className={`mt-2 hover:text-primary ${
                      item.icon ? "mr-4 inline" : "block"
                    }`}
                  >
                    {item.title}
                  </a>
                ) : (
                  <p key={index} className="mt-2">
                    {item.title}
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

import { useEffect } from "react";

const HeadMetadata = ({ title, favicon }) => {
  useEffect(() => {
    document.title = title;

    if (favicon) {
      const link = document.getElementById("favicon");
      if (link) {
        link.href = favicon;
      } else {
        const linkElement = document.createElement("link");
        linkElement.id = "favicon";
        linkElement.rel = "icon";
        linkElement.href = favicon;
        document.head.appendChild(linkElement);
      }
    }
  }, [title, favicon]);

  return null;
};

export default HeadMetadata;

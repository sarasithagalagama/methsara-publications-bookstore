import { useEffect } from "react";

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = "Methsara Publications";
  const defaultDescription =
    "Quality educational books for Sri Lankan students preparing for O/L and A/L examinations.";
  const defaultKeywords =
    "books, education, sri lanka, o/l, a/l, methsara publications, methsara books, past papers, model papers";

  const siteUrl = window.location.origin;
  const defaultImage = `${siteUrl}/site-icon.png`;

  const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : defaultImage;
  const finalUrl = url
    ? url.startsWith("http")
      ? url
      : `${siteUrl}${url}`
    : window.location.href;

  useEffect(() => {
    // Update Title
    document.title = finalTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attr, attrValue, content) => {
      let element = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to set Link tags (canonical)
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard Meta Tags
    setMetaTag("name", "description", finalDescription);
    setMetaTag("name", "keywords", finalKeywords);
    setLinkTag("canonical", finalUrl);

    // Open Graph
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", finalUrl);
    setMetaTag("property", "og:title", finalTitle);
    setMetaTag("property", "og:description", finalDescription);
    setMetaTag("property", "og:image", finalImage);

    // Twitter
    setMetaTag("property", "twitter:card", "summary_large_image");
    setMetaTag("property", "twitter:url", finalUrl);
    setMetaTag("property", "twitter:title", finalTitle);
    setMetaTag("property", "twitter:description", finalDescription);
    setMetaTag("property", "twitter:image", finalImage);
  }, [finalTitle, finalDescription, finalKeywords, finalImage, finalUrl]);

  return null;
};

export default SEO;

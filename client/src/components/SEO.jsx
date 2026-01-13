import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = "Methsara Publications";
  const defaultDescription =
    "Quality educational books for Sri Lankan students preparing for O/L and A/L examinations.";
  const defaultKeywords =
    "books, education, sri lanka, o/l, a/l, methsara publications, methsara books, past papers, model papers";

  // Use a default image if none is provided. Ensure it's an absolute URL for social sharing if possible,
  // but for now relative path is better than nothing, or use window.location.origin
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

  return (
    <Helmet>
      {/* Basic */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
    </Helmet>
  );
};

export default SEO;

import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  schema?: Record<string, any>;
  noIndex?: boolean;
}

export function SEO({
  title = "MediSpire",
  description = "MediSpire — Expert guidance for Indian healthcare professionals moving to Germany. By doctors who made the journey themselves.",
  canonical,
  ogImage = "https://medispire.in/opengraph.jpg",
  schema,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title === "MediSpire" || title.includes("MediSpire") ? title : `${title} | MediSpire`;
  const url = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `https://medispire.in${canonical}`
    : "https://medispire.in";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="MediSpire" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@DocsinDE" />

      {canonical && <link rel="canonical" href={url} />}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}

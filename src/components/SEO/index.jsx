import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  const defaultTitle = 'Anees Aboobacker | MERN Stack Developer';
  const defaultDescription = 'MERN Stack Developer specializing in building exceptional digital experiences. Expert in React, Node.js, and modern web technologies.';
  const defaultKeywords = 'MERN Stack, React Developer, JavaScript, Web Development, Portfolio, Full Stack Developer, Anees Aboobacker';

  return (
    <Helmet>
      <title>{title ? `${title} | Anees Aboobacker` : defaultTitle}</title>
      <meta 
        name="description" 
        content={description || defaultDescription} 
      />
      <meta 
        name="keywords" 
        content={keywords ? `${defaultKeywords}, ${keywords}` : defaultKeywords} 
      />
      <meta name="author" content="Anees Aboobacker" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta 
        property="og:title" 
        content={title ? `${title} | Anees Aboobacker` : defaultTitle} 
      />
      <meta 
        property="og:description" 
        content={description || defaultDescription} 
      />
      <meta property="og:url" content={window.location.href} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta 
        name="twitter:title" 
        content={title ? `${title} | Anees Aboobacker` : defaultTitle} 
      />
      <meta 
        name="twitter:description" 
        content={description || defaultDescription} 
      />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#0f172a" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEO;

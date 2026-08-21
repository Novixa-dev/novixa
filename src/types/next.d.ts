export interface NextConfig {
  reactStrictMode?: boolean;
  transpilePackages?: string[];
  images?: {
    unoptimized?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface Metadata {
  title?: string | { default: string; template?: string };
  description?: string;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    locale?: string;
    type?: string;
    images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    creator?: string;
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      'max-video-preview'?: number;
      'max-image-preview'?: string;
      'max-snippet'?: number;
    };
  };
  icons?: {
    icon?: string;
    shortcut?: string;
    apple?: string;
  };
  [key: string]: any;
}

export type Robots = {
  rules: {
    userAgent: string | string[];
    allow?: string | string[];
    disallow?: string | string[];
  } | Array<{
    userAgent: string | string[];
    allow?: string | string[];
    disallow?: string | string[];
  }>;
  sitemap?: string | string[];
  host?: string;
};

export type Sitemap = Array<{
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
  [key: string]: any;
}>;

export namespace MetadataRoute {
  export type Robots = {
    rules: {
      userAgent: string | string[];
      allow?: string | string[];
      disallow?: string | string[];
    } | Array<{
      userAgent: string | string[];
      allow?: string | string[];
      disallow?: string | string[];
    }>;
    sitemap?: string | string[];
    host?: string;
  };

  export type Sitemap = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
    alternates?: {
      languages?: Record<string, string>;
    };
    [key: string]: any;
  }>;
}

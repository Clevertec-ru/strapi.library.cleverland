import { CategoryDataType } from "./categories";

export type BookType = {
  issueYear: string;
  rating: number;
  title: string;
  id: number;
  authors: string[] | null;
  images: { url: string }[] | null;
  categories: string[] | null;
};

export type BookDataType = {
  data: {
    id: number;
    attributes: {
      title: string;
      rating: number;
      issueYear: string;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      description: string | null;
      authors: AuthorType;
      images: ImageType;
      categories: CategoryDataType;
    };
  }[];
};

type ImageType = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        thumbnail: FormatType;
        small: FormatType;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};

type FormatType = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
};

type AuthorType = {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
    };
  }[];
};

export type CategoryDataType = {
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

export type CategoryType = {
  name: string;
  id: number;
};

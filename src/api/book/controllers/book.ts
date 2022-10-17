/**
 * book controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import { BookDataType, BookType } from "../../../types/book";

export default factories.createCoreController(
  "api::book.book",
  ({ strapi }: { strapi: Strapi }) => ({
    async find(ctx) {
      ctx.query = { ...ctx.query, populate: "*" };
      const { data }: BookDataType = await super.find(ctx);

      const books: BookType[] = data.map(
        ({
          attributes: { issueYear, rating, title, authors, images, categories },
          id,
        }) => ({
          issueYear,
          rating,
          title,
          authors: authors.data.length
            ? authors.data.map(({ attributes }) => attributes.name)
            : null,
          images:
            images.data?.map(({ attributes }) => ({
              url: attributes.url,
            })) || null,
          categories: categories.data.length
            ? categories.data.map(({ attributes }) => attributes.name)
            : null,
          id,
        })
      );
      return books;
    },
  })
);

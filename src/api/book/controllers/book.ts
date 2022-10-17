/**
 * book controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import {
  BookDataResponseType,
  BooksDataResponseType,
} from "../../../types/book";

export default factories.createCoreController(
  "api::book.book",
  ({ strapi }: { strapi: Strapi }) => ({
    async find(ctx) {
      ctx.query = { ...ctx.query, populate: "*" };
      const { data }: BooksDataResponseType = await super.find(ctx);

      const books = data.map(
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

    async findOne(ctx) {
      ctx.query = { ...ctx.query, populate: "*" };
      const { data }: BookDataResponseType = await super.findOne(ctx);
      const book = {
        id: data.id,
        title: data.attributes.title,
        rating: data.attributes.rating,
        issueYear: data.attributes.issueYear,
        description: data.attributes.description,
        publish: data.attributes.publish,
        pages: data.attributes.pages,
        cover: data.attributes.cover,
        weight: data.attributes.weight,
        format: data.attributes.format,
        ISBN: data.attributes.ISBN,
        producer: data.attributes.producer,
        authors: data.attributes.authors.data.length
          ? data.attributes.authors.data.map(
              ({ attributes }) => attributes.name
            )
          : null,
        images:
          data.attributes.images.data?.map(({ attributes }) => ({
            url: attributes.url,
          })) || null,
        categories: data.attributes.categories.data.length
          ? data.attributes.categories.data.map(
              ({ attributes }) => attributes.name
            )
          : null,
      };

      return book;
    },
  })
);

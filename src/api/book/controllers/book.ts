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
          authors,
          image:
            images.data?.map(({ attributes }) => ({
              url: attributes.url,
            }))[0] || null,
          categories: categories.data.length
            ? categories.data.map(({ attributes }) => attributes.name)
            : null,
          id,
        })
      );
      return books;
    },

    async findOne(ctx) {
      ctx.query = { ...ctx.query, populate: "deep" };
      const {
        data: {
          id,
          attributes: {
            title,
            rating,
            issueYear,
            description,
            publish,
            pages,
            cover,
            weight,
            format,
            ISBN,
            producer,
            authors,
            images,
            categories,
            comments,
          },
        },
      }: BookDataResponseType = await super.findOne(ctx);
      const book = {
        id,
        title,
        rating,
        issueYear,
        description,
        publish,
        pages,
        cover,
        weight,
        format,
        ISBN,
        producer,
        authors,
        images:
          images.data?.map(({ attributes }) => ({
            url: attributes.url,
          })) || null,
        categories: categories?.data.length
          ? categories.data.map(({ attributes }) => attributes.name)
          : null,
        comments: comments?.data.length
          ? comments.data?.map(
              ({ id, attributes: { rating, text, createdAt, user } }) => ({
                id,
                rating,
                text,
                createdAt,
                user: {
                  firstName: user.data.attributes.firstName,
                  lastName: user.data.attributes.lastName,
                  avatarUrl:
                    user.data.attributes.avatar.data?.attributes.formats
                      .thumbnail.url || null,
                },
              })
            )
          : null,
      };

      return book;
    },
  })
);

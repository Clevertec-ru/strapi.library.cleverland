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
      ctx.query = { ...ctx.query, populate: "deep" };
      const { data }: BooksDataResponseType = await super.find(ctx);

      const books =
        data.map(
          ({
            attributes: {
              issueYear,
              rating,
              title,
              authors,
              images,
              categories,
              booking,
            },
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
            booking: {
              id: booking.data?.id || null,
              order: booking.data?.attributes.order || false,
              dateOrderFrom: booking.data?.attributes.dateOrderFrom || null,
              userId: booking.data?.attributes.user.data.id || null,
            },
          })
        ) || [];
      return books;
    },

    async findOne(ctx) {
      ctx.query = { ...ctx.query, populate: "deep" };
      const response: BookDataResponseType = await super.findOne(ctx);
      if (!response) return Error("Not found");
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
            booking,
          },
        },
      } = response;
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
                  commentUserId: user.data.id,
                  firstName: user.data.attributes.firstName,
                  lastName: user.data.attributes.lastName,
                  avatarUrl:
                    user.data.attributes.avatar.data?.attributes.formats
                      .thumbnail.url || null,
                },
              })
            )
          : null,
        booking: {
          id: booking.data?.id || null,
          order: booking.data?.attributes.order || false,
          dateOrderFrom: booking.data?.attributes.dateOrderFrom || null,
          bookingUserId: booking.data?.attributes.user.data.id || null,
        },
      };

      return book;
    },
  })
);

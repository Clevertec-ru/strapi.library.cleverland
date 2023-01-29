/**
 * comment controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::comment.comment",
  ({ strapi }: { strapi: Strapi }) => ({
    async create(ctx) {
      if (!ctx.request.body) {
        return ctx.badRequest(
          "Ошибка комментирования. Не передано тело запроса",
          {
            body: ctx.request.body,
          }
        );
      }

      if (!ctx.request.body.data) {
        return ctx.badRequest(
          "Ошибка комментирования. Не переданы данные запроса",
          {
            data: ctx.request.body.data,
          }
        );
      }

      if (!ctx.request.body.data.rating && ctx.request.body.data.rating !== 0) {
        return ctx.badRequest(
          "Ошибка комментирования. Не передан параметр rating",
          {
            rating: ctx.request.body.data.rating,
          }
        );
      }

      if (
        ctx.request.body.data.rating < 0 ||
        ctx.request.body.data.rating > 5
      ) {
        return ctx.badRequest(
          "Ошибка комментирования. Не правильный параметр rating",
          {
            rating: ctx.request.body.data.rating,
          }
        );
      }

      if (!ctx.request.body.data.book) {
        return ctx.badRequest(
          "Ошибка комментирования. Не передан параметр book",
          {
            book: ctx.request.body.data.book,
          }
        );
      }

      const book = await strapi
        .service("api::book.book")
        .findOne(ctx.request.body.data.book, ctx.query);
      if (!book) {
        return ctx.badRequest(
          "Ошибка комментирования. Книга не найдена по данному id",
          {
            id: ctx.request.body.data.book,
          }
        );
      }

      if (!ctx.request.body.data.user) {
        return ctx.badRequest(
          "Ошибка комментирования. Не передан параметр user",
          {
            user: ctx.request.body.data.user,
          }
        );
      }

      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.request.body.data.user,
        ctx.query
      );
      if (!user) {
        return ctx.badRequest(
          "Ошибка комментирования. Пользователь не найден по данному id",
          {
            user: ctx.request.body.data.user,
          }
        );
      }

      if (ctx.request.body.data.user != ctx.state.user?.id) {
        return ctx.badRequest(
          "Ошибка комментирования. Нет прав коменторования не своего пользователя",
          {
            customer: ctx.request.body.data.customer,
            userId: ctx.state.user?.id,
          }
        );
      }

      const { data } = await super.create(ctx);
      return data;
    },
  })
);

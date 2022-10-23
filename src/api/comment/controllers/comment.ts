/**
 * comment controller
 */
import { Strapi } from "@strapi/strapi";
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::comment.comment",
  ({ strapi }: { strapi: Strapi }) => ({
    async find(ctx) {
      ctx.query = { ...ctx.query, populate: "*" };
      const { data }: any = await super.find(ctx);

      return data;
    },

    async findOne(ctx) {
      ctx.query = { ...ctx.query, populate: "*" };
      const { data }: any = await super.findOne(ctx);

      return data;
    },
  })
);

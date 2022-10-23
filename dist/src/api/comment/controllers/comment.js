"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::comment.comment", ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, populate: "*" };
        const { data } = await super.find(ctx);
        return data;
    },
    async findOne(ctx) {
        ctx.query = { ...ctx.query, populate: "*" };
        const { data } = await super.findOne(ctx);
        return data;
    },
}));

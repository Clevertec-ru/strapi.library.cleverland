"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::book.book", ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, populate: "*" };
        const { data } = await super.find(ctx);
        const books = data.map(({ attributes: { issueYear, rating, title, authors, images, categories }, id, }) => {
            var _a;
            return ({
                issueYear,
                rating,
                title,
                authors: authors.data.length
                    ? authors.data.map(({ attributes }) => attributes.name)
                    : null,
                images: ((_a = images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                    url: attributes.url,
                }))) || null,
                categories: categories.data.length
                    ? categories.data.map(({ attributes }) => attributes.name)
                    : null,
                id,
            });
        });
        return books;
    },
    async findOne(ctx) {
        var _a;
        ctx.query = { ...ctx.query, populate: "*" };
        const { data } = await super.findOne(ctx);
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
                ? data.attributes.authors.data.map(({ attributes }) => attributes.name)
                : null,
            images: ((_a = data.attributes.images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                url: attributes.url,
            }))) || null,
            categories: data.attributes.categories.data.length
                ? data.attributes.categories.data.map(({ attributes }) => attributes.name)
                : null,
        };
        return book;
    },
}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::book.book", ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, populate: "deep" };
        const { data } = await super.find(ctx);
        const books = data.map(({ attributes: { issueYear, rating, title, authors, images, categories, booking, }, id, }) => {
            var _a, _b, _c, _d;
            return ({
                issueYear,
                rating,
                title,
                authors,
                image: ((_a = images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                    url: attributes.url,
                }))[0]) || null,
                categories: categories.data.length
                    ? categories.data.map(({ attributes }) => attributes.name)
                    : null,
                id,
                booking: {
                    order: ((_b = booking.data) === null || _b === void 0 ? void 0 : _b.attributes.order) || false,
                    dateOrderFrom: ((_c = booking.data) === null || _c === void 0 ? void 0 : _c.attributes.dateOrderFrom) || null,
                    userId: ((_d = booking.data) === null || _d === void 0 ? void 0 : _d.attributes.user.data.id) || null,
                },
            });
        }) || [];
        return books;
    },
    async findOne(ctx) {
        var _a, _b, _c, _d, _e;
        ctx.query = { ...ctx.query, populate: "deep" };
        const response = await super.findOne(ctx);
        if (!response)
            return Error("Not found");
        const { data: { id, attributes: { title, rating, issueYear, description, publish, pages, cover, weight, format, ISBN, producer, authors, images, categories, comments, booking, }, }, } = response;
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
            images: ((_a = images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                url: attributes.url,
            }))) || null,
            categories: (categories === null || categories === void 0 ? void 0 : categories.data.length)
                ? categories.data.map(({ attributes }) => attributes.name)
                : null,
            comments: (comments === null || comments === void 0 ? void 0 : comments.data.length)
                ? (_b = comments.data) === null || _b === void 0 ? void 0 : _b.map(({ id, attributes: { rating, text, createdAt, user } }) => {
                    var _a;
                    return ({
                        id,
                        rating,
                        text,
                        createdAt,
                        user: {
                            firstName: user.data.attributes.firstName,
                            lastName: user.data.attributes.lastName,
                            avatarUrl: ((_a = user.data.attributes.avatar.data) === null || _a === void 0 ? void 0 : _a.attributes.formats.thumbnail.url) || null,
                        },
                    });
                })
                : null,
            booking: {
                order: ((_c = booking.data) === null || _c === void 0 ? void 0 : _c.attributes.order) || false,
                dateOrderFrom: ((_d = booking.data) === null || _d === void 0 ? void 0 : _d.attributes.dateOrderFrom) || null,
                userId: ((_e = booking.data) === null || _e === void 0 ? void 0 : _e.attributes.user.data.id) || null,
            },
        };
        return book;
    },
}));

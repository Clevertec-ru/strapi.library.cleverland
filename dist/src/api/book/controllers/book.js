"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::book.book", ({ strapi }) => ({
    async find(ctx) {
        ctx.query = { ...ctx.query, populate: "deep" };
        const { data } = await super.find(ctx);
        const books = data.map(({ attributes: { issueYear, rating, title, authors, images, categories, booking, delivery, }, id, }) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
                    id: ((_b = booking.data) === null || _b === void 0 ? void 0 : _b.id) || null,
                    order: ((_c = booking.data) === null || _c === void 0 ? void 0 : _c.attributes.order) || false,
                    dateOrder: ((_d = booking.data) === null || _d === void 0 ? void 0 : _d.attributes.dateOrder) || null,
                    customerId: ((_f = (_e = booking.data) === null || _e === void 0 ? void 0 : _e.attributes.customer.data) === null || _f === void 0 ? void 0 : _f.id) || null,
                },
                delivery: {
                    id: ((_g = delivery.data) === null || _g === void 0 ? void 0 : _g.id) || null,
                    handed: ((_h = delivery.data) === null || _h === void 0 ? void 0 : _h.attributes.handed) || false,
                    dateHandedFrom: ((_j = delivery.data) === null || _j === void 0 ? void 0 : _j.attributes.dateHandedFrom) || null,
                    dateHandedTo: ((_k = delivery.data) === null || _k === void 0 ? void 0 : _k.attributes.dateHandedTo) || null,
                    recipientId: ((_m = (_l = delivery.data) === null || _l === void 0 ? void 0 : _l.attributes.recipient.data) === null || _m === void 0 ? void 0 : _m.id) || null,
                },
            });
        }) || [];
        return books;
    },
    async findOne(ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        ctx.query = { ...ctx.query, populate: "deep" };
        const response = await super.findOne(ctx);
        if (!response)
            return Error("Not found");
        const { data: { id, attributes: { title, rating, issueYear, description, publish, pages, cover, weight, format, ISBN, producer, authors, images, categories, comments, booking, delivery, }, }, } = response;
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
                            commentUserId: user.data.id,
                            firstName: user.data.attributes.firstName,
                            lastName: user.data.attributes.lastName,
                            avatarUrl: ((_a = user.data.attributes.avatar.data) === null || _a === void 0 ? void 0 : _a.attributes.formats.thumbnail.url) || null,
                        },
                    });
                })
                : null,
            booking: {
                id: ((_c = booking.data) === null || _c === void 0 ? void 0 : _c.id) || null,
                order: ((_d = booking.data) === null || _d === void 0 ? void 0 : _d.attributes.order) || false,
                dateOrder: ((_e = booking.data) === null || _e === void 0 ? void 0 : _e.attributes.dateOrder) || null,
                customerId: ((_g = (_f = booking.data) === null || _f === void 0 ? void 0 : _f.attributes.customer.data) === null || _g === void 0 ? void 0 : _g.id) || null,
            },
            delivery: {
                id: ((_h = delivery.data) === null || _h === void 0 ? void 0 : _h.id) || null,
                handed: ((_j = delivery.data) === null || _j === void 0 ? void 0 : _j.attributes.handed) || false,
                dateHandedFrom: ((_k = delivery.data) === null || _k === void 0 ? void 0 : _k.attributes.dateHandedFrom) || null,
                dateHandedTo: ((_l = delivery.data) === null || _l === void 0 ? void 0 : _l.attributes.dateHandedTo) || null,
                recipientId: ((_o = (_m = delivery.data) === null || _m === void 0 ? void 0 : _m.attributes.recipient.data) === null || _o === void 0 ? void 0 : _o.id) || null,
            },
        };
        return book;
    },
}));

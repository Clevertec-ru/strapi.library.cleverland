"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (plugin) => {
    plugin.controllers.user.me = async (ctx) => {
        ctx.query = { ...ctx.query, populate: "deep" };
        const response = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.state.user.id, {
            populate: "deep",
        });
        const { id, username, email, confirmed, blocked, createdAt, updatedAt, firstName, lastName, phone, role, comments, avatar, bookings, deliveries, } = response;
        const user = {
            id,
            username,
            email,
            confirmed,
            blocked,
            createdAt,
            updatedAt,
            firstName,
            lastName,
            phone,
            role: {
                id: role.id,
                name: role.name,
                description: role.description,
                type: role.type,
            },
            comments: (comments === null || comments === void 0 ? void 0 : comments.map(({ id, rating, text, book }) => ({
                id,
                rating,
                text,
                bookId: book.id,
            }))) || null,
            avatar: avatar.url,
            bookings: (bookings === null || bookings === void 0 ? void 0 : bookings.map(({ id, order, dateOrder, book }) => {
                var _a, _b;
                return ({
                    id,
                    order,
                    dateOrder,
                    book: {
                        id: book.id,
                        title: book.title,
                        rating: book.rating,
                        issueYear: book.issueYear,
                        authors: book.authors,
                        image: ((_b = (_a = book.images) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map(({ attributes }) => ({
                            url: attributes.url,
                        }))[0]) || null,
                    },
                });
            })) || null,
            deliveries: (deliveries === null || deliveries === void 0 ? void 0 : deliveries.map(({ id, handed, dateHandedFrom, dateHandedTo, book }) => {
                var _a, _b;
                return ({
                    id,
                    handed,
                    dateHandedFrom,
                    dateHandedTo,
                    book: {
                        id: book.id,
                        title: book.title,
                        rating: book.rating,
                        issueYear: book.issueYear,
                        authors: book.authors,
                        image: ((_b = (_a = book.images) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map(({ attributes }) => ({
                            url: attributes.url,
                        }))[0]) || null,
                    },
                });
            })) || null,
        };
        return user;
    };
    plugin.controllers.user.findOne = async (ctx) => {
        ctx.query = { ...ctx.query, populate: "deep" };
        if (ctx.params.id == ctx.state.user.id) {
            const response = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.params.id, {
                populate: "deep",
            });
            const { id, username, email, confirmed, blocked, createdAt, updatedAt, firstName, lastName, phone, role, comments, avatar, bookings, deliveries, } = response;
            const user = {
                id,
                username,
                email,
                confirmed,
                blocked,
                createdAt,
                updatedAt,
                firstName,
                lastName,
                phone,
                role: {
                    id: role.id,
                    name: role.name,
                    description: role.description,
                    type: role.type,
                },
                comments: (comments === null || comments === void 0 ? void 0 : comments.map(({ id, rating, text, book }) => ({
                    id,
                    rating,
                    text,
                    bookId: book.id,
                }))) || null,
                avatar: avatar.url,
                bookings: (bookings === null || bookings === void 0 ? void 0 : bookings.map(({ id, order, dateOrder, book }) => {
                    var _a, _b;
                    return ({
                        id,
                        order,
                        dateOrder,
                        book: {
                            id: book.id,
                            title: book.title,
                            rating: book.rating,
                            issueYear: book.issueYear,
                            authors: book.authors,
                            image: ((_b = (_a = book.images) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        },
                    });
                })) || null,
                deliveries: (deliveries === null || deliveries === void 0 ? void 0 : deliveries.map(({ id, handed, dateHandedFrom, dateHandedTo, book }) => {
                    var _a, _b;
                    return ({
                        id,
                        handed,
                        dateHandedFrom,
                        dateHandedTo,
                        book: {
                            id: book.id,
                            title: book.title,
                            rating: book.rating,
                            issueYear: book.issueYear,
                            authors: book.authors,
                            image: ((_b = (_a = book.images) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        },
                    });
                })) || null,
            };
            return user;
        }
        else {
            return Error("Error permisson");
        }
    };
    // plugin.policies[newPolicy] = (ctx) => {};
    // plugin.routes["content-api"].routes.push({
    //   method: "GET",
    //   path: "/route-path",
    //   handler: "controller.action",
    // });
    return plugin;
};

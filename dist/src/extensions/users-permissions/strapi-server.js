"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (plugin) => {
    plugin.controllers.user.me = async (ctx) => {
        var _a, _b, _c, _d, _e;
        ctx.query = { ...ctx.query, populate: "deep" };
        const response = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.state.user.id, {
            populate: "deep",
        });
        const { id, username, email, confirmed, blocked, createdAt, updatedAt, firstName, lastName, phone, role, comments, avatar, booking, delivery, history, } = response;
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
            booking: {
                id: (booking === null || booking === void 0 ? void 0 : booking.id) || null,
                order: (booking === null || booking === void 0 ? void 0 : booking.order) || null,
                dateOrder: (booking === null || booking === void 0 ? void 0 : booking.dateOrder) || null,
                book: (booking === null || booking === void 0 ? void 0 : booking.book)
                    ? {
                        id: booking.book.id,
                        title: booking.book.title,
                        rating: booking.book.rating,
                        issueYear: booking.book.issueYear,
                        authors: booking.book.authors,
                        image: ((_b = (_a = booking.book.images) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map(({ attributes }) => ({
                            url: attributes.url,
                        }))[0]) || null,
                    }
                    : null,
            },
            delivery: {
                id: (delivery === null || delivery === void 0 ? void 0 : delivery.id) || null,
                handed: (delivery === null || delivery === void 0 ? void 0 : delivery.handed) || null,
                dateHandedFrom: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedFrom) || null,
                dateHandedTo: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedTo) || null,
                book: (delivery === null || delivery === void 0 ? void 0 : delivery.book)
                    ? {
                        id: delivery.book.id,
                        title: delivery.book.title,
                        rating: delivery.book.rating,
                        issueYear: delivery.book.issueYear,
                        authors: delivery.book.authors,
                        image: ((_d = (_c = delivery.book.images) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(({ attributes }) => ({
                            url: attributes.url,
                        }))[0]) || null,
                    }
                    : null,
            },
            history: {
                id: (history === null || history === void 0 ? void 0 : history.id) || null,
                books: ((_e = history === null || history === void 0 ? void 0 : history.books) === null || _e === void 0 ? void 0 : _e.length)
                    ? history.books.map(({ id, title, rating, issueYear, authors, images }) => {
                        var _a;
                        return ({
                            id,
                            title,
                            rating,
                            issueYear,
                            authors,
                            image: ((_a = images === null || images === void 0 ? void 0 : images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        });
                    })
                    : null,
            },
        };
        return user;
    };
    plugin.controllers.user.findOne = async (ctx) => {
        var _a, _b, _c, _d, _e;
        ctx.query = { ...ctx.query, populate: "deep" };
        if (ctx.params.id == ctx.state.user.id) {
            const response = await strapi.entityService.findOne("plugin::users-permissions.user", ctx.params.id, {
                populate: "deep",
            });
            const { id, username, email, confirmed, blocked, createdAt, updatedAt, firstName, lastName, phone, role, comments, avatar, booking, delivery, history, } = response;
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
                booking: {
                    id: (booking === null || booking === void 0 ? void 0 : booking.id) || null,
                    order: (booking === null || booking === void 0 ? void 0 : booking.order) || null,
                    dateOrder: (booking === null || booking === void 0 ? void 0 : booking.dateOrder) || null,
                    book: (booking === null || booking === void 0 ? void 0 : booking.book)
                        ? {
                            id: booking.book.id,
                            title: booking.book.title,
                            rating: booking.book.rating,
                            issueYear: booking.book.issueYear,
                            authors: booking.book.authors,
                            image: ((_b = (_a = booking.book.images) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        }
                        : null,
                },
                delivery: {
                    id: (delivery === null || delivery === void 0 ? void 0 : delivery.id) || null,
                    handed: (delivery === null || delivery === void 0 ? void 0 : delivery.handed) || null,
                    dateHandedFrom: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedFrom) || null,
                    dateHandedTo: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedTo) || null,
                    book: (delivery === null || delivery === void 0 ? void 0 : delivery.book)
                        ? {
                            id: delivery.book.id,
                            title: delivery.book.title,
                            rating: delivery.book.rating,
                            issueYear: delivery.book.issueYear,
                            authors: delivery.book.authors,
                            image: ((_d = (_c = delivery.book.images) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        }
                        : null,
                },
                history: {
                    id: (history === null || history === void 0 ? void 0 : history.id) || null,
                    books: ((_e = history === null || history === void 0 ? void 0 : history.books) === null || _e === void 0 ? void 0 : _e.length)
                        ? history.books.map(({ id, title, rating, issueYear, authors, images }) => ({
                            id,
                            title,
                            rating,
                            issueYear,
                            authors,
                            image: (images === null || images === void 0 ? void 0 : images.map(({ url }) => url)[0]) || null,
                        }))
                        : null,
                },
            };
            return user;
        }
        else {
            return Error("Error permisson");
        }
    };
    plugin.controllers.user.update = async (ctx) => {
        var _a, _b, _c, _d, _e;
        ctx.query = { ...ctx.query, populate: "deep" };
        if (ctx.params.id == ctx.state.user.id) {
            const response = await strapi.entityService.update("plugin::users-permissions.user", ctx.params.id, {
                data: ctx.request.body,
                populate: "deep",
            });
            const { id, username, email, confirmed, blocked, createdAt, updatedAt, firstName, lastName, phone, role, comments, avatar, booking, delivery, history, } = response;
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
                booking: {
                    id: (booking === null || booking === void 0 ? void 0 : booking.id) || null,
                    order: (booking === null || booking === void 0 ? void 0 : booking.order) || null,
                    dateOrder: (booking === null || booking === void 0 ? void 0 : booking.dateOrder) || null,
                    book: (booking === null || booking === void 0 ? void 0 : booking.book)
                        ? {
                            id: booking.book.id,
                            title: booking.book.title,
                            rating: booking.book.rating,
                            issueYear: booking.book.issueYear,
                            authors: booking.book.authors,
                            image: ((_b = (_a = booking.book.images) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        }
                        : null,
                },
                delivery: {
                    id: (delivery === null || delivery === void 0 ? void 0 : delivery.id) || null,
                    handed: (delivery === null || delivery === void 0 ? void 0 : delivery.handed) || null,
                    dateHandedFrom: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedFrom) || null,
                    dateHandedTo: (delivery === null || delivery === void 0 ? void 0 : delivery.dateHandedTo) || null,
                    book: (delivery === null || delivery === void 0 ? void 0 : delivery.book)
                        ? {
                            id: delivery.book.id,
                            title: delivery.book.title,
                            rating: delivery.book.rating,
                            issueYear: delivery.book.issueYear,
                            authors: delivery.book.authors,
                            image: ((_d = (_c = delivery.book.images) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.map(({ attributes }) => ({
                                url: attributes.url,
                            }))[0]) || null,
                        }
                        : null,
                },
                history: {
                    id: (history === null || history === void 0 ? void 0 : history.id) || null,
                    books: ((_e = history === null || history === void 0 ? void 0 : history.books) === null || _e === void 0 ? void 0 : _e.length)
                        ? history.books.map(({ id, title, rating, issueYear, authors, images }) => {
                            var _a;
                            return ({
                                id,
                                title,
                                rating,
                                issueYear,
                                authors,
                                image: ((_a = images === null || images === void 0 ? void 0 : images.data) === null || _a === void 0 ? void 0 : _a.map(({ attributes }) => ({
                                    url: attributes.url,
                                }))[0]) || null,
                            });
                        })
                        : null,
                },
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

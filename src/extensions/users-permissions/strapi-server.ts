export default (plugin) => {
  plugin.controllers.user.me = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep" };
    const response = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      {
        populate: "deep",
      }
    );
    const {
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
      role,
      comments,
      avatar,
      booking,
      delivery,
      history,
    } = response;
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
      comments:
        comments?.map(({ id, rating, text, book }) => ({
          id,
          rating,
          text,
          bookId: book.id,
        })) || null,
      avatar: avatar.url,
      booking: {
        id: booking?.id || null,
        order: booking?.order || null,
        dateOrder: booking?.dateOrder || null,
        book: booking?.book
          ? {
              id: booking.book.id,
              title: booking.book.title,
              rating: booking.book.rating,
              issueYear: booking.book.issueYear,
              authors: booking.book.authors,
              image:
                booking.book.images?.data?.map(({ attributes }) => ({
                  url: attributes.url,
                }))[0] || null,
            }
          : null,
      },
      delivery: {
        id: delivery?.id || null,
        handed: delivery?.handed || null,
        dateHandedFrom: delivery?.dateHandedFrom || null,
        dateHandedTo: delivery?.dateHandedTo || null,
        book: delivery?.book
          ? {
              id: delivery.book.id,
              title: delivery.book.title,
              rating: delivery.book.rating,
              issueYear: delivery.book.issueYear,
              authors: delivery.book.authors,
              image:
                delivery.book.images?.data?.map(({ attributes }) => ({
                  url: attributes.url,
                }))[0] || null,
            }
          : null,
      },
      history: {
        id: history?.id || null,
        books: history?.books?.length
          ? history.books.map(
              ({ id, title, rating, issueYear, authors, images }) => ({
                id,
                title,
                rating,
                issueYear,
                authors,
                image:
                  images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              })
            )
          : null,
      },
    };
    return user;
  };

  plugin.controllers.user.findOne = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep" };
    if (ctx.params.id == ctx.state.user.id) {
      const response = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        ctx.params.id,
        {
          populate: "deep",
        }
      );
      const {
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
        role,
        comments,
        avatar,
        booking,
        delivery,
        history,
      } = response;
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
        comments:
          comments?.map(({ id, rating, text, book }) => ({
            id,
            rating,
            text,
            bookId: book.id,
          })) || null,
        avatar: avatar.url,
        booking: {
          id: booking?.id || null,
          order: booking?.order || null,
          dateOrder: booking?.dateOrder || null,
          book: booking?.book
            ? {
                id: booking.book.id,
                title: booking.book.title,
                rating: booking.book.rating,
                issueYear: booking.book.issueYear,
                authors: booking.book.authors,
                image:
                  booking.book.images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              }
            : null,
        },
        delivery: {
          id: delivery?.id || null,
          handed: delivery?.handed || null,
          dateHandedFrom: delivery?.dateHandedFrom || null,
          dateHandedTo: delivery?.dateHandedTo || null,
          book: delivery?.book
            ? {
                id: delivery.book.id,
                title: delivery.book.title,
                rating: delivery.book.rating,
                issueYear: delivery.book.issueYear,
                authors: delivery.book.authors,
                image:
                  delivery.book.images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              }
            : null,
        },
        history: {
          id: history?.id || null,
          books: history?.books?.length
            ? history.books.map(
                ({ id, title, rating, issueYear, authors, images }) => ({
                  id,
                  title,
                  rating,
                  issueYear,
                  authors,
                  image: images?.map(({ url }) => url)[0] || null,
                })
              )
            : null,
        },
      };
      return user;
    } else {
      return Error("Error permisson");
    }
  };

  plugin.controllers.user.update = async (ctx) => {
    ctx.query = { ...ctx.query, populate: "deep" };
    if (ctx.params.id == ctx.state.user.id) {
      const response = await strapi.entityService.update(
        "plugin::users-permissions.user",
        ctx.params.id,
        {
          data: ctx.request.body,
          populate: "deep",
        }
      );
      const {
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
        role,
        comments,
        avatar,
        booking,
        delivery,
        history,
      } = response;
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
        comments:
          comments?.map(({ id, rating, text, book }) => ({
            id,
            rating,
            text,
            bookId: book.id,
          })) || null,
        avatar: avatar.url,
        booking: {
          id: booking?.id || null,
          order: booking?.order || null,
          dateOrder: booking?.dateOrder || null,
          book: booking?.book
            ? {
                id: booking.book.id,
                title: booking.book.title,
                rating: booking.book.rating,
                issueYear: booking.book.issueYear,
                authors: booking.book.authors,
                image:
                  booking.book.images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              }
            : null,
        },
        delivery: {
          id: delivery?.id || null,
          handed: delivery?.handed || null,
          dateHandedFrom: delivery?.dateHandedFrom || null,
          dateHandedTo: delivery?.dateHandedTo || null,
          book: delivery?.book
            ? {
                id: delivery.book.id,
                title: delivery.book.title,
                rating: delivery.book.rating,
                issueYear: delivery.book.issueYear,
                authors: delivery.book.authors,
                image:
                  delivery.book.images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              }
            : null,
        },
        history: {
          id: history?.id || null,
          books: history?.books?.length
            ? history.books.map(
                ({ id, title, rating, issueYear, authors, images }) => ({
                  id,
                  title,
                  rating,
                  issueYear,
                  authors,
                  image:
                    images?.data?.map(({ attributes }) => ({
                      url: attributes.url,
                    }))[0] || null,
                })
              )
            : null,
        },
      };
      return user;
    } else {
      return Error("Error permisson");
    }
  };

  // plugin.controllers.auth.forgotPassword = async (ctx) => {
  //   ctx.query = { ...ctx.query, populate: "deep" };
  //   console.log("strapi.entityService", ctx.request.body);

  //   const response = await strapi.entityService.findMany(
  //     "plugin::users-permissions.user",
  //     {
  //       filters: {
  //         email: ctx.request.body.email,
  //       },
  //     }
  //   );
  // if (response[0]) {
  //   console.log(response[0], "response");

  //   await strapi
  //     .plugin("email")
  //     .service("email")
  //     .send({
  //       to: ctx.request.body.email,
  //       from: "Administration <valadzkoaliaksei@gmail.com>",
  //       subject: "Reset password",
  //       text: "Reset password",
  //       html: `<p>We heard that you lost your password. Sorry about that!</p>

  //     <p>But don’t worry! You can use the following link to reset your password:</p>
  //     <p><%= URL %>?code=<%= TOKEN %></p>`,
  //     });
  // }
  //   return response?.[0] || "not found";
  // };

  // plugin.policies[newPolicy] = (ctx) => {};

  // plugin.routes["content-api"].routes.push({
  //   method: "GET",
  //   path: "/route-path",
  //   handler: "controller.action",
  // });
  return plugin;
};

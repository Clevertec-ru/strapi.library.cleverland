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
      bookings,
      deliveries,
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
      bookings:
        bookings?.map(({ id, order, dateOrder, book }) => ({
          id,
          order,
          dateOrder,
          book: {
            id: book.id,
            title: book.title,
            rating: book.rating,
            issueYear: book.issueYear,
            authors: book.authors,
            image:
              book.images?.data?.map(({ attributes }) => ({
                url: attributes.url,
              }))[0] || null,
          },
        })) || null,
      deliveries:
        deliveries?.map(
          ({ id, handed, dateHandedFrom, dateHandedTo, book }) => ({
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
              image:
                book.images?.data?.map(({ attributes }) => ({
                  url: attributes.url,
                }))[0] || null,
            },
          })
        ) || null,
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
        bookings,
        deliveries,
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
        bookings:
          bookings?.map(({ id, order, dateOrder, book }) => ({
            id,
            order,
            dateOrder,
            book: {
              id: book.id,
              title: book.title,
              rating: book.rating,
              issueYear: book.issueYear,
              authors: book.authors,
              image:
                book.images?.data?.map(({ attributes }) => ({
                  url: attributes.url,
                }))[0] || null,
            },
          })) || null,
        deliveries:
          deliveries?.map(
            ({ id, handed, dateHandedFrom, dateHandedTo, book }) => ({
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
                image:
                  book.images?.data?.map(({ attributes }) => ({
                    url: attributes.url,
                  }))[0] || null,
              },
            })
          ) || null,
      };
      return user;
    } else {
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

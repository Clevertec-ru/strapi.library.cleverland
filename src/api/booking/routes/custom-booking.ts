export default {
  routes: [
    {
      // Path defined with a URL parameter
      method: "DELETE",
      path: "/bookings/delete/old",
      handler: "booking.deleteOld",
      config: {
        auth: false,
      },
    },
  ],
};

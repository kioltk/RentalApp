import { api } from "../../../src/api/api";

describe("ApiClient with Staging API", () => {
  it("fetches locations", async () => {
    const locations = await api.locations.getLocations();
    expect(locations).toHaveLength(3);
  });

  it("fetches offers", async () => {
    const offers = await api.offers.getOffers(1);
    expect(offers).toHaveLength(20);
  });

  it("creates a reservation", async () => {
    const location = (await api.locations.getLocations())[0];
    const offer = (await api.offers.getOffers(location.id))[0];
    const reservation = await api.reservations.createReservation({
      offerUId: offer.offerUId,
      customer: {
        name: "John",
        surname: "Doe",
      },
    });
    expect(reservation.confirmationNumber).toBeDefined();
  });
});

import Ride from "../models/ride";

export const rideService = {
  calculateDrivers: (distance: number) => {
    const drivers = [
      { id: 1, name: "Homer Simpson", ratePerKm: 2.5, description: "Motorista simpático" },
      { id: 2, name: "Dominic Toretto", ratePerKm: 5, description: "Velocidade e adrenalina" },
      { id: 3, name: "James Bond", ratePerKm: 10, description: "Classe e sofisticação" },
    ];

    return drivers.map((driver) => ({
      ...driver,
      value: distance * driver.ratePerKm,
    })).sort((a, b) => a.value - b.value); // Ordenar do mais barato para o mais caro
  },

  saveRide: async (rideData: {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    driver_id: number;
    driver_name: string;
    value: number;
  }) => {
    const ride = await Ride.create(rideData);
    return ride;
  },
};

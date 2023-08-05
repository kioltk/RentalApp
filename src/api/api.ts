import axios, { AxiosInstance } from "axios";
import { Location, Offer, Reservation, ReservationRequest } from "./types";
import Config from "react-native-config";

class OfferClient {
  constructor(private apiClient: ApiClient) {}

  getOffers = (locationId: number) =>
    this.apiClient.get<Offer[]>(`/api/v1/Availability/GetOffers`, {
      params: {
        LocationId: locationId,
      },
    });
}

class LocationClient {
  constructor(private apiClient: ApiClient) {}

  getLocations = () =>
    this.apiClient.get<Location[]>(`/api/v1/Locations/Locations`);
}

class ReservationClient {
  constructor(private apiClient: ApiClient) {}

  createReservation = (reservationRequest: ReservationRequest) =>
    this.apiClient.post<Reservation>(
      `/api/v1/Reservations/CreateReservation`,
      reservationRequest
    );
}

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(apiUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: apiUrl,
    });
  }

  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }
}

class Api {
  offers: OfferClient;
  locations: LocationClient;
  reservations: ReservationClient;

  constructor(client: ApiClient) {
    this.offers = new OfferClient(client);
    this.locations = new LocationClient(client);
    this.reservations = new ReservationClient(client);
  }
}

const defaultApiClient = new ApiClient(Config.API_URL!);
const api = new Api(defaultApiClient);

export { ApiClient, Api, api };

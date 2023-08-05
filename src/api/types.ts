export interface Customer {
  name?: string | null;
  surname?: string | null;
}

export interface Location {
  id: number;
  country?: string | null;
  city?: string | null;
  name?: string | null;
}

export interface Price {
  amount: number;
  currency?: string | null;
}

export interface Vehicle {
  modelName?: string | null;
  sipp?: string | null;
  imageLink?: string | null;
}

export interface Vendor {
  name?: string | null;
  imageLink?: string | null;
}

export interface Offer {
  offerUId?: string | null;
  vehicle: Vehicle;
  price: Price;
  vendor: Vendor;
}

export interface Reservation {
  confirmationNumber?: string | null;
}

export interface ReservationRequest {
  offerUId?: string | null;
  customer: Customer;
}

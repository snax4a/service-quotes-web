export declare type UUID = string;
export declare type Role = "Customer" | "Employee" | "Manager";

export declare interface Customer {
  id: UUID;
  accountId: UUID;
  companyName: string;
  vatNumber: string;
}

export declare interface Address {
  id: UUID;
  street: string;
  city: string;
  zipCode: string;
  phoneNumber: string;
}

export declare interface ServiceRequest {
  id: UUID;
  customerId: UUID;
  addressId: UUID;
  customer: Customer | null;
  address: Address | null;
  title: string;
  description: string;
  status: string;
  plannedExecutionDate: string | null;
  completionDate: string | null;
  created: string;
}

export declare interface Quote {
  id: UUID;
  referenceNumber: number;
  serviceRequest: ServiceRequest;
  total: number;
  status: string;
  created: string;
}

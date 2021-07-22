export declare type UUID = string;
export declare type Role = "Customer" | "Employee" | "Manager";
export declare type Status =
  | "New"
  | "Assigned"
  | "InProgress"
  | "Completed"
  | "Cancelled"
  | "Confirmed"
  | "Rejected"
  | "Pending"
  | "Errored"
  | "Paid"
  | "Unpaid";

export declare interface Specialization {
  id: UUID;
  name: string;
}

export declare interface Employee {
  id: UUID;
  accountId: UUID;
  firstName: string;
  lastName: string;
  image: string;
  specializations?: Specialization[];
}

export declare interface Customer {
  id: UUID;
  accountId: UUID;
  companyName: string;
  vatNumber: string;
  image: string;
  customerAddresses?: CustomerAddress[];
}

export declare interface CustomerAddress {
  name: string;
  address: Address;
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
  customerAddress: CustomerAddress | null;
  title: string;
  description: string;
  status: Status;
  plannedExecutionDate: string | null;
  completionDate: string | null;
  created: string;
  assignedEmployees?: Employee[];
}

export declare interface Quote {
  id: UUID;
  referenceNumber: number;
  serviceRequest: ServiceRequest;
  total: number;
  status: Status;
  created: string;
}

export declare interface Material {
  id: UUID;
  serviceRequestId: UUID;
  description: string;
  quantity: number;
  unitPrice: number;
}

export declare interface JobValuation {
  id: UUID;
  workType: string;
  laborHours: string;
  hourlyRate: number;
}

export declare interface ServiceRequestJobValuation {
  serviceRequestId: UUID;
  date: Date;
  employee: Employee;
  jobValuation: JobValuation;
}

export declare interface SelectOption {
  label: string;
  value: string;
}

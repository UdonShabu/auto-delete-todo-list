export type User = {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  age: number;
  hair: { color: string };
  address: { postalCode: string };
  company: { department: string };
};

export type DepartmentSummary = {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
};

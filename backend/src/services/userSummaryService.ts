import axios from "axios";
import { DepartmentSummary, User } from "../types/user.types";

export async function getGroupedUserSummary(): Promise<
  Record<string, DepartmentSummary>
> {
  const { data } = await axios.get<{ users: User[] }>(
    "https://dummyjson.com/users"
  );
  const users = data.users;

  const grouped: Record<
    string,
    DepartmentSummary & { minAge: number; maxAge: number }
  > = {};

  for (const user of users) {
    const dept = user.company.department;

    if (!grouped[dept]) {
      grouped[dept] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
        minAge: user.age,
        maxAge: user.age,
      };
    }

    const summary = grouped[dept];

    // Gender count
    user.gender === "male" ? summary.male++ : summary.female++;

    // Hair color count
    summary.hair[user.hair.color] = (summary.hair[user.hair.color] || 0) + 1;

    // Address user
    const fullName = `${user.firstName}${user.lastName}`;
    summary.addressUser[fullName] = user.address.postalCode;

    // Min/max age
    summary.minAge = Math.min(summary.minAge, user.age);
    summary.maxAge = Math.max(summary.maxAge, user.age);
  }

  // Finalize ageRange and remove minAge/maxAge
  const response: Record<string, DepartmentSummary> = {};

  for (const dept in grouped) {
    const { minAge, maxAge, ...rest } = grouped[dept];
    response[dept] = {
      ...rest,
      ageRange: `${minAge}-${maxAge}`,
    };
  }

  return response;
}

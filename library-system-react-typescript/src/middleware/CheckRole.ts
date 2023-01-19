import { Role } from "../models/Role";

export const isAllowed = (roles: Role[], role: string) => {
  let canProceed: Role | undefined;

  canProceed = roles.find(({ name }) => name === role);

  return canProceed ? true : false;
};

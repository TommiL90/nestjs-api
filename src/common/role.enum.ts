/* eslint-disable no-unused-vars */
export enum UserRole {
  User = 'user',
  Admin = 'admin',
}

export type UserRoleType = keyof typeof UserRole

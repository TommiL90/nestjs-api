/* eslint-disable no-unused-vars */
export enum UserRole {
  User = 'User',
  Admin = 'Admin',
  Employee = 'Employee',
}

export type UserRoleType = keyof typeof UserRole

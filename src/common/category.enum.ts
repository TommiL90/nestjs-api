/* eslint-disable no-unused-vars */
export enum CategoryName {
  Burgers = 'Burgers',
  Dessert = 'Dessert',
  Sides = 'Sides',
  Beverage = 'Beverage',
  Combos = 'Combos',
}

export type CategoryNameType = keyof typeof CategoryName

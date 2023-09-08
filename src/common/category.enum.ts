/* eslint-disable no-unused-vars */
export enum CategoryName {
  DogAdultFood = 'Dog Adult Food',
  DogPuppyFood = 'Dog Puppy Food',
  DogToys = 'Dog Toys',
  DogAccessories = 'Dog Accessories',
  DogGroomingProducts = 'Dog Grooming Products',
  CatAdultFood = 'Cat Adult Food',
  CatKittenFood = 'Cat Kitten Food',
  CatToys = 'Cat Toys',
  CatAccessories = 'Cat Accessories',
  CatGroomingProducts = 'Cat Grooming Products',
}

export type CategoryNameType = keyof typeof CategoryName

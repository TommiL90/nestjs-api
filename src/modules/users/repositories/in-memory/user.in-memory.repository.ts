// import { users } from 'src/database/db';
// import { CreateUserDto } from '../../dto/create-user.dto';
// import { UpdateUserDto } from '../../dto/update-user.dto';
// import { User } from '../../entities/user.entity';
// import { UserRepository } from '../user.repositry';

// // Polimorfismo
// export class UserInMemoryRepository implements UserRepository {
//   create(data: CreateUserDto): User | Promise<User> {
//     const newUser = new User();
//     Object.assign(newUser, { ...data });
//     users.push(newUser);
//     return newUser;
//   }
//   findAll(): User[] | Promise<User[]> {
//     return users;
//   }
//   findOne(id: string): User | Promise<User> {
//     const user = users.find((user) => user.id === id);
//     return user;
//   }
//   update(id: string, data: UpdateUserDto): User | Promise<User> {
//     const userIndex = users.findIndex((user) => user.id === id);
//     users[userIndex] = { ...users[userIndex], ...data };
//     return users[userIndex];
//   }

//   delete(id: string): void | Promise<void> {
//     const userIndex = users.findIndex((user) => user.id === id);
//     users.splice(userIndex, 1);
//   }
// }

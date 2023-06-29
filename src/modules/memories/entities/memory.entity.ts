import { randomUUID } from 'crypto';

export class Memory {
  readonly id: string;
  title: string;
  description: string;
  coverImage: string | null;
  userId: string;
  createdAt: Date;

  constructor() {
    this.id = randomUUID();
    this.createdAt = new Date();
  }
}

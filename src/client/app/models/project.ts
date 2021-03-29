import { Task } from './task';

export class Project {
  _id?: string;
  name: string;
  tasks: Task[];
}

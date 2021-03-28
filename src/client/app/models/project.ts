import { Task } from './task';

export class Project {
  id?: string;
  name: string;
  tasks: Task[];
}

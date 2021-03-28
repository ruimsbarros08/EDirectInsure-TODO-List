import {Project} from './project';

export class Task {
  id: string;
  description: string;
  createdAt: Date;
  finishedAt?: Date;
  project?: Project;
}

import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeacherInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TeacherGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}

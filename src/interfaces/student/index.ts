import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StudentInterface {
  id?: string;
  name: string;
  attendance?: boolean;
  health_record?: string;
  academic_record?: string;
  behavior_record?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface StudentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  health_record?: string;
  academic_record?: string;
  behavior_record?: string;
  user_id?: string;
}

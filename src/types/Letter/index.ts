import { Branch } from "../Branches";
import { Department } from "../Department";

export interface Letter {
  id: number;
  branch_id: number;
  department_id: number;
  contract_id: number;
  created_at: string;
  updated_at: string;
  letter_form_id: number;
  branch: Branch;
  department: Department;
  form: LetterForm;
}

export interface LetterForm {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

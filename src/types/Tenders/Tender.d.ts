import { DB_Boolean } from "../";

export type TenderFormOptions = {};

export type Tender = {
  id: number;
  step_num: 2;
  is_done: DB_Boolean;
  created_at: string;
  updated_at: string;
  // deleted_at: null;
  tenderdata?: TenderData;
  tender_tasks?: [];
  tender_files?: [];
  tender_amounts?: [];
};

export type TenderData = {
  id: number;
  tender_id: number;
  tender_type_id: number;
  department_id: number;
  code_reference: number;
  code_tender: number;
  name: string;
  strat_date: string;
  end_date: string;
  organization_id: number;
  price: number;
  type_id: number;
  // "activity": null,
  period: number;
  apply_id: number;
  created_at: string;
  updated_at: string;
  // "deleted_at": null
};

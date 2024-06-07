import { Media } from "../Media";

export type DocumentationFileType = {
  id: number;
  library_folder_id: number;
  name: string;
  reference_number: string;
  end_date: string;
  notify_date: string;
  type: number;
  created_at: string;
  updated_at: string;
  media: Media[];
};

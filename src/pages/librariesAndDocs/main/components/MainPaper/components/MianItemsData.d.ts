import { DocumentationFileType } from "../../../../../../types/librariesAndDocs/DocumentationFile";
import { Media } from "./../../../../../../types/Media";

export type LibrariesMainPageItemType = {
  id: number | string;
  name: string;
  type: number;
  created_at: string;
  updated_at: string;
  files_count: number;
  is_deletable: number;
  media: Media[] | { original_url: string; name?: string }[];
  employees?: { id: number; name: string }[];
  files?: DocumentationFileType[];
};

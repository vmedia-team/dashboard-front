import { Media } from "./../../../../../../types/Media";

export type LibrariesMainPageItemType = {
  id: number | string;
  name: string;
  type: number;
  created_at: string;
  updated_at: string;
  media: Media[] | { original_url: string; name?: string }[];
  employees?: number[];
};

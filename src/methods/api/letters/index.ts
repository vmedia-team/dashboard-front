import axios from "axios";
import { Api } from "../../../constants";
import { Letter } from "../../../types/Letter";

export interface LettersRoot {
  letters: Letter[];
  search: never[];
  message: string;
  status: boolean;
}
export const getLetters = async () => {
  const {
    data: { letters },
  } = await axios.get<LettersRoot>(Api("employee/letter"));

  return letters;
};

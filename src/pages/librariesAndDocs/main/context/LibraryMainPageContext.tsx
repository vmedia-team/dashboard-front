import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { LibrariesMainPageItemType } from "../components/MainPaper/components/MianItemsData";
import { Api } from "../../../../constants";
import { Value } from "sass";

// * create context
export const LibraryMainPageContext = createContext<LibraryMainPageContextType>(
  {
    mainPageItems: [],
    addNewDirectory: (directory) => {},
    editExistDirectory: (directory) => {},
    handleSearch: (params) => {},
    deleteDirectory: (directory) => {},
    directoriesNames: [],
  }
);

export function LibraryMainPageContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  const [mainPageItems, setMainPageItems] = useState<
    LibrariesMainPageItemType[]
  >([]);
  const [directoriesNames, setDirectoriesNames] = useState<
    { value: number; label: string }[]
  >([]);

  useEffect(getFoldersData, []);
  // TODO::declare and define our helper methods
  function getFoldersData(params?: string) {
    axios
      .get<{ folders: LibrariesMainPageItemType[] }>(
        Api(
          `employee/library/folder${
            params && params?.length > 0 ? "?" + params : ""
          }`
        )
      )
      .then((response) => {
        if (!params) {
          let namesSet = new Set<string>();
          let names = response.data.folders
            ?.filter((ele) => {
              if (!namesSet.has(ele.name)) {
                namesSet.add(ele.name);
                return true;
              }
              return false;
            })
            .map((ele) => ({ label: ele.name, value: +ele.id }));
          names.unshift({ label: "الكل", value: -1 });
          setDirectoriesNames(names);
        }
        setMainPageItems(response.data.folders);
      })
      .catch((err) => {
        console.log("Error in fetch directories data::", err);
      });
  }

  function addNewDirectory(directory: LibrariesMainPageItemType) {
    setMainPageItems((prev) => [...prev, directory]);
  }

  function editExistDirectory(directory: LibrariesMainPageItemType) {
    let arr = mainPageItems.map((ele) => {
      if (ele.id == directory.id) return directory;
      return ele;
    });
    setMainPageItems(arr);
  }

  function deleteDirectory(directory: LibrariesMainPageItemType) {
    let arr = (mainPageItems ?? []).filter((ele) => ele.id != directory.id);
    setMainPageItems(arr);
  }

  function handleSearch(params: string) {
    getFoldersData(params);
  }

  return (
    <LibraryMainPageContext.Provider
      value={{
        mainPageItems,
        addNewDirectory,
        editExistDirectory,
        handleSearch,
        deleteDirectory,
        directoriesNames,
      }}
    >
      {children}
    </LibraryMainPageContext.Provider>
  );
}

// * declare and define needed types
type PropsType = {
  children: React.ReactNode;
};

type LibraryMainPageContextType = {
  mainPageItems: LibrariesMainPageItemType[];
  addNewDirectory(directory: LibrariesMainPageItemType): void;
  editExistDirectory(directory: LibrariesMainPageItemType): void;
  handleSearch(params: string): void;
  deleteDirectory(directory: LibrariesMainPageItemType): void;
  directoriesNames: {
    value: number;
    label: string;
  }[];
};

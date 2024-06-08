import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { LibrariesMainPageItemType } from "../components/MainPaper/components/MianItemsData";
import { Api } from "../../../../constants";

// * create context
export const LibraryMainPageContext = createContext<LibraryMainPageContextType>(
  {
    mainPageItems: [],
    addNewDirectory: (directory) => {},
    editExistDirectory: (directory) => {},
    handleSearch: (params) => {},
  }
);

export function LibraryMainPageContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  const [mainPageItems, setMainPageItems] = useState<
    LibrariesMainPageItemType[]
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
};

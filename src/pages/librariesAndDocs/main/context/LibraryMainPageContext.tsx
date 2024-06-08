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
    selectedDirectoriedIds: [],
    toggleDirectoryIdFormSelectedDirectories: (id) => {},
    checkedDirectoryIdInSelectedDirectories: (id) => true,
    searchInfiles: false,
    handleSetSearchInfiles: (searchState) => {},
  }
);

export function LibraryMainPageContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  const [searchInfiles, setSearchInfiles] = useState(false);
  const [mainPageItems, setMainPageItems] = useState<
    LibrariesMainPageItemType[]
  >([]);
  const [directoriesNames, setDirectoriesNames] = useState<
    { value: number; label: string }[]
  >([]);
  const [selectedDirectoriedIds, setSelectedDirectoriedIds] = useState<
    number[]
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
        console.log("responseresponse", response);
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

  function checkedDirectoryIdInSelectedDirectories(id: number) {
    return selectedDirectoriedIds.indexOf(id) != -1;
  }

  function toggleDirectoryIdFormSelectedDirectories(id: number) {
    let exist = checkedDirectoryIdInSelectedDirectories(id);
    console.log(id, exist);
    if (exist) {
      setSelectedDirectoriedIds((prev) => prev.filter((ele) => ele != id));
    } else {
      setSelectedDirectoriedIds((prev) => [...prev, id]);
    }
  }

  function handleSetSearchInfiles(searchState: boolean) {
    setSearchInfiles(searchState);
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
        selectedDirectoriedIds,
        toggleDirectoryIdFormSelectedDirectories,
        checkedDirectoryIdInSelectedDirectories,
        searchInfiles,
        handleSetSearchInfiles,
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
  selectedDirectoriedIds: number[];
  toggleDirectoryIdFormSelectedDirectories(id: number): void;
  checkedDirectoryIdInSelectedDirectories(id: number): boolean;
  searchInfiles: boolean;
  handleSetSearchInfiles(searchState: boolean): void;
};

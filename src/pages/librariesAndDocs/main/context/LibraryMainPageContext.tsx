import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { LibrariesMainPageItemType } from "../components/MainPaper/components/MianItemsData";
import { Api } from "../../../../constants";
import { Value } from "sass";
import { DocumentationFileType } from "../../../../types/librariesAndDocs/DocumentationFile";

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
    selectedResultFile: undefined,
    handleSetSelectedResultFile: (file) => {},
    searchState: false,
    SelectAllDirectories: () => {},
    openEditDialog: false,
    handleSetOpenEditDialog: (open) => {},
    selectedDirectoryToEdit: undefined,
    handleSetSelectedDirectoryToEdit: (directory) => {},
    deleteMultiDirectories: () => {},
    openDeleteDialog: false,
    handleSetOpenDeleteDialog: (open) => {},
  }
);

export function LibraryMainPageContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  const [searchInfiles, setSearchInfiles] = useState(false); //to know search on type or in file_name | refrance number
  const [searchState, setSearchState] = useState(false); //to control search state
  const [openEditDialog, setOpenEditDialog] = useState(false); //to control edit dialog.
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); //to control delete dialog (aggreguation delete dialog).
  const [selectedDirectoryToEdit, setSelectedDirectoryToEdit] = useState<
    LibrariesMainPageItemType | undefined
  >(); //clicked (selected) clicked which will update
  const [selectedResultFile, setSelectedResultFile] =
    useState<DocumentationFileType>(); //file on search result which you clicked
  const [mainPageItems, setMainPageItems] = useState<
    LibrariesMainPageItemType[]
  >([]); //data of directories from back-end
  const [directoriesNames, setDirectoriesNames] = useState<
    { value: number; label: string }[]
  >([]); //names of directories ,i use in search field type in search bar
  const [selectedDirectoriedIds, setSelectedDirectoriedIds] = useState<
    number[]
  >([]); //to control and handle selected directories

  // * handle when component loaded.
  useEffect(getFoldersData, []);

  // TODO::declare and define our helper methods
  /**
   * get directories data from back-end
   * @param params search parameters
   */
  function getFoldersData(params?: string) {
    setSearchState(true);
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
      })
      .finally(() => setSearchState(false));
  }

  /**
   * add new directory to directories
   * @param directory created directory
   */
  function addNewDirectory(directory: LibrariesMainPageItemType) {
    setMainPageItems((prev) => [...prev, directory]);
  }

  /**
   * edit existing directory
   * @param directory directory after edit
   */
  function editExistDirectory(directory: LibrariesMainPageItemType) {
    let arr = mainPageItems.map((ele) => {
      if (ele.id == directory.id) return directory;
      return ele;
    });
    setMainPageItems(arr);
  }

  /**
   * delete directory
   * @param directory directory which will delete
   */
  function deleteDirectory(directory: LibrariesMainPageItemType) {
    let arr = (mainPageItems ?? []).filter((ele) => ele.id != directory.id);
    setMainPageItems(arr);
  }

  /**
   * removes all selected directories
   */
  function deleteMultiDirectories() {
    let arr = (mainPageItems ?? []).filter(
      (ele) => selectedDirectoriedIds.indexOf(+ele.id) == -1
    );
    setMainPageItems(arr);
    setSelectedDirectoriedIds([]);
  }

  /**
   * handle search in directories
   * @param params search parameters
   */
  function handleSearch(params: string) {
    getFoldersData(params);
  }

  /**
   * check incomming id in selected directories or not
   * @param id directory id
   * @returns boolean
   */
  function checkedDirectoryIdInSelectedDirectories(id: number) {
    return selectedDirectoriedIds.indexOf(id) != -1;
  }

  /**
   * toggle directory id in selected directories
   * @param id directory id
   */
  function toggleDirectoryIdFormSelectedDirectories(id: number) {
    let exist = checkedDirectoryIdInSelectedDirectories(id);

    if (exist) {
      if (selectedDirectoriedIds?.length > 1) {
        let selectedId =
          selectedDirectoriedIds[0] != id
            ? selectedDirectoriedIds[0]
            : selectedDirectoriedIds[1];
        // first one may be edit
        let directory = mainPageItems.find((ele) => ele.id == selectedId);

        setSelectedDirectoryToEdit(directory);
      } else {
        setSelectedDirectoryToEdit(undefined);
      }

      setSelectedDirectoriedIds((prev) => prev.filter((ele) => ele != id));
    } else {
      setSelectedDirectoriedIds((prev) => [...prev, id]);

      // first one may be edit
      let directory = mainPageItems.find((ele) => ele.id == id);
      setSelectedDirectoryToEdit(directory);
    }
  }

  /**
   * handle click on select all button
   * @returns
   */
  function SelectAllDirectories() {
    if (mainPageItems.length == selectedDirectoriedIds.length) {
      setSelectedDirectoriedIds([]);
      return;
    }
    let ids = mainPageItems.map((ele) => +ele.id);
    setSelectedDirectoriedIds(ids);
  }

  /**
   * set value of search state which control search state
   * @param searchState boolean
   */
  function handleSetSearchInfiles(searchState: boolean) {
    setSearchInfiles(searchState);
  }

  /**
   * set file which selected to preview on search result
   * @param file
   */
  function handleSetSelectedResultFile(
    file: DocumentationFileType | undefined
  ) {
    setSelectedResultFile(file);
  }

  /**
   * control open/close edit directory dialog
   * @param open boolean
   */
  function handleSetOpenEditDialog(open: boolean) {
    setOpenEditDialog(open);
  }

  /**
   * set clicked(selected) directory which will update
   * @param directory LibrariesMainPageItemType | undefined
   */
  function handleSetSelectedDirectoryToEdit(
    directory: LibrariesMainPageItemType | undefined
  ) {
    setSelectedDirectoryToEdit(directory);
  }

  /**
   * handle and control open confirm delete dialog
   * @param open boolean
   */
  function handleSetOpenDeleteDialog(open: boolean) {
    setOpenDeleteDialog(open);
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
        selectedResultFile,
        handleSetSelectedResultFile,
        searchState,
        SelectAllDirectories,
        openEditDialog,
        handleSetOpenEditDialog,
        selectedDirectoryToEdit,
        handleSetSelectedDirectoryToEdit,
        deleteMultiDirectories,
        openDeleteDialog,
        handleSetOpenDeleteDialog,
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
  selectedResultFile: DocumentationFileType | undefined;
  handleSetSelectedResultFile(file: DocumentationFileType | undefined): void;
  searchState: boolean;
  SelectAllDirectories(): void;
  openEditDialog: boolean;
  handleSetOpenEditDialog(open: boolean): void;
  selectedDirectoryToEdit: LibrariesMainPageItemType | undefined;
  handleSetSelectedDirectoryToEdit(
    directory: LibrariesMainPageItemType | undefined
  ): void;
  deleteMultiDirectories(): void;
  openDeleteDialog: boolean;
  handleSetOpenDeleteDialog(open: boolean): void;
};

import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Api } from "../../../../constants";
import { DocumentationFileType } from "../../../../types/librariesAndDocs/DocumentationFile";
import { LibrariesMainPageItemType } from "../../main/components/MainPaper/components/MianItemsData";
import { getUseData } from "../../../../methods/getUseData";

// * create context
export const LibraryDocumentionContext =
  createContext<LibraryDocumentionContextType>({
    libraryId: 1,
    files: [],
    openDialog: false,
    handleOenDialog: (open) => {},
    addNewDocumentation: (file) => {},
    editExistDocumentation: (file) => {},
    selectedFilesIds: [],
    checkedFileIdInSelectedFiles: (id) => true,
    toggleFileIdFormSelectedFiles: (id) => {},
    activeFileToShow: undefined,
    handleSetActiveFile: (file) => {},
    handleSearch: (name) => {},
    SelectAll: () => {},
    editFile: false,
    handleSetEditFile: (isEdit) => {},
    deleteFile: (id) => {},
    typeOfSelectedFiles: undefined,
    nestedDirectories: [],
    NestedDirectoryOpenDialog: false,
    selectedNestedDirectory: undefined,
    handleSetNestedDirectoryOpenDialog: (open) => {},
    handleSetSelectedNestedDirectory: (directory) => {},
    addNewDirectory: (directory) => {},
    editExistDirectory: (directory) => {},
    deleteDirectory: (directory) => {},
    branchesData: [],
    activeBranchId: -1,
    handleSetActiveBranchId: (id) => {},
    searchLoadingState: false,
    mainDirectory: undefined,
    openDeleteDialog: false,
    handleHideShowDeleteDialog: (open) => {},
    deleteSelectedFiles: () => {},
  });

export function LibraryDocumentionContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  let { libraryId } = useParams(); //current library id comming from url
  const [searchLoadingState, setSearchLoadingState] = useState(false); //to control state of loading during fetching data
  const [typeOfSelectedFiles, setTypeOfSelectedFiles] = useState<
    "PDF" | "Image" | undefined
  >(undefined); //handle and control selected files  types
  const [mainDirectory, setMainDirectory] = useState<
    LibrariesMainPageItemType | undefined
  >(undefined); //directory how we browse its file
  const [files, setFiles] = useState<DocumentationFileType[]>([]); //files data comming from server
  const [nestedDirectories, setNestedDirectories] = useState<
    LibrariesMainPageItemType[]
  >([]); //to store and controll nesteddirectories
  const [NestedDirectoryOpenDialog, setNestedDirectoryOpenDialog] =
    useState(false); //to control open/hide nested directory dialog
  const [selectedNestedDirectory, setSelectedNestedDirectory] = useState<
    LibrariesMainPageItemType | undefined
  >(undefined); //to store selected (nested) directory to edit
  const [openDialog, setOpenDialog] = useState(false); //to handle and control add/edit dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); //to handle and control delete dialog
  const [editFile, setEditFile] = useState(false); //to control state of dialog edit or create
  const [selectedFilesIds, setSelectedFilesIds] = useState<number[]>([]); //to control selected files
  const [activeFileToShow, setActiveFileToShow] = useState<
    DocumentationFileType | undefined
  >(undefined); //active file which will show in iframe
  const [branchesData, setBranchesData] = useState<
    { id: number; name: string }[]
  >([]); //to store branches data
  const [activeBranchId, setActiveBranchId] = useState(-1); //to control current active button

  useEffect(() => {
    // * get branches data
    getUseData()
      .then((response) => {
        if (response?.branches) setBranchesData(response?.branches);
      })
      .catch(() => {});
    //get main directory data
    axios
      .get<{
        folder?: LibrariesMainPageItemType;
      }>(Api(`employee/library/folder/show/${libraryId}`))
      .then((response) => {
        if (response.data?.folder) {
          setMainDirectory(response.data.folder);
        }
      })
      .catch((err) => {});
  }, []);
  useEffect(() => getLibraryDocs(), [libraryId]);
  useEffect(() => {
    if (selectedFilesIds.length == 1) {
      let file = files?.find((ele) => ele.id == selectedFilesIds[0]);
      if (file) {
        if (file?.media?.[0]?.original_url) {
          if (file?.media?.[0]?.original_url.includes(".pdf")) {
            setTypeOfSelectedFiles("PDF");
          } else {
            setTypeOfSelectedFiles("Image");
          }
        }
        setActiveFileToShow(file);
      }
    } else if (selectedFilesIds.length == 0) {
      setTypeOfSelectedFiles(undefined);
      setActiveFileToShow(undefined);
    }
  }, [selectedFilesIds]);
  // TODO::declare and define our helper methods
  /**
   * get files data from server
   * @param params search params used to search if exist
   */
  function getLibraryDocs(params?: string) {
    setSearchLoadingState(true);

    axios
      .get<{
        files: DocumentationFileType[];
        folders?: LibrariesMainPageItemType[];
      }>(
        Api(
          `employee/library/file/files-by-folder/${libraryId}${
            params ? "?" + params : ""
          }`
        )
      )
      .then((response) => {
        setFiles(response.data.files);
        if (response.data?.folders) {
          setNestedDirectories(response.data.folders);
        }
      })
      .catch((err) => {})
      .finally(() => setSearchLoadingState(false));
  }

  /**
   * handle and control show/hide add/edit dialog
   * @param open boolean
   */
  function handleOenDialog(open: boolean) {
    setOpenDialog(open);
  }

  function handleHideShowDeleteDialog(open: boolean) {
    setOpenDeleteDialog(open);
  }

  /**
   * add new file to library files
   * @param file DocumentationFileType
   */
  function addNewDocumentation(file: DocumentationFileType) {
    let arr = files ?? [];
    arr.push(file);
    setFiles(arr);
  }

  /**
   * edit existing file in library files
   * @param file DocumentationFileType
   */
  function editExistDocumentation(file: DocumentationFileType) {
    let arr = files?.map((ele) => {
      if (ele?.id == file?.id) return file;
      return ele;
    });
    setFiles(arr);
  }

  /**
   * delete file from library files
   * @param id number
   */
  function deleteFile(id: number) {
    let arr = files?.filter((ele) => ele.id != id);
    setFiles(arr);
  }

  function deleteSelectedFiles() {
    let n = selectedFilesIds.length;
    for (let i = 0; i < n; i++) deleteFile(selectedFilesIds[i]);
    setSelectedFilesIds([]);
  }
  /**
   * check file id in selected files ids or not
   * @param id file id
   * @returns boolean
   */
  function checkedFileIdInSelectedFiles(id: number) {
    return selectedFilesIds.indexOf(id) != -1;
  }

  /**
   * toggle file id in selected files ids.
   * @param id file id
   */
  function toggleFileIdFormSelectedFiles(id: number) {
    let exist = checkedFileIdInSelectedFiles(id);
    console.log("This is Target Place");

    if (exist) {
      setSelectedFilesIds((prev) => prev.filter((ele) => ele != id));
    } else {
      setSelectedFilesIds((prev) => [...prev, id]);
    }
  }

  /**
   * set active file which used in edit and show file in iframe
   * @param file DocumentationFileType
   */
  function handleSetActiveFile(file: DocumentationFileType | undefined) {
    if (file === undefined) {
      if (selectedFilesIds.length === 1) setSelectedFilesIds([]);
    }
    setActiveFileToShow(file);
  }

  /**
   * get files data according name
   * @param params search params
   */
  function handleSearch(params: string) {
    getLibraryDocs(params);
  }

  /**
   * select all files
   */
  function SelectAll() {
    if (files.length == selectedFilesIds.length) {
      setSelectedFilesIds([]);
      return;
    }
    let ids = files.map((ele) => ele.id);
    setSelectedFilesIds(ids);
  }

  /**
   * handle dialog state create or add
   * @param isEdit boolean
   */
  function handleSetEditFile(isEdit: boolean) {
    setEditFile(isEdit);
  }

  /**
   * handle set NestedDirectoryOpenDialog
   */
  function handleSetNestedDirectoryOpenDialog(open: boolean) {
    setNestedDirectoryOpenDialog(open);
  }

  function handleSetSelectedNestedDirectory(
    directory: LibrariesMainPageItemType | undefined
  ) {
    setSelectedNestedDirectory(directory);
  }

  /**
   * add new directory to directories
   * @param directory created directory
   */
  function addNewDirectory(directory: LibrariesMainPageItemType) {
    setNestedDirectories((prev) => [...prev, directory]);
  }

  /**
   * edit existing directory
   * @param directory directory after edit
   */
  function editExistDirectory(directory: LibrariesMainPageItemType) {
    let arr = nestedDirectories.map((ele) => {
      if (ele.id == directory.id) return directory;
      return ele;
    });
    setNestedDirectories(arr);
  }

  /**
   * delete directory
   * @param directory directory which will delete
   */
  function deleteDirectory(directory: LibrariesMainPageItemType) {
    let arr = (nestedDirectories ?? []).filter((ele) => ele.id != directory.id);
    setNestedDirectories(arr);
  }

  /**
   * set current active branch
   * @param name string
   */
  function handleSetActiveBranchId(id: number) {
    setActiveBranchId(id);
  }

  return (
    <LibraryDocumentionContext.Provider
      value={{
        libraryId: libraryId ? +libraryId : 1,
        files,
        handleOenDialog,
        openDialog,
        addNewDocumentation,
        editExistDocumentation,
        selectedFilesIds,
        checkedFileIdInSelectedFiles,
        toggleFileIdFormSelectedFiles,
        activeFileToShow,
        handleSetActiveFile,
        handleSearch,
        SelectAll,
        editFile,
        handleSetEditFile,
        deleteFile,
        typeOfSelectedFiles,
        nestedDirectories,
        NestedDirectoryOpenDialog,
        selectedNestedDirectory,
        handleSetNestedDirectoryOpenDialog,
        handleSetSelectedNestedDirectory,
        addNewDirectory,
        editExistDirectory,
        deleteDirectory,
        branchesData,
        activeBranchId,
        handleSetActiveBranchId,
        searchLoadingState,
        mainDirectory,
        openDeleteDialog,
        handleHideShowDeleteDialog,
        deleteSelectedFiles,
      }}
    >
      {children}
    </LibraryDocumentionContext.Provider>
  );
}

// * declare and define needed types
type PropsType = {
  children: React.ReactNode;
};

type LibraryDocumentionContextType = {
  libraryId: number;
  files: DocumentationFileType[];
  openDialog: boolean;
  handleOenDialog(open: boolean): void;
  addNewDocumentation(file: DocumentationFileType): void;
  editExistDocumentation(file: DocumentationFileType): void;
  selectedFilesIds: number[];
  checkedFileIdInSelectedFiles(id: number): boolean;
  toggleFileIdFormSelectedFiles(id: number): void;
  activeFileToShow: DocumentationFileType | undefined;
  handleSetActiveFile(file: DocumentationFileType | undefined): void;
  handleSearch(name: string): void;
  SelectAll(): void;
  editFile: boolean;
  handleSetEditFile(isEdit: boolean): void;
  deleteFile(id: number): void;
  typeOfSelectedFiles: "PDF" | "Image" | undefined;
  nestedDirectories: LibrariesMainPageItemType[];
  NestedDirectoryOpenDialog: boolean;
  selectedNestedDirectory: LibrariesMainPageItemType | undefined;
  handleSetNestedDirectoryOpenDialog(open: boolean): void;
  handleSetSelectedNestedDirectory(
    directory: LibrariesMainPageItemType | undefined
  ): void;
  addNewDirectory(directory: LibrariesMainPageItemType): void;
  editExistDirectory(directory: LibrariesMainPageItemType): void;
  deleteDirectory(directory: LibrariesMainPageItemType): void;
  activeBranchId: number;
  branchesData: {
    id: number;
    name: string;
  }[];
  handleSetActiveBranchId(id: number): void;
  searchLoadingState: boolean;
  mainDirectory: LibrariesMainPageItemType | undefined;
  openDeleteDialog: boolean;
  handleHideShowDeleteDialog(open: boolean): void;
  deleteSelectedFiles(): void;
};

import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Api } from "../../../../constants";
import { DocumentationFileType } from "../../../../types/librariesAndDocs/DocumentationFile";

// * create context
export const LibraryDocumentionContext =
  createContext<LibraryDocumentionContextType>({
    activeBranchId: "all",
    SetActiveBranchId: (id) => {},
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
  });

export function LibraryDocumentionContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  let { libraryId } = useParams(); //current library id comming from url
  const [activeBranchId, setActiveBranchId] = useState<string | number>("all"); //to control active branch
  const [files, setFiles] = useState<DocumentationFileType[]>([]); //files data comming from server
  const [openDialog, setOpenDialog] = useState(false); //to handle and control add/edit dialog
  const [editFile, setEditFile] = useState(false); //to control state of dialog edit or create
  const [selectedFilesIds, setSelectedFilesIds] = useState<number[]>([]); //to control selected files
  const [activeFileToShow, setActiveFileToShow] = useState<
    DocumentationFileType | undefined
  >(undefined); //active file which will show in iframe

  useEffect(() => getLibraryDocs(), [libraryId]);
  // TODO::declare and define our helper methods
  /**
   * get files data from server
   * @param name file name used to search if exist
   */
  function getLibraryDocs(name?: string) {
    axios
      .get<{ files: DocumentationFileType[] }>(
        Api(
          `employee/library/file/files-by-folder/${libraryId}${
            name ? "?name=" + name : ""
          }`
        )
      )
      .then((response) => {
        console.log("breakpoint1999 response ", response.data.files);
        setFiles(response.data.files);
      })
      .catch((err) => {
        console.log("error in fetch files::", err);
      });
  }
  /**
   * set active branch id
   * @param id branch id
   */
  function SetActiveBranchId(id: string | number) {
    setActiveBranchId(id);
  }
  /**
   * handle and control show/hide add/edit dialog
   * @param open boolean
   */
  function handleOenDialog(open: boolean) {
    setOpenDialog(open);
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
    console.log(id, exist);
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
    setActiveFileToShow(file);
  }

  /**
   * get files data according name
   * @param name file name
   */
  function handleSearch(name: string) {
    getLibraryDocs(name);
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

  return (
    <LibraryDocumentionContext.Provider
      value={{
        activeBranchId,
        SetActiveBranchId,
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
  activeBranchId: string | number;
  SetActiveBranchId(id: string | number): void;
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
};

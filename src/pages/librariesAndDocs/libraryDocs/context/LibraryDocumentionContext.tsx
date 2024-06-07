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
  });

export function LibraryDocumentionContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  let { libraryId } = useParams();
  const [activeBranchId, setActiveBranchId] = useState<string | number>("all");
  const [files, setFiles] = useState<DocumentationFileType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFilesIds, setSelectedFilesIds] = useState<number[]>([]);

  useEffect(() => getLibraryDocs(), [libraryId]);
  // TODO::declare and define our helper methods
  function getLibraryDocs() {
    axios
      .get<{ files: DocumentationFileType[] }>(
        Api(`employee/library/file/files-by-folder/${libraryId}`)
      )
      .then((response) => {
        console.log("response ", response.data.files);
        setFiles(response.data.files);
      })
      .catch((err) => {
        console.log("error in fetch files::", err);
      });
  }

  function SetActiveBranchId(id: string | number) {
    setActiveBranchId(id);
  }

  function handleOenDialog(open: boolean) {
    setOpenDialog(open);
  }

  function addNewDocumentation(file: DocumentationFileType) {
    setFiles((prev) => [...prev, file]);
  }

  function editExistDocumentation(file: DocumentationFileType) {
    let arr = files.map((ele) => {
      if (ele.id == file.id) return file;
      return ele;
    });
    setFiles(arr);
  }

  function checkedFileIdInSelectedFiles(id: number) {
    return selectedFilesIds.indexOf(id) != -1;
  }

  function toggleFileIdFormSelectedFiles(id: number) {
    let exist = checkedFileIdInSelectedFiles(id);
    if (exist) {
      setSelectedFilesIds((prev) => prev.filter((ele) => ele != id));
    } else {
      setSelectedFilesIds((prev) => [...prev, id]);
    }
  }

  function handleSearch(name: string) {}

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
};

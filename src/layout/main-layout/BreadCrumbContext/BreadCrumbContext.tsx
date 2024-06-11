import { useEffect, useState } from "react";
import { createContext } from "react";

// * create context
export const MainBreadCrumbContext = createContext<MainBreadCrumbContextType>({
  links: [],
  handleAddNewTerm: (term) => { },
  handleClearLinks: () => { },
  handleClickOnTerm: (index) => { }
});

export function MainBreadCrumbContextProvider({ children }: PropsType) {
  // TODO::declare and define our state and variables
  const [links, setLinks] = useState<BreadCrumbLinkType[]>([]); //to store breadcrumb terms

  // TODO::declare and define our helper methods
  /**
   * add new term to breadcrumb
   * @param term new term in path
   */
  function handleAddNewTerm(term: BreadCrumbLinkType) {
    setLinks((prev) => [...prev, term]);
  }

  function handleClearLinks() {
    setLinks([]);
  }

  /**
   * handle click on Breadcrumbs term
   * @param index index of clicked term
   */
  function handleClickOnTerm(index: number) {
    let arr = links.slice(0, index + 1);
    setLinks(arr);
  }

  return (
    <MainBreadCrumbContext.Provider
      value={{ links, handleAddNewTerm, handleClearLinks, handleClickOnTerm }}
    >
      {children}
    </MainBreadCrumbContext.Provider>
  );
}

// * declare and define needed types
type PropsType = {
  children: React.ReactNode;
};
export type BreadCrumbLinkType = {
  title: string;
  path: string;
};

type MainBreadCrumbContextType = {
  links: BreadCrumbLinkType[];
  handleAddNewTerm(term: BreadCrumbLinkType): void;
  handleClearLinks(): void;
  handleClickOnTerm(index: number): void
};

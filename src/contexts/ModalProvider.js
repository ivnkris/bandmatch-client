import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    open: false,
    content: null,
  });

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

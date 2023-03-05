// import {
//   createContext,
//   useState,
//   useEffect,
//   useRef,
//   useContext,
// } from 'react';
// import ReactDOM from 'react-dom';

// export const ModalContext = createContext();

// export const ModalProvider = ({ children }) => {
//   const modalRef = useRef();
//   const [value, setValue] = useState();

//   useEffect(() => {
//     setValue(modalRef.current);
//   }, []);
//   return (
//     <>
//       <ModalContext.Provider value={value}>
//         {children}
//       </ModalContext.Provider>
//       <div ref={modalRef} />
//     </>
//   );
// };

// export const Modal = ({ onClose, children }) => {
//   const modalNode = useContext(ModalContext);
//   if (!modalNode) return null;

//   return ReactDOM.createPortal(
//     <div className='modal'>
//       <div className='modal-background' onClick={onClose}>
//         <div className='modal-content'>{children}</div>
//       </div>
//     </div>,
//     modalNode
//   );
// };

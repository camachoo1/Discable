// import { createServer } from '../../store/server';
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, Navigate } from 'react-router-dom';
// import './ServerFormPage.css';

// const ServerFormPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [serverName, setServerName] = useState(
//     `${sessionUser.username}'s Server`
//   );
//   const [errors, setErrors] = useState([]);

//   if (!sessionUser) return <Navigate to='/login' />;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setErrors([]);

//     return dispatch(createServer({ serverName }))
//       .then(navigate('/@me'))
//       .catch(async (res) => {
//         let data;

//         try {
//           data = await res.clone().json();
//         } catch {
//           data = await res.text();
//         }

//         if (data?.errors) setErrors(data.errors);
//         else if (data) setErrors([data]);
//         else setErrors([res.statusText]);
//       });
//   };

//   return (
//     <>
//       <div className='server-form'>
//         <form onSubmit={handleSubmit}>
//           <div className='server-form-header'>
//             <h2>Customize your server</h2>
//             <center>
//               <p>
//                 Give your server a personality with a name. You can
//                 always change it later.
//               </p>
//             </center>
//           </div>

//           <div className='form-user-inputs'>
//             <label htmlFor='name' className='server-name-label'>
//               SERVER NAME{' '}
//               <span>{errors.length ? ` - ${errors[0]}` : ''}</span>
//             </label>
//             <input
//               type='text'
//               name='name'
//               value={serverName}
//               onChange={(e) => setServerName(e.target.value)}
//             />

//             <p style={{ fontSize: '12px', marginTop: 0 }}>
//               By creating a server, you agree to Discable's{' '}
//               <a
//                 href='https://discord.com/guidelines'
//                 target='_blank'
//                 rel='noreferrer'
//                 style={{ color: '#0068e0' }}
//               >
//                 <strong>Community Guidelines</strong>
//               </a>
//             </p>
//           </div>

//           <div className='form-footer'>
//             <button>Back</button>
//             <button>Create</button>
//           </div>
//         </form>
//       </div>

//       {/* <Modal
//         showModal={showModal}
//         onRequestClose={() => setShowModal(false)}
//         style={preDefinedStyle}
//         contentLabel='Add Server Modal'
//         overlayClassName='Overlay'
//       >
//         <ServerFormModal setShowModal={setShowModal} />
//       </Modal> */}
//     </>
//   );
// };

// export default ServerFormPage;

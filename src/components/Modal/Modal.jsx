import React, { useRef } from 'react';

import './modal.css';

export const Modal = ({ modal, setModal, children, title }) => {
  const overlayRef = useRef();

  const handleOverlay = (evt) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={(evt) => handleOverlay(evt)}
      className={`overlay ${modal ? 'open' : ''}`}
    >
      <div className='modal-wrapper'>
        <button
          onClick={() => setModal(false)}
          className='modal-button btn btn-dark'
        >
          &times;
        </button>
        <div className='modal-header'>
          <h3>{title}</h3>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  );
};












// import React, { useContext, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { Modal } from '../../components/Modal/Modal';
// import { UserContext } from '../../context/UserContext';

// export const Posts = () => {
//   const { user } = useContext(UserContext);

//   const title = useRef();
//   const desc = useRef();
//   const newTitle = useRef();
//   const newDesc = useRef();

//   const [postModal, setPostModal] = useState(false);
//   const [editPostModal, setEditPostModal] = useState(false);
//   const [posts, setPosts] = useState([]);

//   const getPost = async () => {
//     const data = await axios.get('http://localhost:8080/posts');

//     if (data) {
//       setPosts(data.data);
//     }
//   };

//   useEffect(() => {
//     getPost();
//   }, []);

//   const deletePosts = (postId) => {
//     const filteredPost = posts.filter((post) => {
//       if (post.id === postId) {
//         axios
//           .delete(`http://localhost:8080/posts/${postId}`)
//           .catch((err) => console.log(err));

//         getPost();
//       }
//     });
//   };

//   const editPosts = () => {
//     setEditPostModal(true);
//   };

//   const handlePost = (evt) => {
//     evt.preventDefault();

//     axios
//       .post('http://localhost:8080/posts', {
//         title: title.current.value,
//         desc: desc.current.value,
//         author: user.first_name + ' ' + user.last_name,
//       })
//       .then((data) => {
//         if (data.status === 201) {
//           setPostModal(false);
//           getPost();
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleEdit = (evt) => {
//     evt.preventDefault();

//     const findedPost = posts.find((post) => {
//       if (post.id) {
//         axios
//           .put(`http://localhost:8080/posts/${post.id}`, {
//             title: newTitle.current.value,
//             desc: newDesc.current.value,
//           })
//           .catch((err) => console.log(err));
//         getPost();
//       }

//       setEditPostModal(false);
//     });

//     posts.title = newTitle.current.value;
//     posts.desc = newDesc.current.value;
//   };

//   return (
//     <div>
//       <button
//         onClick={() => setPostModal(true)}
//         className='mt-4 btn btn-success'
//       >
//         Add New Post
//       </button>

//       <h2 className='h2 text-center my-5'>Posts</h2>

//       {posts.length ? (
//         <div className='d-flex flex-wrap align-items-center justify-content-between gap-3 w-50 mx-auto'>
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className='card'
//               style={{ width: '18rem' }}
//             >
//               <div className='card-body'>
//                 <h5 className='card-title'>{post.title}</h5>
//                 <p className='card-text'>{post.desc}</p>
//                 <p className='card-text'>{post.author}</p>
//                 <button
//                   onClick={() => {
//                     editPosts();
//                   }}
//                   className='btn btn-warning'
//                 >
//                   EDIT
//                 </button>
//                 <button
//                   onClick={() => deletePosts(post.id)}
//                   className='btn btn-danger ms-3'
//                 >
//                   DELETE
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         ''
//       )}
//       {postModal ? (
//         <Modal
//           modal={postModal}
//           setModal={setPostModal}
//           title='Add Post'
//         >
//           <form onSubmit={handlePost}>
//             <input
//               className='form-control'
//               ref={title}
//               type='text'
//               placeholder='Post title'
//             />
//             <input
//               className='form-control my-3'
//               ref={desc}
//               type='text'
//               placeholder='Post desc'
//             />
//             <button className='btn btn-primary'>SEND</button>
//           </form>
//         </Modal>
//       ) : (
//         ''
//       )}

//       {editPostModal ? (
//         <Modal
//           modal={editPostModal}
//           setModal={setEditPostModal}
//           title='Edit Post'
//         >
//           <form onSubmit={handleEdit}>
//             <input
//               className='form-control'
//               ref={newTitle}
//               type='text'
//               placeholder='Edit Post Title'
//             />
//             <input
//               className='form-control my-3'
//               ref={newDesc}
//               type='text'
//               placeholder='Edit Post Desc'
//             />
//             <button className='btn btn-success'>SEND</button>
//           </form>
//         </Modal>
//       ) : (
//         ''
//       )}
//     </div>
//   );
// };
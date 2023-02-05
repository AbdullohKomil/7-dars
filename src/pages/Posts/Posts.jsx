import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { UserContext } from '../../context/UsersContext';

export const Posts = () => {
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [dataset, setDataset] = useState('');

  const [posts, setPosts] = useState([]);

  const newTitle = useRef();
  const newBody = useRef();

  const { user } = useContext(UserContext);

  const titleRef = useRef();
  const bodyRef = useRef();

  const editClick = () => {
    setEditModal(true);
  };

  const getPost = async () => {
    const data = await axios.get('http://localhost:8080/posts');

    if (data.status === 200) {
      setPosts(data.data);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const hanlePost = (evt) => {
    evt.preventDefault();

    axios
      .post('http://localhost:8080/posts', {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        author: user.first_name + ' ' + user.last_name,
      })
      .then((data) => {
        if (data.status === 201) {
          setPostModal(false);
          getPost();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    const findedPost = posts.filter((post) => {
      if (post.id === id) {
        axios
          .delete(`http://localhost:8080/posts/${post.id}`)
          .catch((err) => console.log(err));
        getPost();
      }

      setEditModal(false);
    });
  };

  const handleEdit = (evt) => {
    evt.preventDefault();

    const findedPost = posts.find((post) => {
      if (post.id === dataset) {
        axios
          .put(`http://localhost:8080/posts/${post.id}`, {
            title: newTitle.current.value,
            body: newBody.current.value,
            author: user.first_name + ' ' + user.last_name,
          })
          .catch((err) => console.log(err));
        getPost();
      }

      setEditModal(false);
    });

    posts.title = newTitle.current.value;
    posts.body = newBody.current.value;
  };
  console.log(posts);

  return (
    <div>
      <button
        className='btn btn-outline-success '
        onClick={() => setPostModal(true)}
      >
        ADD POST +{' '}
      </button>
      <h2 className='h2 text-center my-5'>Posts</h2>
      {posts.length ? (
        <ul className='list-unstyled row flex-row'>
          {posts.map((el) => (
            <li
              className='mt-2 col-3 border p-3 rounded ms-2'
              key={el.id}
            >
              <h3 className='m-0'>{el.title}</h3>
              <p className='m-0 mb-5 mt-2'>{el.body}</p>
              <p className='text-end m-0'>User: {el.author}</p>
              <button
                onClick={() => {
                  editClick();
                  setDataset(el.id);
                }}
                className='btn btn-warning'
              >
                EDIT
              </button>
              <button
                className='btn btn-danger ms-2'
                onClick={() => handleDelete(el.id)}
              >
                DELETE
              </button>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
      {postModal ? (
        <Modal
          title={'Add post'}
          modal={postModal}
          setModal={setPostModal}
        >
          <form onSubmit={hanlePost}>
            <input
              className='form-control mb-3'
              ref={titleRef}
              type='text'
              placeholder='Title'
            />
            <input
              className='form-control mb-3'
              ref={bodyRef}
              type='text'
              placeholder='Body'
            />
            <button className='btn btn-success '>Send</button>
          </form>
        </Modal>
      ) : (
        ''
      )}

      {editModal ? (
        <Modal
          modal={editModal}
          setModal={setEditModal}
          title='Edit Post'
        >
          <form onSubmit={handleEdit}>
            <input
              className='form-control'
              ref={newTitle}
              type='text'
              placeholder='Edit Post Title'
            />
            <input
              className='form-control my-3'
              ref={newBody}
              type='text'
              placeholder='Edit Post Desc'
            />
            <button className='btn btn-success'>SEND</button>
          </form>
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};

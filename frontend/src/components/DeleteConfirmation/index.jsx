import { useSelector, useDispatch } from 'react-redux';
import { deleteServer } from '../../store/server';
import { useNavigate, useParams } from 'react-router-dom';
import './DeleteConfirmation.css';

const DeleteConfirmation = ({ sessionUser, setShowDeleteForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { serverId } = useParams();
  const server = useSelector((store) => store.servers[serverId]);
  // const sessionUser = useSelector((store) => store.session.user);
  // const subscriptions = useSelector((store) =>
  //   Object.values(store.serverSubscriptions)
  // );

  const hideDeleteModal = (e) => {
    e.preventDefault();
    setShowDeleteForm(false);
  };

  const openDeleteModal = (e) => {
    e.stopPropagation();
  };

  const handleDeleteServer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteServer(server.id));
    navigate('/@me');
  };

  // const handleLeaveServer = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   dispatch(
  //     leaveServer(
  //       server.id,
  //       subscriptions.find((sub) => sub.userId === sessionUser.id).id
  //     )
  //   );
  //   navigate('/@me');
  // };
  return (
    <div className='delete-modal' onClick={hideDeleteModal}>
      <div className='delete-confirmation' onClick={openDeleteModal}>
        <h2 className='delete-header'>
          {/* Add logic for 'Leave' || 'Delete' Server */}
          Delete Server
        </h2>
        <p>
          Are you sure you want to delete {server?.serverName}? This
          action cannot be undone.
        </p>
        <div className='delete-footer'>
          <button id='confirm-button' onClick={handleDeleteServer}>
            Delete Server
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

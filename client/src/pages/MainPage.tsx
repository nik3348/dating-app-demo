import React from 'react';
import { AppContext } from '../context/AppContextProvider';
import { FaBookOpen, FaCheck, FaTimes } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const MainPage = () => {
  const [users, setUsers] = React.useState<User[]>([{
    id: '',
    name: '',
    profilePicture: '',
    gender: '',
    age: 0,
    location: '',
    university: '',
    interests: [],
  }]);
  const context = React.useContext(AppContext);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:3000/users/${context.userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${context.token}`
        }
      });
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const handleLike = async () => {
    const user = users[users.length - 1];
    const result = await fetch(`http://localhost:3000/users/${context.userId}/like?id=${user?.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.token}`
      }
    });

    // TODO: Add a match if the user also liked the current user
    setUsers(users => users.slice(0, users.length - 1));
  }

  const handleDislike = async () => {
    const user = users[users.length - 1];
    const result = await fetch(`http://localhost:3000/users/${context.userId}/dislike?id=${user?.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.token}`
      }
    });

    // TODO: Add missed a match if the user also liked the current user
    setUsers(users => users.slice(0, users.length - 1));
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{
        width: '300px',
        height: '500px',
        position: 'relative',
      }}>
        {users.map((user) => (
          <div key={user.id} style={{
            backgroundColor: '#FFFFFF',
            width: '300px',
            border: '1px solid #000',
            borderRadius: '10px',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: `${users.indexOf(user) * 5}px`,
            zIndex: users.indexOf(user),
          }}>
            <img
              src={user.profilePicture}
              alt={user.name}
              style={{
                width: '250px',
              }}
            />
            <div style={{
              width: '100%',
            }}>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '10px 0 0',
              }}>{user.name}, {user.age}</p>
              <p style={{
                fontSize: '13px',
                margin: '10px 0 0',
              }}>
                <CiLocationOn />{user.location}
              </p>
              <p style={{
                fontSize: '13px',
                margin: '10px 0 0',
              }}>
                <FaBookOpen />{user.university}
              </p>
              <div style={{
                fontSize: '13px',
                margin: '10px 0 0',
                display: 'flex',
              }}>
                {user.interests.map((interest) => {
                  return (
                    <div key={interest} style={{
                      backgroundColor: 'yellow',
                      borderRadius: '20px',
                      width: 'fit-content',
                      padding: '2px 5px',
                      marginRight: '5px',
                    }}>
                      {interest}
                    </div>
                  )
                })}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                marginTop: '20px',
              }}>
                <button
                  style={{
                    width: '50px',
                    height: '50px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: 'green',
                  }}
                  onClick={handleLike}>
                  <FaCheck />
                </button>
                <button
                  style={{
                    width: '50px',
                    height: '50px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: 'red',
                  }}
                  onClick={handleDislike}>
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        ))
        }
      </div >
    </div>
  );
}

export default MainPage;

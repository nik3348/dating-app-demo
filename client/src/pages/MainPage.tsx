import React from 'react';
import { FaBookOpen, FaCheck, FaTimes } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { getToken, getUserId } from '../utils/jwt-utils';

const MainPage = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await fetch(`http://localhost:3000/users/${getUserId()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return await response.json();
  }

  React.useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  React.useEffect(() => {
    if (users.length < 6) {
      fetchUsers().then((data) => {
        const newData = data.filter((user) => !users.some((u) => u.id === user.id));
        const newUsers = [...users, ...newData];
        setUsers(newUsers);
      });
    }
  }, [users]);

  const handleLike = async () => {
    const user = users[users.length - 1];
    console.log(user);
    const result = await fetch(`http://localhost:3000/users/${getUserId()}/like?id=${user?.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });

    // TODO: Add a match if the user also liked the current user
    setUsers(users => users.slice(0, users.length - 1));
  }

  const handleDislike = async () => {
    const user = users[users.length - 1];
    const result = await fetch(`http://localhost:3000/users/${getUserId()}/dislike?id=${user?.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
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
        {users.map((user, index) => (
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
            top: `${index * 5}px`,
            zIndex: index,
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

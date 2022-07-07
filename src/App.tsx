import { FC, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '.';
import IUser from './models/IUser';
import LoginForm from './components/LoginForm';
import { fetchUsers } from './services/UserService';

const App: FC = () => {
  const { store } = useContext(Context);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (store.isLoading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <>
        <LoginForm />
        <button onClick={getUsers}>Get Users</button>
      </>
    );
  }

  return (
    <>
      <h1>{store.isAuth ? store.user.email : 'Not Authorized'}</h1>
      <h1>{store.user.isActivated ? 'Activated' : 'Not Activated'}</h1>
      <button onClick={() => store.logout()}>Log Out</button>
      <div>
        <button onClick={getUsers}>Get Users</button>
      </div>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
    </>
  );
};

export default observer(App);

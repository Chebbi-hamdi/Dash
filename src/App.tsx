import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import User from './pages/Users';
import Admins from './pages/Admins';
import Tasks from './pages/Tasks';
import Transactions from './pages/Transactions';
import Discussion from './pages/Discussion';
import Categorys from './pages/Categorys';
import SubCategorys from './pages/SubCategorys';
import Emails from './pages/Emails';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';


import Modal from 'react-modal';
import ChatPages from './pages/ChatPages';
// import {  io } from 'socket.io-client';
import { useGetUserbyToken } from './hooks/customHooks';
import MinChat from './pages/MinChat';
import SubSubCategorys from './pages/SubSubCategorys';


Modal.setAppElement('#root');



function App() {
  
  // const socket = io('http://localhost:3011');




  //  useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //     if(data && !isLoading && !isError)
  //       socket.emit('user_connected', data.superAdmin._id);
      
  //     console.log('data:',data.superAdmin._id);
  //     // socket.emit('join', { username: data.superAdmin._id, room: 'superAdmin' });

      
  //   });
  //   return () => {
  //     socket.disconnect();
  //   }
  // }, [data,isError,isLoading]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 60000,
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
        <ToastContainer />
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/admins"
            element={
              <>
                <PageTitle title="Admins | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Admins />
              </>
            }
          />
          <Route
            path="/tasks"
            element={
              <>
                <PageTitle title="Tasks | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tasks />
              </>
            }
          />
          <Route
            path="/transactions"
            element={
              <>
                <PageTitle title="Transactions | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Transactions />
              </>
            }
          />
          <Route
            path="/discussions"
            element={
              <>
                <PageTitle title="Discussion | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Discussion />
              </>
            }
          />
          <Route
            path="/categorys"
            element={
              <>
                <PageTitle title="Categorys | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Categorys />
              </>
            }
          />
          <Route
            path="/subCategorys"
            element={
              <>
                <PageTitle title="subCategorys | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SubCategorys />
              </>
            }
          />
          <Route
            path="/subsubCategorys"
            element={
              <>
                <PageTitle title="subSubCategorys | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SubSubCategorys />
              </>
            }
          />
          <Route
            path="/emails"
            element={
              <>
                <PageTitle title="Emails | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Emails />
              </>
            }
          />
          <Route
            path="/chat"
            element={
              <>
                <PageTitle title="Chat | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                {/* <ChatPages socket={socket}  userData={data}/> */}
                
                  <MinChat /> 
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <User />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                {/* <SignIn socket={socket} /> */}
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
        
        </Routes>
    </>
  );
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60000,
    },
  },
});

function AppWithQuery() {
  return (
    <QueryClientProvider client={queryClient}>
    
      <App />
    </QueryClientProvider>
  );
}

export default AppWithQuery;

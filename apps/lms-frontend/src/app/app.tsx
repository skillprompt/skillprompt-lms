/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StudentDashoard from '../pages/Student';
import InstructorDashoard from '../pages/Instructor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Counter from '../components/Counter';
import { Button } from '@nextui-org/react';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <StudentDashoard />
        <Counter />
      </>
    ),
  },
  {
    path: '/instructor',
    element: (
      <>
        <Navbar />
        <InstructorDashoard />
      </>
    ),
  },
]);

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}

export default App;

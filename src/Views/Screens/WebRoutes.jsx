import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Landing,
  Signin,
  Signup,
  Listings,
  MyListings,
  Favorites,
  ViewListing,
} from '../Screens';

//https://www.w3schools.com/react/react_router.asp
const WebRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/mylistings" element={<MyListings />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/viewlisting" element={<ViewListing />} />
      </Routes>
    </BrowserRouter>
  );
};
export default WebRoutes;

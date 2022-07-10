import MovieView from './MovieView';
import Login from './Login';
import DirectorView from './DirectorView';
import GenreView from './GenreView';
import ProfileView from './ProfileView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './MainView';
import Register from './Register';
import FavoriteView from './FavoriteView';
import SearchView from './SearchView';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={< MainView />} />
        <Route path="/browse/:movieId" element={< MovieView />} />
        <Route path="/directors/:directorName" element={<DirectorView />} />
        <Route path="/genres/:genreName" element={<GenreView />} />
        <Route path="/users/:UserId" element={<ProfileView />} />
        <Route path="/favoriteMovies" element={<FavoriteView />} />
        <Route path="/search" element={<SearchView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

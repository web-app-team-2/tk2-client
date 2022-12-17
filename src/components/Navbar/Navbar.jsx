import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from "../../stores/MovieStores";

const Navbar = () => {
  const state = useSearchStore(state => state);
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    state.setSearch(search)
  }

  const onChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark" >
      <div class="container-fluid">
        <div onClick={() => navigate('/')}>
          <a class="navbar-brand" href="#">Web Catalog</a>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <form class="d-flex" role="search" onSubmit={handleSubmit}>
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onChange}></input>
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav >
  )
}

export default Navbar;
function Header() {
  return (
    <header className="d-flex gap-2 flex-column align-items-center w-25 mt-5">
      <div>
        <img alt="multisearch logo" src="./public/logo_multisearch.png" />
      </div>
      <div className="input-group">
        <input type="text" placeholder="Search" className="form-control" />
        <button type="button" className="btn btn-outline-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
            {/* Search icon ref.: https://icons.getbootstrap.com/icons/search/ */}
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
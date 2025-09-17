import { NavLink } from "react-router-dom";
export default function Header({ search, setSearch, searchBox }) {
  return (
    <>
      <header className="sticky-top bg-dark border-bottom">
        <div className="container justify-content-between">
          <nav className="navbar navbar-expand-sm border-body d-flex justify-content-between">
            <NavLink to="/" className="navbar-brand">
              Grow Meet
            </NavLink>
            {searchBox && (
              <>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <div className="ms-auto">
                    <input
                      style={{ width: "200px" }}
                      className="form-control me-2"
                      type="text"
                      placeholder="Search by title and tags"
                      value={search}
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

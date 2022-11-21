import { Link } from 'react-router-dom';
function Header() {
  let a = localStorage.getItem('token');
  let button;
  let logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  if (a == null)
    button = (
      <>
        <Link className="btn btn-success" role="button" to="/login">
          Sign in
        </Link>
        <Link className="btn btn-success" role="button" to="/signup">
          Sign up
        </Link>
      </>
    );
  else
    button = (
      <>
        <a href="/profile">
          <img
            src="https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
            className="avatar"
            alt="An avatar"
          ></img>
        </a>
        <button className="btn btn-danger" onClick={logout}>
          Log out
        </button>
      </>
    );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          E-learning
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/class">
                Class
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
          {button}
        </div>
      </div>
    </nav>
  );
}
export default Header;

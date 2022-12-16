import { Link } from 'react-router-dom';
function Header() {
  let user = JSON.parse(localStorage.getItem('user'));
  let button;
  let navElement;

  let logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const token = localStorage.getItem('token');

  function isTokenExpired(token) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  if (user == null)
    button = (
      <>
        <Link className="btn btn-success" role="button" to="/login">
          Sign in
        </Link>
        &nbsp;
        <Link className="btn btn-success" role="button" to="/signup">
          Sign up
        </Link>
      </>
    );
  else {
    if (isTokenExpired(token)) {
      alert('Your session has been ended!');
      logout();
    }
    let avatar = window.DOMAIN + '/' + user.avatar;
    navElement = (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/class">
            Class
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/class/request">
            Requests
          </a>
        </li>
      </ul>
    );
    button = (
      <>
        <h4 style={{ color: 'white' }}>Hi! {user.username} </h4>
        &nbsp;
        <a href="/profile">
          <img src={avatar} className="avatar" alt="An avatar"></img>
        </a>
        &nbsp;
        <button className="btn btn-danger" onClick={logout}>
          Log out
        </button>
      </>
    );
  }
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
          {navElement}
          {button}
        </div>
      </div>
    </nav>
  );
}
export default Header;

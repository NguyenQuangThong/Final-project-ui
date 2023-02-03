import { Link, useNavigate } from 'react-router-dom';
function Header() {
  let user = JSON.parse(localStorage.getItem('user'));
  let button;
  let navElement;
  let navigate = useNavigate();

  let logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const token = localStorage.getItem('token');

  function isTokenExpired(token) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  if (user == null)
    button = (
      <div className="container-fluid">
        <div style={{ float: 'right' }}>
          <Link className="btn btn-success" role="button" to="/login">
            Sign in
          </Link>
          &nbsp;
          <Link className="btn btn-success" role="button" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    );
  else {
    if (isTokenExpired(token)) {
      alert('Your session has been expired!');
      logout();
    }
    let adminNav;
    if (user.role === 'Admin')
      adminNav = (
        <li className="nav-item">
          <Link className="nav-link active" to="/admin">
            Admin page
          </Link>
        </li>
      );

    navElement = (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/class">
            Class
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/class/request">
            Requests
          </Link>
        </li>
        {adminNav}
      </ul>
    );

    let avatar = window.DOMAIN + '/' + user.avatar;
    button = (
      <>
        <h4 style={{ color: 'white' }}>Hi! {user.username} </h4>
        &nbsp;
        <Link to="/profile">
          <img src={avatar} className="avatar" alt="An avatar"></img>
        </Link>
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

import { Link } from 'react-router-dom';
import ClassDetailFooter from '../ClassDetailFooter';
import Header from '../DefaultLayout/Header';

function ClassDetailHeader({ children }) {
  return (
    <>
      <div className="sticky-top">
        <Header />
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <div class="navbar-brand">
              <Link to="/class/detail" style={{ textDecoration: 'none' }}>
                General
              </Link>
              &nbsp; &nbsp;
              <Link to="/class/file" style={{ textDecoration: 'none' }}>
                Files
              </Link>
              &nbsp; &nbsp;
              <Link to="/class/meeting" style={{ textDecoration: 'none' }}>
                Meeting now
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div style={{ marginBottom: 150 }}>{children}</div>
    </>
  );
}
export default ClassDetailHeader;

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
              <a href="/class/detail" style={{ textDecoration: 'none' }}>
                General
              </a>
              &nbsp; &nbsp;
              <a href="/class/file" style={{ textDecoration: 'none' }}>
                Files
              </a>
              &nbsp; &nbsp;
              <a href="/class/meeting" style={{ textDecoration: 'none' }}>
                Meeting now
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div style={{ marginBottom: 150 }}>{children}</div>
      {/* <div>
        <ClassDetailFooter />
      </div> */}
    </>
  );
}
export default ClassDetailHeader;

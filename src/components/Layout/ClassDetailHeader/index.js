import ClassDetailFooter from '../ClassDetailFooter';
import Header from '../DefaultLayout/Header';

function ClassDetailHeader({ children }) {
  return (
    <div>
      <div className="sticky-top">
        <Header />
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <div class="navbar-brand">
              <a href="/class/detail">General</a> <a href="/class/file">Files</a>
            </div>
          </div>
        </nav>
      </div>
      <div style={{ marginBottom: 150 }}>{children}</div>
      <div>
        <ClassDetailFooter />
      </div>
    </div>
  );
}
export default ClassDetailHeader;

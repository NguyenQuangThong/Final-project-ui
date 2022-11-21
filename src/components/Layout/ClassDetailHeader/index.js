import ClassDetailFooter from '../ClassDetailFooter';
import Header from '../DefaultLayout/Header';

function ClassDetailHeader({ children }) {
  return (
    <div>
      <div className="sticky-top">
        <Header />
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              General Chat Files
            </a>
          </div>
        </nav>
      </div>
      <div>{children}</div>
      <div>
        <ClassDetailFooter />
      </div>
    </div>
  );
}
export default ClassDetailHeader;

/* eslint-disable react/style-prop-object */
function Footer() {
  return (
    <div>
      <footer>
        <div className="row">
          <div className="col-sm-4" style={{ textAlign: 'center', margin: 'auto' }}>
            E-Learning
          </div>
          <div className="col-sm-8">
            <div className="row">
              <div className="col-8 col-sm-6"></div>
              <div className="col-4 col-sm-6" style={{ margin: 'auto' }}>
                <h6>Student: Nguyen Quang Thong</h6>
                <h6>Class: 18T2</h6>
                <h6>Email: thongnguyen120600@gmail.com</h6>
                <h6>Phone contact: 0326964144</h6>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;

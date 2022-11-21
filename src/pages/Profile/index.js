function Profile() {
  let username = localStorage.getItem('username');
  console.log(username);
  return <h1>Username: {username}</h1>;
}
export default Profile;

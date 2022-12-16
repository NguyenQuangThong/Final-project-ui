import Home from '~/pages/Home';
import Class from '~/pages/Class';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Profile from '~/pages/Profile';
import { HeaderOnly } from '~/components/Layout';
import ClassDetail from '~/pages/ClassDetail';
import ClassDetailHeader from '~/components/Layout/ClassDetailHeader';
import ClassManage from '~/pages/ClassManage';
import File from '~/pages/File';
import Meeting from '~/pages/Meeting';
import ForgotPassword from '~/pages/ForgotPassword';
import ChangeForgotPassword from '~/pages/ForgotPassword/ChangeForgotPassword';
import Request from '~/pages/Request';
import OtherProfile from '~/pages/OtherProfile';
import ClassDetailLayout from '~/components/Layout/ClassDetailLayout';
import User from '~/pages/Admin/User';
import Admin from '~/pages/Admin';

const path = '/Final-project-ui';

const publicRoutes = [
  { path: path + '/', component: Home },
  { path: path + '/class', component: Class, layout: HeaderOnly },
  { path: path + '/login', component: Login, layout: null },
  { path: path + '/signup', component: Signup, layout: null },
  { path: path + '/profile', component: Profile, layout: HeaderOnly },
  { path: path + '/class/detail', component: ClassDetail, layout: ClassDetailLayout },
  { path: path + '/class/manage', component: ClassManage, layout: HeaderOnly },
  { path: path + '/class/file', component: File, layout: ClassDetailHeader },
  { path: path + '/class/meeting', component: Meeting, layout: ClassDetailHeader },
  { path: path + '/forgot-password', component: ForgotPassword, layout: null },
  { path: path + '/forgot-password/change', component: ChangeForgotPassword, layout: null },
  { path: path + '/class/request', component: Request, layout: HeaderOnly },
  { path: path + '/other-profile', component: OtherProfile, layout: HeaderOnly },
  { path: path + '/admin', component: Admin, layout: HeaderOnly },
  { path: path + '/admin/users', component: User, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };

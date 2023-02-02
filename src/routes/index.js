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
import Classes from '~/pages/Admin/Classes';
import Files from '~/pages/Admin/Files';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/class', component: Class, layout: HeaderOnly },
  { path: '/login', component: Login, layout: null },
  { path: '/signup', component: Signup, layout: null },
  { path: '/profile', component: Profile, layout: null },
  { path: '/class/detail', component: ClassDetail, layout: ClassDetailLayout },
  { path: '/class/manage', component: ClassManage, layout: HeaderOnly },
  { path: '/class/file', component: File, layout: ClassDetailHeader },
  { path: '/class/meeting', component: Meeting, layout: ClassDetailHeader },
  { path: '/forgot-password', component: ForgotPassword, layout: null },
  { path: '/forgot-password/change', component: ChangeForgotPassword, layout: null },
  { path: '/class/request', component: Request, layout: HeaderOnly },
  { path: '/other-profile', component: OtherProfile, layout: HeaderOnly },
  { path: '/admin', component: Admin, layout: HeaderOnly },
  { path: '/admin/user', component: User, layout: HeaderOnly },
  { path: '/admin/class', component: Classes, layout: HeaderOnly },
  { path: '/admin/file', component: Files, layout: HeaderOnly },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };

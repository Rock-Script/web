import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import ForgotPassword from '../components/auth/forgot-password/ForgotPassword';
import Login from '../components/auth/login/Login';
import Register from '../components/auth/register/Register';
import Home from '../components/home/Home';
import Exams from '../components/exams/Exams';
import ExamForm from '../components/exams/ExamForm';
import Reports from '../components/reports/Reports';
import Members from '../components/members/Members';
import Admin from '../components/admin/Admin';
import ExamLogForm from '../components/exam-logs/ExamLogForm';
import Role from '../components/admin/Role/Role';
import RouteError from '../components/route/RouteError';
import EmailVerify from '../components/auth/email-verify/EmailVerify';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword></ForgotPassword>
    },
    {
        path: '/signup_verify',
        element: <EmailVerify></EmailVerify>
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        errorElement: <RouteError></RouteError>,
        children: [
            {
                path: 'home',
                element: <Home></Home>
            },
            {
                path: 'members',
                element: <Members></Members>
            }, 
            {
                path: 'exams',
                element: <Exams></Exams>
            },
            {
                path: 'exam-log/:exam_log_id',
                element: <ExamLogForm></ExamLogForm>
            },
            {
                path: 'exam-log/:exam_id/:exam_log_id',
                element: <ExamLogForm></ExamLogForm>
            },
            {
                path: 'exams/:exam_id',
                element: <ExamForm></ExamForm>
            },
            {
                path: 'exams/course/:course_id',
                element: <Exams></Exams>
            },
            {
                path: 'reports',
                element: <Reports></Reports>
            },
            {
                path: 'admin',
                element: <Admin></Admin>,
                children: [
                    {
                        path: 'role',
                        element: <Role></Role>
                    }
                ]
            },
        ]
    }
]);

export default router;
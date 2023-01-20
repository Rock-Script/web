import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const ApplicationTabs = [
    {
        label: 'Home',
        url: '/home',
        icon: <HomeIcon />
    },
    {
        label: 'Members',
        url: '/members',
        icon: <PeopleIcon/>
    },
    {
        label: 'Exams',
        url: '/exams',
        icon: <QuizIcon/>
    },
    {
        label: 'Reports',
        url: '/reports',
        icon: <AssessmentIcon/>
    },
    {
        label: 'Admin',
        url: '/admin',
        icon: <AdminPanelSettingsIcon />
    }
];

export default ApplicationTabs;
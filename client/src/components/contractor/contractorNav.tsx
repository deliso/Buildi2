import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { profile } from '../../service/projectService';
import { Route, Routes } from 'react-router-dom';
import Logout from '../shared/logout';
import ProjectDetails from '../shared/project/projectDetails/projectDetails';
import Profile from '../shared/profile/profile';
import ProjectsList from '../shared/projectList';
import Discover from '../shared/discover/discover';
//MUI IMPORTS
//COMPONENTS
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
//ICONS
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { ProjectT } from '../../../../types/projectTypes';
import { UserT } from '../../../../types/userTypes';

type Props = {
	projects: ProjectT[];
	setProjects: React.Dispatch<React.SetStateAction<ProjectT[]>>;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialUser: UserT = {
	profilePic: '',
	email: '',
	password: '',
	userType: '',
	firstName: '',
	lastName: '',
	location: '',
	specialties: [''],
	reviews: [
		{
			rating: 0,
			review: '',
			creatorFirstName: '',
			creatorLastName: '',
			creatorPic: '',
		},
	],
	_id: '',
};

function ContractorNav(props: Props) {
	const { projects, setProjects, setIsAuthenticated } = props;
	const [user, setUser] = useState(initialUser);

	const [navValue, setNavValue] = useState(2);

	useEffect(() => {
		const getProfile = async () => {
			const userInfo = await profile();
			if (userInfo) {
				const {
					firstName,
					lastName,
					_id,
					userType,
					email,
					profilePic,
					location,
					specialties,
					reviews,
				} = userInfo;
				setUser((prevState) => {
					return {
						...prevState,
						email,
						profilePic,
						location,
						firstName,
						lastName,
						userType,
						_id,
						specialties,
						reviews,
					};
				});
			} else {
				console.log('No userInfo found =(');
			}
		};

		getProfile();
	}, []);
	return (
		<>
			<Routes>
				<Route
					path="discover"
					element={<Discover user={user} projects={projects} />}
				/>
				<Route
					path="discover/:projectId"
					element={<ProjectDetails user={user} setProjects={setProjects} />}
				/>
				<Route
					path="watchlist/:projectId"
					element={<ProjectDetails user={user} setProjects={setProjects} />}
				/>
				<Route
					path="watchlist"
					element={
						<ProjectsList
							projects={projects}
							user={user}
							setProjects={setProjects}
						/>
					}
				/>
				<Route path="profile" element={<Profile user={user} />} />
				<Route
					path="logout"
					element={<Logout setIsAuthenticated={setIsAuthenticated} />}
				/>
			</Routes>
			<Paper
				sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
				elevation={3}
			>
				<BottomNavigation
					showLabels
					value={navValue}
					onChange={(event, newValue) => {
						setNavValue(newValue);
					}}
				>
					<BottomNavigationAction
						label="Discover"
						icon={<LanguageOutlinedIcon />}
						component={Link}
						to={'/contractor/discover'}
					/>
					<BottomNavigationAction
						label="Watchlist"
						icon={<ListAltOutlinedIcon />}
						component={Link}
						to={'/contractor/watchlist'}
					/>
					<BottomNavigationAction
						label="Profile"
						icon={<AccountCircleOutlinedIcon />}
						component={Link}
						to={'/contractor/profile'}
					/>
				</BottomNavigation>
			</Paper>
			<Outlet />
		</>
	);
}

export default ContractorNav;

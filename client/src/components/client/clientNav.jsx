import { Link, Outlet, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import { profile } from '../../service/projectService';
import Profile from '../shared/profile/profile';
import ClientCreate from './create/clientCreate';
import Logout from '../shared/logout';
import ProjectDetails from '../shared/project/projectDetails/projectDetails';
import ProjectsList from '../shared/projectList';
// MUI IMPORTS
// COMPONENTS
// ICONS
// comment

const initialUserState = {
	firstName: '',
	lastName: '',
	_id: '',
};

function ClientNav({ projects, setIsAuthenticated, setProjects }) {
	const [user, setUser] = useState(initialUserState);
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
					profilePic,
					email,
					location,
				} = userInfo;
				setUser((prevState) => ({
					...prevState,
					profilePic,
					firstName,
					lastName,
					userType,
					location,
					email,
					_id,
				}));
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
					path="projects"
					element={
						<ProjectsList
							projects={projects}
							user={user}
							setProjects={setProjects}
						/>
					}
				/>
				<Route
					path="projects/:projectId"
					element={<ProjectDetails user={user} />}
				/>
				<Route
					path="create"
					element={<ClientCreate user={user} setProjects={setProjects} />}
				/>
				<Route path="profile" element={<Profile user={user} />} />
				<Route
					path="logout"
					element={<Logout setIsAuthenticated={setIsAuthenticated} />}
				/>
				<Route
					path="contractor/profile/:otherProfileId"
					element={<Profile user="viewingOtherProfile" />}
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
						label="Projects"
						icon={<ListAltOutlinedIcon />}
						component={Link}
						to="/client/projects"
					/>
					<BottomNavigationAction
						label="Create"
						icon={<AddCircleOutlineOutlinedIcon />}
						component={Link}
						to="/client/create"
					/>
					<BottomNavigationAction
						label="Profile"
						icon={<AccountCircleOutlinedIcon />}
						component={Link}
						to="/client/profile"
					/>
				</BottomNavigation>
			</Paper>

			<Outlet />
		</>
	);
}

export default ClientNav;

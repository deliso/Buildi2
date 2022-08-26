//USING THIS COMPONENT ON PROFILE PAGE
//@ts-ignore
import auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../service/projectService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
type Props = {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
const Logout = (props: Props) => {
	const { setIsAuthenticated } = props;
	let navigate = useNavigate();
	const handleClick = () => {
		logout();
		handleAuth();
	};

	const handleAuth = () => {
		setIsAuthenticated(false);
		auth.logout(() => navigate('/'));
	};

	return (
		<>
			<Box
				sx={{
					width: '100vw',
					height: '100vh',
					backgroundColor: 'primary.main',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: '15vh',
					alignItems: 'center',
				}}
			>
				<Typography
					variant="h3"
					style={{
						color: 'white',
						fontWeight: 410,
						position: 'fixed',
						top: '12vh',
					}}
				>
					Buildi
				</Typography>
				<Typography variant="h4" style={{ color: 'white', fontWeight: 410 }}>
					Log Out?
				</Typography>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '3vh',

						// justifyContent: "space-around",
					}}
				>
					<Button
						variant="contained"
						color="secondary"
						size="large"
						style={{
							padding: '1vw 27vw 1vw 27vw',
							// backgroundColor: "black",
							color: 'white',
							borderRadius: 200,
						}}
						onClick={handleClick}
					>
						Yes
					</Button>

					<Button
						variant="contained"
						size="large"
						style={{
							padding: '1vw 27vw 1vw 27vw',
							backgroundColor: 'black',
							color: 'white',
							borderRadius: 200,
						}}
						onClick={() => navigate(-1)}
					>
						No
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default Logout;

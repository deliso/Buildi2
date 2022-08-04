import { Link } from 'react-router-dom';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
function Register() {
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
					alignItems: 'center',
					gap: '7vh',
				}}
			>
				<Box
					sx={{
						width: '60vw',
						backgroundColor: 'primary.main',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: '5vh',
						alignItems: 'center',
					}}
				>
					<Typography variant="h4" style={{ color: 'white', fontWeight: 410 }}>
						Register as
					</Typography>
				</Box>
				<Box
					sx={{
						width: '80vw',
						backgroundColor: 'primary.main',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						gap: '1vh',
						alignItems: 'center',
					}}
				>
					<Button
						variant="contained"
						color="secondary"
						style={{
							padding: '2vw 19vw 2vw 19vw',
							color: 'white',
							borderRadius: 200,
						}}
						component={Link}
						to="client"
					>
						Buildi
					</Button>
					<Typography
						variant="body1"
						style={{ color: 'white', textAlign: 'center' }}
					>
						or
					</Typography>
					<Button
						variant="contained"
						style={{
							padding: '2vw 19vw 2vw 19vw',
							backgroundColor: 'black',
							color: 'white',
							borderRadius: 200,
						}}
						component={Link}
						to="contractor"
					>
						Builder
					</Button>
				</Box>
				<Fab
					variant="extended"
					size="small"
					style={{
						padding: '0 4vw 0 1vw',
						backgroundColor: 'white',
						position: 'absolute',
						bottom: '5vh',
						left: '16vw',
					}}
					component={Link}
					to={-1}
				>
					<ChevronLeftIcon />
					Login
				</Fab>
			</Box>
		</>
	);
}

export default Register;

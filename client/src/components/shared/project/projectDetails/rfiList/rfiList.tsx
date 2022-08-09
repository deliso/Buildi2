import RFI from './rfi/rfi';
import { createRFI } from '../../../../../service/projectService';
//MUI IMPORTS
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { UserT } from '../../../../../../../types/userTypes';
import { ProjectT } from '../../../../../../../types/projectTypes';

type Props = {
	project: ProjectT;
	user: UserT;
	projectId: string;
};
// function RFIList({ project, user, projectId }) {
function RFIList(props: Props) {
	//FOR FORCED REFRESHES(CHEATING)
	function refreshPage() {
		window.location.reload();
	}
	//FOR MUI FORM DIALOG
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		console.log('submit');
	};

	const handleClose = () => {
		setOpen(false);
	};
	//END
	async function submitHandlerNewRFI(
		event: React.ChangeEvent<HTMLFormElement>
	) {
		event.preventDefault();
		const target = event.target.rfiInput as HTMLFormElement;
		await createRFI(
			props.projectId,
			target.value,
			props.user._id,
			props.user.profilePic
		);
		refreshPage();
	}
	return (
		<>
			<Box
				sx={{
					width: '76vw',
					height: '10vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				<Box
					sx={{
						width: '76vw',
						display: 'flex',
						justifyContent: 'space-between',
						gap: '15vw',
					}}
				>
					<Typography variant="h6">RFI's</Typography>
				</Box>
				<Typography variant="h6">
					{props.project.rfis.map((rfi) => {
						return (
							<RFI rfi={rfi} user={props.user} projectId={props.projectId} />
						);
					})}
				</Typography>
				<Divider style={{ height: '15vh' }}></Divider>
			</Box>

			<div className="rfiList">
				{props.project ? (
					<>
						{props.user.userType == 'contractor' &&
						props.project.lifeCycle === 'open' ? (
							// IF YOU ARE A CONTRACTOR & THE PROJECT IS OPEN YOU SEE THE ASK RFI FORM
							<>
								<Fab
									variant="extended"
									color="success"
									style={{ position: 'fixed', bottom: '8vh', right: '25vw' }}
									size="small"
									onClick={handleClickOpen}
								>
									ASK RFI
								</Fab>
								<Dialog open={open} onClose={handleClose}>
									<DialogTitle>Ask RFI</DialogTitle>
									<DialogContent>
										<form onSubmit={submitHandlerNewRFI} id="rfiForm">
											<DialogContentText>
												Ask a specific question about the project <br />
												<br />
												ex: How many SQFT of new tile is needed?
											</DialogContentText>
											<TextField
												autoFocus
												margin="dense"
												name="rfiInput"
												id="rfi"
												label="Question..."
												type="rfi"
												fullWidth
												variant="standard"
											/>
										</form>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose}>Cancel</Button>
										<Button onClick={handleClose} type="submit" form="rfiForm">
											Submit
										</Button>
									</DialogActions>
								</Dialog>
							</>
						) : (
							<></>
						)}
					</>
				) : (
					'not rendered'
				)}
			</div>
		</>
	);
}

export default RFIList;

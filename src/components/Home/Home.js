import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StudentList from '../StudentList/StudentList';

const Home = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("userId");
		window.location.reload();
	};
	const userEmail = localStorage.getItem("user")
	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							{userEmail}
						</Typography>
						<Button color="inherit" onClick={handleLogout}>Logout</Button>
					</Toolbar>
				</AppBar>

			</Box>
			<StudentList />
		</div>
	);
};

export default Home;
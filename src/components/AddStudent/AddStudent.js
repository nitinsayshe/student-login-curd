import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';


const theme = createTheme();
const userId = localStorage.getItem("userId")
function AddStudent() {

    const [student, setStudent] = useState({ name: "", subject: "", marks: "" ,userId:userId});
    const Url = 'http://localhost:8000';

    let navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setStudent({ ...student, [input.name]: input.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await axios.post(`${Url}/addstudent`, student);
            alert(result.data.message)
            navigate('/');
        } catch (error) {
            alert(error.response.data.message)
        }

    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Add Student
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Student Name"
                            name="name"
                            autoFocus
                            onChange={handleChange}
                            value={student.name}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="subject"
                            label="Subject"
                            id="subject"

                            onChange={handleChange}
                            value={student.subject}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="marks"
                            label="Marks"
                            id="marks"
                            onChange={handleChange}
                            value={student.marks}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Student
                        </Button>

                        <Link to="/" variant="body2">
                            {"Back to Home"}
                        </Link>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}

export default AddStudent
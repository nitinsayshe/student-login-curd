import { useState } from "react";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

function EditStudent(props) {
    const Url = 'http://localhost:8000';
   
    let { studentforEdit } = props
    const [student, setStudent] = useState({ name: "", subject: "", marks: "" });
   
    const handleChange = ({ currentTarget: input }) => {
        setStudent({ ...student, [input.name]: input.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result=await axios.put(`${Url}/${studentforEdit._id}`,student)
            alert(result.data.message)
            window.location.reload();
        } catch (error) {
            alert(error.response.data.message)
        }
    };
    React.useEffect(() => {
        if (studentforEdit != null) {
            setStudent({ ...studentforEdit })
        }
        console.log(studentforEdit)
    }, [studentforEdit])

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Edit Student Details
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
                            Update Student Data
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>

    )
}


export default EditStudent
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Button, Input } from '@mui/material'
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import react, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {  useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditStudent from '../EditStudent/EditStudent';
import Popup from '../Popup';
import axios from "axios"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#6495ED",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const userId = localStorage.getItem("userId")
export default function StudentList() {
    const Url = 'http://localhost:8000';
    const [students, setStudents] = useState([]);
    const [editStudent, seteditStudent] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllStudents();
    }, [])

    const getAllStudents = async () => {
        try {
            let response = await axios.get(`${Url}/getstudent/${userId}`);
            setStudents(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteStudentData = async (id) => {
        try {
            await axios.delete(`${Url}/${id}`);
            alert(" User Deleted SuccesFully")
            getAllStudents();
        } catch (error) {
            console.log(error)
        }
    }
    const openInPopup = student => {
        seteditStudent(student)
        setOpenPopup(true)
    }
    return (
        <>
            <TableContainer component={Paper} align="center">
                <Table sx={{ maxWidth: 900 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Subject</StyledTableCell>
                            <StyledTableCell align="left">Marks</StyledTableCell>
                            <StyledTableCell align="left">
                                <div>

                                    <Input
                                        placeholder="Search…"
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                <Button variant="contained" endIcon={<AddIcon />} onClick={() => navigate("/addStudent")}>
                                    Add
                                </Button>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.filter((student) =>
                            student.name.toLowerCase().includes(query)).map((student) => (
                                <StyledTableRow key={student._id}>
                                    <StyledTableCell align="left">{student.name}</StyledTableCell>
                                    <StyledTableCell align="left">{student.subject}</StyledTableCell>
                                    <StyledTableCell align="left">{student.marks}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button variant="outlined" style={{ marginRight: 5 }}
                                            // component={Link} to={`/editstudent/${student._id}`}
                                            // onClick={()=>setOpenPopup(true)}
                                            onClick={() => { openInPopup(student) }}
                                        >Edit</Button>
                                        <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={() => deleteStudentData(student._id)}>Delete</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <EditStudent studentforEdit={editStudent} />
            </Popup>
        </>
    );
}
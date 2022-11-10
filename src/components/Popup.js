import { Button, Dialog, DialogContent, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function Popup(props) {

    const { children, openPopup, setOpenPopup } = props;
    return (
        <Dialog open={openPopup}>
            <div style={{justifyContent:"end" ,display:"flex"}}>
                <IconButton onClick={() => setOpenPopup(false)}>
                    <CloseIcon />
                </IconButton>
            </div>

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog >
    )
}

export default Popup
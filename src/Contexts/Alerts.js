import { Alert, Slide, Snackbar } from "@mui/material"
import React from "react"


const AlertContext = React.createContext()

export function AlertProvider({children}){
    const [message, setMessage] = React.useState({type:"success",text:""})
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    function CreateAlert(message){
        if(message && message.text && message.type){
            setMessage(message)
            setOpen(true)
        }
    }

    const value = {
        CreateAlert
    }


    return (
        <AlertContext.Provider value={value}>
            {children}
            <Snackbar 
                open={open} 
                autoHideDuration={5000} 
                onClose={handleClose} 
                anchorOrigin={{vertical:"top",horizontal:"right"}}
            >
                <Alert 
                    severity={message.type} 
                    onClose={handleClose} 
                    sx={{ width: '100%' }}
                >
                    {message.text}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    )
}

export function useAlerts() {
    return React.useContext(AlertContext)
  }
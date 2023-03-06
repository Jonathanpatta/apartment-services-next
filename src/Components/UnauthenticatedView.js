import { useAuth } from "@/Contexts/Auth";
import { Alert, AlertTitle, Button } from "@mui/material";
import { Container } from "@mui/system";


export default function UnauthenticatedView({onSuccess,onFailure}){
    var {signInWithGoogle} = useAuth()

    function login(){
        signInWithGoogle.then(res=>{
            onSuccess()
        }).catch(err=>{
            onFailure(err)
        })
    }
    return (
        <Container maxWidth="xl">
            <Alert 
                severity="error" 
                sx={{marginTop:6}}
                action={
                    <Button color="inherit" size="small" onClick={signInWithGoogle}>
                      login
                    </Button>
                  }
                >
                Unauthenticated
            </Alert>
        </Container>
    )
}
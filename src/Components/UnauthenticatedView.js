import { useAuth } from "@/Contexts/Auth";
import { Alert, AlertTitle, Button } from "@mui/material";
import { Container } from "@mui/system";


export default function UnauthenticatedView({onSuccess,onFailure}){
    var {signInWithGoogle} = useAuth()

    function login(){
        
        signInWithGoogle.then(res=>{
            console.log("successful login good job")
            onSuccess()
        }).catch((err)=>{
            console.log("hi from err in unauth view")
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
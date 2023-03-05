import { Breadcrumbs } from "@mui/material";
import  NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@/Link";


export default function BreadcrumbLinks({links}){
    return (
        <Breadcrumbs 
                    separator={<NavigateNextIcon fontSize="small" />} 
                    aria-label="breadcrumb"
                >   
                    {
                        links.map((link,i) => {
                            return (
                                <Link href={link.href} color="secondary" key={i}>
                                {link.text}
                            </Link>
                            )
                        })
                    }
        </Breadcrumbs>
    )
}
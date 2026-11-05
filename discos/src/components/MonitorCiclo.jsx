import{useEffect} from "react";

function MonitorCiclo(){
    useEffect(()=>{
        console.log("Monitor montado");

        return() => {
            console.log("Monitor desmontado");
        };
    },[])
    return <p>El Monitor esta activo.</p>
}

export default MonitorCiclo;
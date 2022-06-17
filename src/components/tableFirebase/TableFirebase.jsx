import "./tableFirebase.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from "react";


import {
  collection, doc, setDoc, getDoc, getDocs,
  query, where
} from "firebase/firestore";
//import { async } from "@firebase/util";
import { db } from "../../firebase";
import { async } from "@firebase/util";

// <TableContainer component={Paper} className="table">
//   <Table sx={{ minWidth: 650 }} aria-label="simple table">
//     <TableHead>
//       <TableRow>
//         <TableCell className="tableCell">Identificador</TableCell>
//         <TableCell className="tableCell">Proyecto de Investigación</TableCell>
//         <TableCell className="tableCell">Docente</TableCell>
//         <TableCell className="tableCell">Fecha</TableCell>
//         <TableCell className="tableCell">Cantidad</TableCell>
//         {/* <TableCell className="tableCell">Payment Method</TableCell> */}
//         <TableCell className="tableCell">Status</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {rows.map((row) => (
//         <TableRow key={row.id}>
//           <TableCell className="tableCell">{row.id}</TableCell>
//           <TableCell className="tableCell">
//             <div className="cellWrapper">
//               {/* <img src={row.img} alt="" className="image" /> */}
//               {row.product}
//             </div>
//           </TableCell>
//           <TableCell className="tableCell">{row.customer}</TableCell>
//           <TableCell className="tableCell">{row.date}</TableCell>
//           <TableCell className="tableCell">{row.amount}</TableCell>
//           {/* <TableCell className="tableCell">{row.method}</TableCell> */}
//           <TableCell className="tableCell">
//             <span className={`status ${row.status}`}>{row.status}</span>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>


const List = () => {
  const [nodes, setNodes] = useState({});
  const [isLoading, setLoading] = useState(true);

  const correoUsuario = "lgrandab@gmail.com"

  const [arrayProyectos, setArrayProyectos] = useState(null);

  const citiesRef = collection(db, "usuarios/lgrandab@gmail.com/cities");

  async function buscarProyectoOrCrearProyecto(idDocumento) {
    //crear referencia al documento
    const docuRef = doc(db, `usuarios/${correoUsuario}/cities`);

    //Buscar documento
    const consulta = await getDoc(docuRef);

    //revisar si existe
    if (consulta.exists()) {
      // si sí existe 
      const infoDocu = consulta.data();
      return infoDocu.proyectos;
    } else {
      // si no existe
      console.log("No existe el documento");
      //await setDoc(docuRef, { tareas: [...fakeData] })
      const consulta = await getDoc(docuRef);
      const infoDocu = consulta.data();
      //return infoDocu.proyectos;
      return infoDocu.tareas;

    }
  }

  useEffect(() => {
    async function obtenerProyectos() {
      const proyectosFetchadas = await buscarProyectoOrCrearProyecto(
        correoUsuario
      );
      setArrayProyectos(proyectosFetchadas);
    }
    obtenerProyectos();
  }, [])


  async function getCities() {

    await setDoc(doc(citiesRef, "SF"), {
      name: "San Francisco",
      state: "CA",
      country: "USA",
      capital: false,
      population: 860000,
      regions: ["west_coast", "norcal"]
    });
    await setDoc(doc(citiesRef, "LA"), {
      name: "Los Angeles", state: "CA", country: "USA",
      capital: false, population: 3900000,
      regions: ["west_coast", "socal"]
    });
    await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.", state: null, country: "USA",
      capital: true, population: 680000,
      regions: ["east_coast"]
    });
    await setDoc(doc(citiesRef, "TOK"), {
      name: "Tokyo", state: null, country: "Japan",
      capital: true, population: 9000000,
      regions: ["kanto", "honshu"]
    });
    await setDoc(doc(citiesRef, "BJ"), {
      name: "Beijing", state: null, country: "China",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"]
    });
  }
  //Recuperar el contenido de un solo documento
  async function getData() {
    var rows = [];
    var docRef = collection(db, "proyectos-investigacion");
    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data().proyectos.equipos);
      try {
          rows.push({
          id: doc.id,
          capacitacion: doc.data().proyectos.capacitacion,
          honorarios: doc.data().proyectos.honorarios,
          observaciones: doc.data().proyectos.observaciones,
          totalGastos: doc.data().proyectos.totalGastosDirectos,
          viaticos: doc.data().proyectos.viaticosSubsistenciasMovilizacion,
          status: "Pending",
        })
        }
        catch (e) {
            console.log(e);
        }
    });
    //console.log(rows);
    return rows;
  }


  useEffect(() => {
    getAllNodes();
  }, []);

  const getAllNodes = () => {
    getData().then((response) => {
      setNodes(response);
      setLoading(false);
    });
  };
  if (isLoading) {
    return <div className="App">Cargando...</div>;
  }
  return (
    
    <div className="Container">


      <TableContainer component={Paper} className="table">

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Proyecto de Investigación</TableCell>
              <TableCell className="tableCell">Identificador</TableCell>
              <TableCell className="tableCell">capacitacion</TableCell>
              <TableCell className="tableCell">honorarios</TableCell>
              <TableCell className="tableCell">observaciones</TableCell>
              <TableCell className="tableCell">Viaticos</TableCell>
              {/* <TableCell className="tableCell">Payment Method</TableCell> */}
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {/* <img src={row.img} alt="" className="image" /> */}
                    {row.capacitacion}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.honorarios}</TableCell>
                <TableCell className="tableCell">{row.observaciones}</TableCell>
                <TableCell className="tableCell">{row.totalGastos}</TableCell>
                <TableCell className="tableCell">{row.viaticos}</TableCell>
                {/* <TableCell className="tableCell">{row.method}</TableCell> */}
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>


      <button onClick={getCities}> Set cities</button>
      <button onClick={getData}> get Data</button>
     
    </div>

  );

  
};

export default List;

/**
 *  <button onClick={getData3}> get Data 3</button>
 * 
 * 
 * async function getData3() {

    const q = query(collection(db, "cities"), where("capital", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  


 */
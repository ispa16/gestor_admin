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
    const docRef = doc(db, "usuarios/lgrandab@gmail.com/cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().name);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function getData3() {

    const q = query(collection(db, "cities"), where("capital", "==", true));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

  const rows = [
    {
      id: 1143155,
      product: "Innovación",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Luis Granda",
      date: "1 Enero",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Proyecto Ascendere",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 Febrero",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 Marzo",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 Abril",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 Mayo",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];


  return (
    <div className="Container">


      <TableContainer component={Paper} className="table">

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Proyecto de Investigación</TableCell>
              <TableCell className="tableCell">Identificador</TableCell>
              <TableCell className="tableCell">Docente</TableCell>
              <TableCell className="tableCell">Fecha</TableCell>
              <TableCell className="tableCell">Cantidad</TableCell>
              {/* <TableCell className="tableCell">Payment Method</TableCell> */}
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {/* <img src={row.img} alt="" className="image" /> */}
                    {row.product}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
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
      <button onClick={getData3}> get Data 3</button>
    </div>

  );
};

export default List;


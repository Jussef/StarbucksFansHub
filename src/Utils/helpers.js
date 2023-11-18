import { ref, onValue, set, update, remove, onChildChanged, orderByChild, equalTo, get, query } from "firebase/database";
import { db } from "../config/firebase.js";
import * as data from "./bd.json";

export function getWeekNumber() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000; // 1 day = 86400000 milliseconds
  const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return weekNumber;
}

export function getWeekDays() {
  const date = new Date();
  const days = [];
  let firstDay;
  let lastDay;

  // Calcula el primer y último día de la semana
  if (date.getDay() == 0) {
    firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() - 7 + 1);
    lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  } else {
    firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
    lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
  }

  // Formatea las fechas
  const options = { month: "long", day: "numeric" };
  const firstDayFormatted = firstDay.toLocaleDateString("es-MX", options);
  const lastDayFormatted = lastDay.toLocaleDateString("es-MX", options);

  // Función para formatear la fecha
  function formatDate(dateString) {
    const dateParts = dateString.split(" ");
    return `${dateParts[0]} ${dateParts[2]}`;
  }

  days.push(firstDayFormatted);
  days.push(lastDayFormatted);

  return days;
}

export function getDataWeekNumber() {
  const dayWeek = getWeekNumber();
  const numbersWeek = [];
  const deposito = data[dayWeek].deposito;
  const balance = data[dayWeek].balance;
  const quincena = data[dayWeek].quincena;
  numbersWeek.push(deposito);
  numbersWeek.push(balance);
  //   if (quincena == undefined) {
  //       numbersWeek.push("Esta semana no es quincena")
  //   } else {
  //       numbersWeek.push(quincena)
  //   }
  numbersWeek.push(quincena);
  return numbersWeek;
}

// ***
// ***
// FUNCIONES GENERALES Y DATA BASE
// ***
// ***

// leer datos
export const getCollections = async (collection) => {
  let data = {};
  const dataSnapshot = await get(query(ref(db, `${collection}`)));
  if (dataSnapshot.exists()) {
    data = Object.values(dataSnapshot.val());
  }
  return data;
};

// leer datos
export const getCollectionsComplete = async (collection) => {
  let data = {};
  const dataSnapshot = await get(query(ref(db, `${collection}`)));
  if (dataSnapshot.exists()) {
    data = dataSnapshot.val();
  }
  return data;
};

// leer datos nodos
export const getDataNodo = async (collection) => {
  let data = {};
  const dataSnapshot = await get(query(ref(db, `${collection}`)));
  if (dataSnapshot.exists()) {
    data = dataSnapshot.val();
    const keys = Object.keys(data); // Obtenemos las claves (keys) de los documentos
    keys.forEach((key) => {
      console.log(key);
    });
  }
  return data;
};

// set datos
export const setData = async (collection, id, json) => {
  set(ref(db, `${collection}/${id}`), json).catch((e) => console.log(e));
};

// buscar dato por id
export const searchData = async (collection, id) => {
  let json = {};
  const dbRef = ref(db, `${collection}/${id}`);
  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      json = snapshot.val();
      // console.log(snapshot.val());
    }
  });
  // console.log(json);
  return json;
};

// buscar dato por valor
export const searchDataByValue = async (collection, key, value) => {
  let data = {};
  const dataSnapshot = await get(query(ref(db, `${collection}`), orderByChild(`${key}`), equalTo(`${value}`)));
  if (dataSnapshot.exists()) {
    data = Object.values(dataSnapshot.val())[0];
  }
  return data;
};

// actualizar datos
export const updateData = async (collection, id, json) => {
  update(ref(db, `${collection}/${id}`), json).catch((e) => console.log(e));
};

// actualizar datos sin ID
export const updateDataSimple = async (collection, json) => {
  update(ref(db, `${collection}`), json).catch((e) => console.log(e));
};

// actualizar datos solo valores
export const updateDataValue = async (collection, campo, valor) => {
  const updateObj = {
    [campo]: valor, // Utiliza la cadena como valor para el campo especificado
  };
  try {
    await update(ref(db, collection), updateObj);
  } catch (e) {
    console.error("Error al actualizar los datos:", e);
  }
};

// actualizar datos desde terminal
export const pushDB = async () => {
  // const json = {
  //   gastos: {
  //    '0' : '1-32324',
  //    '1' : '2-43445',
  //   },
  // };
  // update(ref(db, `quincenas/q1`), json).catch((e) => console.log(e));
  const json = {
    "2-43445": {
      costo: 500,
      nombre: "ropa",
    },
  };
  update(ref(db, `quincenas/cardsGasto`), json).catch((e) => console.log(e));
};

// borrar datos
export const deleteData = async (collection, id) => {
  remove(ref(db, `/${collection}/${id}`))
    .then(() => {
      console.log("eliminado correctamente");
    })
    .catch((e) => {
      console.log(e);
    });
};

// child changed
export async function childChange(collection) {
  let json = {};
  const collectionRef = ref(db, `${collection}/`);
  onChildChanged(collectionRef, (data) => {
    json = data.val();
  });
  return json;
}

export async function cambiosDB(collection) {
  // Escucha cambios en la base de datos en tiempo real
  let data;
  const unsubscribe = onValue(collection, (snapshot) => {
    if (snapshot.exists()) {
      // Los datos en la base de datos han cambiado
      data = snapshot.val();
    }
  });
  return data;
}

//--------------------------------------------------------------------------------------//
//-----------------------------FUNCIONES GENERALES--------------------------------------//
//--------------------------------------------------------------------------------------//

export function getDate() {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();
  let day = today.getDate().toString();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  const meridian = hours < 12 ? "am" : "pm";
  if (month.toString().length === 1) {
    month = "0" + month;
  }
  if (day.toString().length === 1) {
    day = "0" + day;
  }
  if (hours.toString().length === 1) {
    hours = "0" + hours;
  }
  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  if (seconds.toString().length === 1) {
    seconds = "0" + seconds;
  }
  let date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${meridian}`;
  return date;
}

export function getHora() {
  const today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  const meridian = hours < 12 ? "am" : "pm";
  if (hours.toString().length === 1) {
    hours = "0" + hours;
  }
  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  if (seconds.toString().length === 1) {
    seconds = "0" + seconds;
  }
  let date = `${hours}:${minutes}:${seconds} ${meridian}`;
  return date;
}

export function downloadFile(file, name) {
  const link = document.createElement("a");
  link.href = `${file}`;
  link.download = `${name}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

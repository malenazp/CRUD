//CRUD: Create Reade Update Delete

firebase.initializeApp({
    apiKey: "AIzaSyA6_7DEzX0easssl5tPjXR8fOdLrN2uFPs",
    authDomain: "femmecrud.firebaseapp.com",
    projectId: "femmecrud",
});

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

//Agregar documentos
function guardar() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    db.collection("users").add({
        first: nombre,
        last: apellido,
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//Leer documentos
const tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}')">Editar</button></td>
      </tr>
      `
    });
});

//Borrar documentos
function eliminar(id) {
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//Editar documentos
function editar(id, nombre, apellido) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;

    const boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function () {
        const usersRef = db.collection("users").doc(id);
        // Set the "capital" field of the city 'DC'

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;

        return usersRef.update({
            first: nombre,
            last: apellido,
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML = 'Guardar';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}




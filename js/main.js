
function searchOnEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
    }
}


function performSearch() {
    const searchTerm = document.getElementById("searchInput").value;
    console.log("Búsqueda realizada:", searchTerm);
}
document.getElementById("searchInput").addEventListener("keypress", searchOnEnter);

// Mostrar el estado del usuario logueado
function displayUserStatus() {
    const userStatus = document.getElementById("userStatus");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        userStatus.innerHTML = `
            <p class="buttoncito">Bienvenido, ${loggedInUser.username}</p>
            <button id="logoutButton">Cerrar Sesión</button>
        `;
        document.getElementById("logoutButton").addEventListener("click", logout);
    } else {
        userStatus.innerHTML = `
            <a href="login.html" class="arba">Iniciar Sesión</a>  
            <a href="register.html" class="abjo">Registrarse</a>
        `;
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
}

// Crear elemento del foro
function createForumElement(forum, index) {
    const forumElement = document.createElement("div");
    forumElement.classList.add("forum");

    const forumLink = document.createElement("a");
    forumLink.href = `forum.html?name=${encodeURIComponent(forum.name)}`;
    forumLink.innerText = forum.name;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("forum-buttons");

    const editButton = document.createElement("button");
    editButton.innerText = "Modificar";
    editButton.classList.add("forum-button", "edit");
    editButton.addEventListener("click", () => editForum(index));

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Borrar";
    deleteButton.classList.add("forum-button", "delete");
    deleteButton.addEventListener("click", () => deleteForum(index));

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    forumElement.appendChild(forumLink);
    forumElement.appendChild(buttonsDiv);

    return forumElement;
}

// Función para mostrar los foros en la página
function renderForums() {
    const forumList = document.getElementById("forumList");
    forumList.innerHTML = "";
    const forums = JSON.parse(localStorage.getItem("forums")) || [];
    forums.forEach((forum, index) => {
        const forumElement = createForumElement(forum, index);
        forumList.appendChild(forumElement);
    });
}

// Editar foro
function editForum(index) {
    let forums = JSON.parse(localStorage.getItem("forums")) || [];
    let forum = forums[index];
    if (forum) {
        const newForumName = prompt("Modificar nombre del foro:", forum.name);
        const newForumQuestion = prompt("Modificar pregunta del foro:", forum.question);
        if (newForumName !== null && newForumName.trim() !== "" && newForumQuestion !== null && newForumQuestion.trim() !== "") {
            forum.name = newForumName;
            forum.question = newForumQuestion;
            localStorage.setItem("forums", JSON.stringify(forums));
            renderForums();
        }
    }
}

// Borrar foro
function deleteForum(index) {
    if (confirm("¿Estás seguro de que quieres borrar este foro?")) {
        let forums = JSON.parse(localStorage.getItem("forums")) || [];
        forums.splice(index, 1);
        localStorage.setItem("forums", JSON.stringify(forums));
        renderForums();
    }
}

// Función principal
function main() {
    displayUserStatus();
    renderForums();
}

// Llamada a la función principal
main();





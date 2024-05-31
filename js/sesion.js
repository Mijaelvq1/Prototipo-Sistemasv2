document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar las credenciales
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        // Guardar el usuario logueado en localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert("Inicio de sesión exitoso.");
        window.location.href = "main.html"; // Redirigir a la página principal
    } else {
        alert("Correo electrónico o contraseña incorrectos.");
    }
});

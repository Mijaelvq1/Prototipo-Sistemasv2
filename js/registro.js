document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el correo ya está registrado
    if (users.some(user => user.email === email)) {
        alert("El correo electrónico ya está registrado.");
        return;
    }

    // Guardar el nuevo usuario
    users.push({ email, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
});

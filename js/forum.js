
const urlParams = new URLSearchParams(window.location.search);
const forumName = urlParams.get('name');


document.getElementById("forumTitle").innerText = forumName;


function loadForumContent() {
    const forums = JSON.parse(localStorage.getItem("forums")) || [];
    const forum = forums.find(f => f.name === forumName);
    if (forum) {
        const forumContent = document.getElementById("forumContent");
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.innerText = forum.question;
        forumContent.appendChild(questionElement);


        forum.answers = forum.answers || [];
        forum.answers.forEach((answer, index) => {
            const answerElement = createAnswerElement(answer, index);
            forumContent.appendChild(answerElement);
        });
    }
}

function createAnswerElement(answer, index) {
    const answerElement = document.createElement("div");
    answerElement.classList.add("answer");

    const answerText = document.createElement("span");
    answerText.innerText = answer;

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("answer-buttons");

    const editButton = document.createElement("button");
    editButton.innerText = "Modificar";
    editButton.classList.add("answer-button", "edit");
    editButton.addEventListener("click", () => editAnswer(index));

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Borrar";
    deleteButton.classList.add("answer-button", "delete");
    deleteButton.addEventListener("click", () => deleteAnswer(index));

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    answerElement.appendChild(answerText);
    answerElement.appendChild(buttonsDiv);

    return answerElement;
}

document.getElementById("answerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const answerInput = document.getElementById("answerInput");
    const answer = answerInput.value;

    let forums = JSON.parse(localStorage.getItem("forums")) || [];
    let forum = forums.find(f => f.name === forumName);
    if (forum) {
        forum.answers = forum.answers || [];
        forum.answers.push(answer);
        localStorage.setItem("forums", JSON.stringify(forums));

 
        const answerElement = createAnswerElement(answer, forum.answers.length - 1);
        document.getElementById("forumContent").appendChild(answerElement);

        answerInput.value = "";
    }
});


function editAnswer(index) {
    let forums = JSON.parse(localStorage.getItem("forums")) || [];
    let forum = forums.find(f => f.name === forumName);
    if (forum) {
        const newAnswer = prompt("Modificar respuesta:", forum.answers[index]);
        if (newAnswer !== null && newAnswer.trim() !== "") {
            forum.answers[index] = newAnswer;
            localStorage.setItem("forums", JSON.stringify(forums));
            document.getElementById("forumContent").innerHTML = "";
            loadForumContent();
        }
    }
}


function deleteAnswer(index) {
    if (confirm("¿Estás seguro de que quieres borrar esta respuesta?")) {
        let forums = JSON.parse(localStorage.getItem("forums")) || [];
        let forum = forums.find(f => f.name === forumName);
        if (forum) {
            forum.answers.splice(index, 1);
            localStorage.setItem("forums", JSON.stringify(forums));
            document.getElementById("forumContent").innerHTML = "";
            loadForumContent();
        }
    }
}

loadForumContent();

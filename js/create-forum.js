document.getElementById("createForumForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const forumName = document.getElementById("forumName").value;
    const forumQuestion = document.getElementById("forumQuestion").value;

    const forum = {
        name: forumName,
        question: forumQuestion
    };


    let forums = JSON.parse(localStorage.getItem("forums")) || [];
    forums.push(forum);
    localStorage.setItem("forums", JSON.stringify(forums));


    window.location.href = "main.html";
});

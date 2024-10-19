// Check if the user has already voted
if (localStorage.getItem("hasVoted")) {
    showThankYouMessage();
    showResults();
}

const voteButtons = document.querySelectorAll('.vote-button');
voteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const name = document.getElementById("name-input").value;

        if (!name) {
            alert("Please enter your name before voting!");
            return;
        }

        const option = this.getAttribute('data-option');

        // Save the vote in localStorage
        localStorage.setItem("hasVoted", true);
        saveVote(name, option);

        // Hide voting section and show thank you message
        showThankYouMessage();
        showResults();
    });
});

function saveVote(name, option) {
    // Retrieve existing votes from localStorage, or create a new array if none exist
    let votes = JSON.parse(localStorage.getItem("votes")) || [];
    votes.push({ name: name, option: option });

    // Save the updated votes array back to localStorage
    localStorage.setItem("votes", JSON.stringify(votes));
}

function showThankYouMessage() {
    document.getElementById("voting-section").style.display = "none";
    document.getElementById("thank-you-message").style.display = "block";
    const voterName = localStorage.getItem("voterName");
    const votedOption = localStorage.getItem("votedOption");
    document.getElementById("result-message").textContent = `${voterName}, you voted for ${votedOption}!`;
}

function showResults() {
    document.getElementById("results-section").style.display = "block";

    // Retrieve the votes from localStorage
    const votes = JSON.parse(localStorage.getItem("votes")) || [];

    // Display the results
    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = ''; // Clear previous results

    votes.forEach(vote => {
        const listItem = document.createElement('li');
        listItem.textContent = `${vote.name} voted for ${vote.option}`;
        resultsList.appendChild(listItem);
    });
}

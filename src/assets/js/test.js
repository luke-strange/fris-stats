const playerStats = {};

document.getElementById('goalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const assistNumber = document.getElementById('assistNumber').value;
    const goalNumber = document.getElementById('goalNumber').value;

    updatePlayerStats(assistNumber, 'assists');
    updatePlayerStats(goalNumber, 'goals');

    updateTable();

    // Clear the form inputs
    document.getElementById('goalForm').reset();
});

document.getElementById('blockForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const blockNumber = document.getElementById('blockNumber').value;

    updatePlayerStats(blockNumber, 'blocks');

    updateTable();

    // Clear the form inputs
    document.getElementById('blockForm').reset();
});

function updatePlayerStats(shirtNumber, action) {
    if (!playerStats[shirtNumber]) {
        playerStats[shirtNumber] = { assists: 0, goals: 0, blocks: 0 };
    }
    playerStats[shirtNumber][action] += 1;
}

function updateTable() {
    const tbody = document.getElementById('statsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    for (const player in playerStats) {
        const newRow = tbody.insertRow();
        newRow.setAttribute('data-player', player);

        const shirtNumberCell = newRow.insertCell(0);
        const totalAssistsCell = newRow.insertCell(1);
        const totalGoalsCell = newRow.insertCell(2);
        const totalBlocksCell = newRow.insertCell(3);
        const actionsCell = newRow.insertCell(4);

        shirtNumberCell.textContent = player;
        totalAssistsCell.textContent = playerStats[player].assists;
        totalGoalsCell.textContent = playerStats[player].goals;
        totalBlocksCell.textContent = playerStats[player].blocks;

        actionsCell.innerHTML = '<button onclick="editRow(this)">Edit</button>';
    }
}

function editRow(button) {
    const row = button.closest('tr');
    const player = row.getAttribute('data-player');
    const cells = row.children;

    for (let i = 0; i < 4; i++) {
        const cell = cells[i];
        const value = cell.textContent;
        cell.innerHTML = `<input type="number" value="${value}">`;
    }

    cells[4].innerHTML = '<button onclick="updateRow(this)">Update</button>';
}

function updateRow(button) {
    const row = button.closest('tr');
    const player = row.getAttribute('data-player');
    const cells = row.children;

    playerStats[player].assists = parseInt(cells[1].children[0].value);
    playerStats[player].goals = parseInt(cells[2].children[0].value);
    playerStats[player].blocks = parseInt(cells[3].children[0].value);

    updateTable();
}

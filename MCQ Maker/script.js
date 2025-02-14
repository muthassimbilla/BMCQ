// Initialize output history array
let outputHistory = [];

// Function to update the output dynamically
function updateOutput() {
  const q = document.getElementById('q').value || '';
  const option1 = document.getElementById('option1').value || '';
  const option2 = document.getElementById('option2').value || '';
  const option3 = document.getElementById('option3').value || '';
  const option4 = document.getElementById('option4').value || '';
  const answer = document.getElementById('answer').value || '0';

  const output = `{
    q: '${q}',
    options: ['${option1}', '${option2}', '${option3}', '${option4}'],
    answer: ${answer}
  }`;

  document.getElementById('output').textContent = output;
}

// Attach event listeners to all input fields and select
document.querySelectorAll('.box input, .box select').forEach(input => {
  input.addEventListener('input', updateOutput);
});

// Copy output to clipboard and reset fields
function copyAndReset() {
  const outputText = document.getElementById('output').textContent;

  // Add output to history
  outputHistory.push(outputText);

  // Copy to clipboard
  navigator.clipboard.writeText(outputText);

  // Reset all input fields
  document.getElementById('q').value = '';
  document.getElementById('option1').value = '';
  document.getElementById('option2').value = '';
  document.getElementById('option3').value = '';
  document.getElementById('option4').value = '';
  document.getElementById('answer').value = '1';

  // Reset the output section
  document.getElementById('output').textContent = `{
    q: '',
    options: ['', '', '', ''],
    answer: 0
  }`;
}

// Open history modal
function openHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = ''; // Clear previous history

  if (outputHistory.length === 0) {
    historyList.innerHTML = '<p>No history available.</p>';
  } else {
    outputHistory.forEach((item, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.textContent = `#${index + 1}: ${item}`;
      historyList.appendChild(historyItem);
    });
  }

  document.getElementById('historyModal').style.display = 'flex';
}

// Close history modal
function closeHistory() {
  document.getElementById('historyModal').style.display = 'none';
}

// Initial output update
updateOutput();
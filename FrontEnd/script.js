const baseUrl = 'http://localhost:8080/api';

function createCustomer() {
  const data = {
    name: document.getElementById('custName').value,
    email: document.getElementById('custEmail').value,
    phonenumber: document.getElementById('custPhone').value,
    address: document.getElementById('custAddress').value,
  };

  fetch(`${baseUrl}/customers`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => document.getElementById('custResponse').innerText = msg)
    .catch(err => alert("Error: " + err));
}

function applyLoan() {
  const data = {
    customerId: document.getElementById('loanCustomerId').value,
    loanType: document.getElementById('loanType').value.toUpperCase(),
    amount: parseFloat(document.getElementById('loanAmount').value),
    interestRate: parseFloat(document.getElementById('loanInterest').value)
  };

  fetch(`${baseUrl}/loans/apply`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => document.getElementById('loanResponse').innerText = msg)
    .catch(err => alert("Error: " + err));
}

function getLoans() {
  fetch(`${baseUrl}/loans`)
    .then(res => res.json())
    .then(data => document.getElementById('loanList').innerText = JSON.stringify(data, null, 2))
    .catch(err => alert("Error: " + err));
}

function updateLoanStatus() {
  const id = document.getElementById('updateLoanId').value;
  const status = document.getElementById('updateStatus').value.toUpperCase();

  fetch(`${baseUrl}/loans/${id}/${status}`, {
    method: 'PUT'
  })
    .then(res => res.json())
    .then(success => {
      document.getElementById('updateResponse').innerText =
        success ? 'Loan status updated successfully' : 'Loan not found or update failed';
    })
    .catch(err => alert("Error: " + err));
}

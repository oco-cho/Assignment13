let acct;

const bankAccount = function (ownerName) {
    let balance = 0;
    let owner = ownerName;
    return {
        withdrawal: function(withdrawalAmount) {
            if (parseFloat(withdrawalAmount) <= balance) {
                balance -= parseFloat(withdrawalAmount);
            } else {
                alert('The amount you are attempting to withdraw exceeds your balance.');
                document.getElementById('amount').focus();
            }
            document.getElementById('balance').innerHTML = balance.toFixed(2);
        },
        deposit: function(depositAmount) {
            if (parseFloat(depositAmount) >= 1) {
            balance += parseFloat(depositAmount);
            document.getElementById('balance').innerHTML = balance.toFixed(2);
        } else {
            alert('Minimum deposit amount is $1.');
            document.getElementById('amount').focus();
        }
        },
        getBalance: function() {
            return balance;
        },
        getOwnerName: function() {
            return owner;
        }
    };
};

window.addEventListener('load', () => {
    
    document.getElementById('btn1').addEventListener('click', () => {
        document.getElementById('btn1').setAttribute('class', 'hide');
        document.getElementById('signin').removeAttribute('class');
        document.getElementById('customer').focus();
    });

    document.getElementById('btn-signin').addEventListener('click', (e) => {
        e.preventDefault();
        acct = bankAccount(document.getElementById('customer').value);
        document.getElementById('screen1').classList.add('hide');
        document.getElementById('screen2').classList.remove('hide');
        document.getElementById('customerName').innerHTML = acct.getOwnerName();
        document.getElementById('balance').innerHTML = acct.getBalance().toFixed(2);
        document.getElementById('amount').focus();
    });

    document.getElementById('btn2').addEventListener('click', (e) => {
        acct.deposit(document.getElementById('amount').value);
        document.getElementById('amount').value = "";
        document.getElementById('amount').focus();
    });

    document.getElementById('btn3').addEventListener('click', (e) => {
        acct.withdrawal(document.getElementById('amount').value);
        document.getElementById('amount').value = "";
        document.getElementById('amount').focus();
    });
});




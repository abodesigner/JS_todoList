//populate values from array of objects to select element
(function (){
    // create services array of objects
    const services = [{
            value: 1,
            title: "great- 20%"
        },
        {
            value: 2,
            title: "ok   - 10%"
        },
        {
            value: 3,
            title: "bad  - 2%"
        }
    ];

    // loop through services using forEach
    services.forEach(function(service){
        const option = document.createElement('option');
        option.textContent = service.title;
        option.value = service.value;

        // grab the parent element, then append the option child
        const selectElement = document.getElementById('input-service');
        selectElement.appendChild(option);
    });

    // get all values from form
    const form = document.getElementById('tip-form');
    const amount = document.getElementById('input-amount');
    const users = document.getElementById('input-users');
    const service = document.getElementById('input-service');

    // customer feedback
    const feedback = document.querySelector('.showMessage');
    const loader = document.querySelector('.loader');
    const result = document.querySelector('.result');

    // submit form
    form.addEventListener("submit", function(e){
        e.preventDefault();

        let bill = amount.value;
        let people = users.value;
        let quality = service.value;

        // validate input fields
        if( bill === '' || people === '' || quality === '0'){
            feedback.classList.add('showItem','error');
            feedback.innerHTML = `<p>Empty Values</p>`;

            setTimeout(function(){
                feedback.classList.remove('showItem');
            }, 2000);
        } else if (bill <= '0' || people <= '0') {
            feedback.classList.add('showItem','alert-danger');
            feedback.innerHTML = `<p>Values should be greater than zero</p>`;

            setTimeout(function(){
                feedback.classList.remove('showItem');
            }, 2000);
        } else {
            feedback.classList.add('showItem','success');
            feedback.innerHTML = 'calculating ....';
            loader.classList.add('showItem');

            setTimeout( function(){
                feedback.classList.remove('showItem','success');
                loader.classList.remove('showItem');

                showResults(bill, people, quality);
                resetForm();

            }, 3000)
        }
    });



    function showResults(bill, people, quality){
        let percent = 0;
        if(quality === '1'){
            percent = 0.2;
        } else if(quality === '2'){
            percent = 0.1;
        } else if(quality === '3'){
            percent = 0.02;
        }

        let tipAmount = parseInt(bill) * percent;
        let total = parseInt(bill) + tipAmount;
        let person = total / parseInt(people);

        result.classList.add('showItem');

        document.getElementById('tip-amount').textContent = tipAmount;
        document.getElementById('total-amount').textContent = total;
        document.getElementById('person-amount').textContent = person;

    }

    function resetForm(){
        amount.value = "";
        users.value = "";
        service.value = "";
    }

})();
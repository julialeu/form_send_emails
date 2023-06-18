document.addEventListener('DOMContentLoaded', function() {

    //Select the elements of the HTML

    const email = {
        email: '',
        subject: '',
        message: ''
    }
    const inputEmail = document.querySelector('#email');
    const inputSubject = document.querySelector('#subject');
    const inputMinputSubjectessage = document.querySelector('#message');
    const inputCc = document.querySelector('#cc');
    const form = document.querySelector('#formulario');
    const buttonSubmit = document.querySelector('#formulario button[type="submit"]');
    const buttonReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');



    inputEmail.addEventListener('input', validate);
    inputCc. addEventListener('input', checkCc);
    inputSubject.addEventListener('input', validate); 
    inputMinputSubjectessage.addEventListener('input', validate);
    form.addEventListener('submit', sendEmail);

    buttonReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetForm();

    });

    function validate(e) {

        if(e.target.value.trim() === '') {

            showAlert(`The field ${e.target.id} is mandatory`, e.target.parentElement);
                email[e.target.name] = '';
                checkEmail();
                return;
        }
            

        if(e.target.id === 'email' && !validateEmail(e.target.value)) {
            showAlert('Email format incorrect', e.target.parentElement);
            email[e.target.name] = '';
            checkEmail();
            return;
        }

        cleanAlert(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        checkEmail();
        
    }

    function showAlert(message, reference) {

        cleanAlert(reference);

        const error = document.createElement('P');
        error.textContent = message;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        
        reference.appendChild(error);
    }

    function cleanAlert(reference) {

        const alerta = reference.querySelector('.bg-red-600');

        if(alerta) {
            alerta.remove();
        }
    }

    function validateEmail(email) {

        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const result = regex.test(email);

        return result;
    }

    function checkEmail() {
        
        if(Object.values(email).includes('')) {
            buttonSubmit.classList.add('opacity-50');
            buttonSubmit.disabled = true;
            return;
        }

        buttonSubmit.classList.remove('opacity-50');
        buttonSubmit.disabled = false;
    }

    function sendEmail(e) {
            e.preventDefault();
            spinner.classList.add('flex');
            spinner.classList.remove('hidden');

            setTimeout(() => {
                spinner.classList.remove('flex');
                spinner.classList.add('hidden');

                resetForm();

                const success = document.createElement('p');
                success.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
                'font-bold', 'text-sm', 'uppercase');
                success.textContent = 'Message sent successfully';
                form.appendChild(success);

                setTimeout(() => {
                        success.remove();
                }, 3000)
            }, 3000);
    }

    function resetForm() {
        email.email = '';
        email.subject = '';
        email.message = '';
        email.cc = ''

        form.reset();
        checkEmail();
    }

    function checkCc(e){
        
        email[e.target.id] = e.target.value.trim().toLowerCase();
        
        if(e.target.value === ''){
            delete email.cc;
            cleanAlert(inputCc.parentElement);
            comprobarEmail();
            return;
        }
        
        if(!validateEmail(e.target.value)){
            showAlert('Email format incorrect', e.target.parentElement);
            email.cc = '';
            checkEmail();
        }else{
            cleanAlert(inputCc.parentElement);
        }        
    }
});
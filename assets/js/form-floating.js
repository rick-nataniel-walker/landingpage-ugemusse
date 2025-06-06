// Updated form submission handling
const form = document.getElementById('appointmentForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validation
    let isValid = true;
    const inputs = form.querySelectorAll('.form-control, .form-select');

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (isValid) {
        // Show success message
        alert('Solicitação enviada com sucesso! Entraremos em contato em breve para confirmar sua consultoria.');
        form.reset();

        // Reset floating labels
        document.querySelectorAll('.form-floating').forEach(el => {
            el.classList.remove('focused');
        });
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});
document.getElementById('doctor-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting the traditional way
    const doctorName = document.getElementById('doctor-name').value; // Gets the doctor's name
    if (doctorName) {
      // Redirects to the surgery options page with the doctor's name in the URL
      window.location.href = `surgery-options.html?doctor=${encodeURIComponent(doctorName)}`;
    }
  });
  
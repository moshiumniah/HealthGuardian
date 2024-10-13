window.onload = function() {
    // Extracts the doctor's name from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const doctorName = params.get('doctor');
  
    // Displays the greeting if a doctor's name is provided
    if (doctorName) {
      const greetingElement = document.getElementById('greeting');
      greetingElement.innerHTML = `<h2>Hello, ${doctorName}</h2>`;
    }
  };
  
document.getElementById('export-json').addEventListener('click', exportJSON);

function exportJSON() {
  // Collect form data
  const formData = new FormData(document.getElementById('vehicle-parameters'));

  // Convert form data to a JSON object
  const jsonData = Object.fromEntries(formData.entries());

  // Create a Blob from the JSON object
  const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

  // Create a download link for the Blob
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'user-data.json';

  // Click the link to start the download
  link.click();

  // Clean up the created URL
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
  }, 100);
}

function openTab(evt, tabName) {
  let i, tabcontent, tablinks;

  // Hide all tab contents
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Deactivate all tab links
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Set the default tab to be opened
document.getElementById("defaultOpen").click();

function updatePlots() {
  // Get the input values from the form elements
  var param1 = parseFloat(document.getElementById("longitudinal-friction").value);
  var param2 = parseFloat(document.getElementById("lateral-friction").value);
  // ... add other parameters as needed
console.log(param1);
console.log(param2);
  // Create the data and layout objects for each plot
  var trace1 = {
    x: [0, 1, 2, 3],
    y: [0, 1, 2, 3],
    mode: 'lines',
    name: 'Plot 1'
  };
  
  // ... create other traces as needed

  // Update the plots
  Plotly.newPlot('plot1', {data: [trace1]});
  Plotly.newPlot('plot2', {data: [trace1]});
  Plotly.newPlot('plot3', {data: [trace1]});
  Plotly.newPlot('plot4', {data: [trace1]});
  // ... update other plots as needed
}

// Call the updatePlots function whenever an input value is changed
document.getElementById("longitudinal-friction").addEventListener("change", updatePlots);
document.getElementById("lateral-friction").addEventListener("change", updatePlots);
// ... add other event listeners as needed

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * (2 / 3), window.innerHeight);
document.querySelector(".right").appendChild(renderer.domElement);

// Create the cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  //cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

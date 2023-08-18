// Declare a global variable to store the hash value
var hex = "";

function hash() {
  // Get the file input element
  var fileInput = document.getElementById("fileInput");
  // Check if a file is selected
  if (fileInput.files.length == 0) {
    alert("Please select a file");
    return;
  }
  // Get the first file from the input element
  var file = fileInput.files[0];
  // Create a new FileReader object
  var reader = new FileReader();
  // Define what to do when the reader loads the file
  reader.onload = function (e) {
    // Get the file content as a WordArray object
    var data = CryptoJS.lib.WordArray.create(e.target.result);
    // Compute the RIPEMD-160 hash of the data
    var hash = CryptoJS.RIPEMD160(data);
    // Convert the hash to a hexadecimal string and assign it to the global variable
    hex = hash.toString(CryptoJS.enc.Hex);
    // Display the hash value
    document.getElementById("output").value = hex;
  };
  // Read the file as an array buffer
  reader.readAsArrayBuffer(file);
}

function save() {
  // Check if the hash value is empty
  if (hex == "") {
    alert("Please generate a hash value first");
    return;
  }
  // Get the file input element
  var fileInput = document.getElementById("fileInput");
  // Get the first file from the input element
  var file = fileInput.files[0];
  // Create a Blob object from the hash value
  var blob = new Blob([hex], { type: "text/plain;charset=utf-8" });
  // Save the Blob object as a txt file with the same name as the original file
  saveAs(blob, "Encrypted - " + file.name);
}

function reset() {
  // Clear the global variable
  hex = "";
  // Clear the output element
  document.getElementById("output").value = "";
  // Clear the file input element
  document.getElementById("fileInput").value = "";
}


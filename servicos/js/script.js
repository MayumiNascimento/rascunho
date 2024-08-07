
// document.addEventListener("DOMContentLoaded", () => {
//     const modal = document.getElementById("modal");
//     const openModalBtn = document.getElementById("openModalBtn");
//     const closeModalBtn = document.getElementsByClassName("close")[0];
//     const addRowForm = document.getElementById("addRowForm");
//     const mainTable = document.getElementById("mainTable").getElementsByTagName("tbody")[0];

//     openModalBtn.onclick = function() {
//         modal.style.display = "block";
//     }

//     closeModalBtn.onclick = function() {
//         modal.style.display = "none";
//     }

//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }

//     addRowForm.onsubmit = function(event) {
//         event.preventDefault();
//         const col1 = document.getElementById("col1").value;
//         const col2 = document.getElementById("col2").value;
//         const col3 = document.getElementById("col3").value;

//         const newRow = mainTable.insertRow();
//         newRow.insertCell(0).innerText = col1;
//         newRow.insertCell(1).innerText = col2;
//         newRow.insertCell(2).innerText = col3;

//         modal.style.display = "none";
//         addRowForm.reset();
//     }
// });



// Links to get JSON data through API 
const employeeURL =
  "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
const employeeImageURL =
  "http://sandbox.bittsdevelopment.com/code1/employeepics/";
const employeeRolesURL =
  "http://sandbox.bittsdevelopment.com/code1/fetchroles.php";

//query selector for employee profile card
const employeeListSelector = document.querySelector(".cards");

//Function to fecth employee info
async function getEmployeeList() {
  const employeeListData = await fetch(employeeURL);
  const employeeList = await employeeListData.json();
  var employeeListArray = [];

  for (var i in employeeList)
    employeeListArray.push([i, employeeList[i]]);

  employeeListArray.forEach((employeeItem) => {
    function roles() {
      var values = [];
      for (var j = 0; j < employeeList[employeeItem[0]].roles.length; j++) {
        values.push(
          '<p style="background-color:' +
            employeeList[employeeItem[0]].roles[j].rolecolor +
            '">' +
            employeeList[employeeItem[0]].roles[j].rolename +
            "</p>"
        );
      }
      return values.join("");
    }

    //Function to get crown if Employee is featured
    function crown() {
      var crown = "👑";

      if (employeeList[employeeItem[0]].employeeisfeatured == 1) {
        return crown;
      } else {
        return "";
      }
    }
    employeeListSelector.innerHTML += `
    <div class="card">
      <p class="crown">${crown()}</p>
      <img
        src="${employeeImageURL + employeeItem[0] + ".jpg"}"
        alt="Employee Profile Picture"
        class="card-img"
      />
      <div class="card-content">
        <h2 class="emp-name">${
          employeeList[employeeItem[0]].employeefname +
          " " +
          employeeList[employeeItem[0]].employeelname
        }</h2>
        <p class="emp-bio" id="emp-bio">
          ${employeeList[employeeItem[0]].employeebio}
        </p>
        <div class="tags" id="tags">
          ${roles()}
        </div>
      </div>
    </div>
    `;
  }); 
}
getEmployeeList();

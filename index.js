const {prompt} = require('inquirer');
const mysql = require('mysql2');
const {menuQuestion, departmentQuestions, roleQuestions, employeeQuestions} = require('./questions');
const connection  = require('./db/connection');
const ctable = require('console-table');

connection.connect((err) => {
  if (err) throw err;
  startApp()
})


function startApp () {

return prompt(menuQuestion)

.then(({mainmenu}) => {
switch (mainmenu) {
  case ('View All Departments'):
    viewDepartments()
    break
  case ('View All Roles'):
    viewAllRoles()
    break
  case ('View All Employees'):
    viewAllEmployees()
    break
  case ('Add A Department'):
    addDepartment()
    break
  case ('Add A Role'):
    addRole()
    break
  case ('Add an Employee'):
    addEmployee()
    break
  case ('Update Employee Role'):
    updateEmployeeRole()
    break
}
})
}

function viewDepartments() {
  //select department ID as the ID, department name as department from table department
connection.query(`SELECT * FROM departments ORDER BY id ASC;`,(err,res) => {
  if (err) throw err;
  console.table(res)
  startApp()
})

}

function viewAllRoles() {
  connection.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;', (err, res) => {
    if(err) throw err;
    console.table(res)
    startApp()
  })
}


//doesn't work yet

function viewAllEmployees() {

  connection.query('SELECT employee.role_id, employee.first_name, employee.last_name FROM employee INNER JOIN role ON role.id = employee.id ASC;', (err, res) => {
    if (err) throw err;
    console.table(res)
    startApp()
  })
}

function addDepartment() {
  prompt(departmentQuestions)

  .then((answer) => {
  
    connection.query('INSERT INTO departments SET ?',
    {
      name: answer.newDept,
    },
    (err,res) => {
      if (err) throw err;
      console.log(`${answer.newDept} has been added.`)
      startApp()
    })
  })
}

 function addRole() {
  connection.query('SELECT * FROM departments;', (err, res) => {
    const departmentList = res.map(departments => ({name: departments.name, value: departments.id}))
    const departmentNames = departmentList.map(departments => departments.name)
    if (err) throw err;
    roleQuestions[2].choices = departmentNames
 
  prompt(roleQuestions)

  .then((answer) => {
    connection.query('INSERT INTO role SET ?',
    {
      title: answer.newRole,
      salary: answer.newSalary,
      department_id: departmentList.find(department => answer.addtoDept === department.name).value,
    },
    (err, res) => {
      if (err) throw err
      console.log(`${answer.newRole} has been added.`)
      startApp()
    })
  })
})
}

function addEmployee() {

  connection.query('SELECT * FROM role', (err, res) => {
    const roleList = res.map(role => ({name: role.title}))
    console.log(roleList)
    const roleName = roleList.map(role => role.name)
    console.log(roleName)
    if (err) throw err;
    employeeQuestions[2].choices = roleName
  

  prompt(employeeQuestions)

  .then((answer) => {
    connection.query('INSERT INTO employee SET ?',
    {
      first_name: answer.fName,
      last_name: answer.lName,
      role_id: roleList.find(role => answer.role === role.title),
    },
    (err, res) => {
      if (err) throw err
      console.log(`${answer.fName} has been added as an ${answer.role}.`)
    }
    )
  })
})
}

function updateEmployeeRole() {
  connection.query('SELECT * FROM employee', (res,err) => {
    const employeeList = res.map(({first_name, last_name }) => ({name: first_name + " " + last_name}))
    console.log(employeeList)
  })
}


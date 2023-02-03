const {prompt} = require('inquirer');
const mysql = require('mysql2');
const {menuQuestion, departmentQuestions, roleQuestions, employeeQuestions, updateEmployeeQuestions} = require('./questions');
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
  case ('Exit'):
    process.exit()
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

  connection.query('select e.id AS ID, first_name AS "First Name",last_name AS "Last Name", r.title AS Title , d.name AS Department, r.salary AS Salary , e.manager_id AS "Manager ID" from employee e left join role r on e.role_id = r.id left join departments d on r.department_id = d.id;', (err, res) => {
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
    const roleList = res.map(({title, id}) => ({name: title, role_id: id}))
    // const roleName = roleList.map(role => role.name)
    console.log(roleList)
    if (err) throw err;
    employeeQuestions[2].choices = roleList
  
  
      connection.query('SELECT * FROM employee WHERE manager_id IS NOT NULL', (err,res) => {
        const employeeList = res.map(employee => ({name: employee.first_name, value: employee.manager_id}))
        const employee = employeeList.map(name => name.value)
        // const employeeValue = employeeList.map(value => value.value)
        console.log(employee)
        employeeQuestions[3].choices = employee
     
      
  prompt(employeeQuestions)

  .then((answer) => {
    console.log("answer",answer)
    connection.query('INSERT INTO employee SET ?',
    {
      first_name: answer.fName,
      last_name: answer.lName,
      role_id: answer.role,
      manager_id: 1,
    },
    (err, res) => {
      if (err) throw err
      console.log(`${answer.fName} has been added as an ${answer.role}.`)
    }
    )
  })
})
})
}

function updateEmployeeRole() {
  connection.query('SELECT * FROM employee', (err, res) => {
   const employeeList = res.map(({first_name, last_name,  role_id}) => ({name: first_name + " " + last_name + ", " + role_id}))
   
   updateEmployeeQuestions[0].choices = employeeList
    console.log(employeeList)

    prompt(updateEmployeeQuestions[0]) 

    .then((answer) => {
      connection.query('SELECT * FROM role', (err, res) => {
        console.log(res)
        const roleList = res.map(({title, id}) => ({name: title, role_id: id}))
        updateEmployeeQuestions[1].choices = roleList
        prompt(updateEmployeeQuestions[1])

        .then((answer) => {
          
        })
      })
    })
  })
}


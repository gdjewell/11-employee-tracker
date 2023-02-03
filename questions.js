

const menuQuestion = [

  {
    type: 'list',
    name: 'mainmenu',
    message: 'Please select one of the following options.',
    choices: [ 'View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add an Employee', 'Update Employee Role'],
    pageSize: 5,
  },
  
]

const departmentQuestions = [

  {
    type: 'input',
    name: 'newDept',
    message: 'Please enter the name of the new department you would like to add',
  },
]

const roleQuestions = [
  {
    type: 'input',
    name: 'newRole',
    message: 'Please enter the title of the role you want to add.',
  },

  {
    type: 'input',
    name: 'newSalary',
    message: 'Please enter the salary of the role you want add.',
  },

  {
    type: 'list',
    name: 'addtoDept',
    message: 'Please enter the department you would like to add the role to.',
    choices: [],
  },
]

const employeeQuestions = [
  {
    type:'input',
    name: 'fName',
    message: 'Please enter a first name',
  },

  {
    type: 'input',
    name: 'lName',
    message: 'Please enter a last name',
  },

  {
    type: 'list',
    name: 'role',
    message: 'What is the employee title?',
    choices: [],
  },
]

module.exports = {menuQuestion, departmentQuestions, roleQuestions, employeeQuestions}
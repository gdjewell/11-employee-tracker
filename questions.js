

const menuQuestion = [

  {
    type: 'list',
    name: 'mainmenu',
    message: 'Please select one of the following options.',
    choices: [ 'View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add an Employee', 'Update Employee Role', 'Exit'],
    pageSize: 6,
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

  {
    type: 'list',
    name: 'managerid',
    message: 'Who is the manager?',
    choices: [],
  },
]

const updateEmployeeQuestions = [
  {
    type: 'list',
    name: 'employeeName',
    message: 'What employee would you like to update?',
    choices: [],
  },

  {
    type: 'list',
    name: 'roleName',
    message: 'What would you like to update your role as?',
    choices: [],
  }
]

module.exports = {menuQuestion, departmentQuestions, roleQuestions, employeeQuestions, updateEmployeeQuestions}
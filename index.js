//Libraries
const inquirer = require('inquirer');
const fs = require('fs');
// const art = require('ascii-art');

//Classes
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

//Global Variables
let employees = [];

const opening = [
  {
    type: 'input',
    // art.font('Team Profile Generator', doom, true) +
    message: '\nWelcome to the Team Profile Generator. Please enter the name of the team manager:',
    name: 'name'
  },
  {
    type: 'input',
    message: 'Manager ID number:',
    name: 'id'
  },
  {
    type: 'input',
    message: 'Manager email address:',
    name: 'email'
  },
  {
    type: 'input',
    message: 'Manager office number:',
    name: 'office'
  }
];

const options = [
  {
    type: 'list',
    message: 'Please select an employee type to add member to team. If finished adding team members, select Done.',
    choices: ['Engineer', 'Intern', 'Done'],
    name: 'option'
  }
];

const basics = [
  {
    type: 'input',
    message: 'Please enter name of team member:',
    name: 'name'
  },
  {
    type: 'input',
    message: 'Member ID number:',
    name: 'id'
  },
  {
    type: 'input',
    message: 'Member email address:',
    name: 'email'
  }
];

const engineerQ = [
  ...basics,
  {
    type: 'input',
    message: 'Github username:',
    name: 'github'
  }
];

const internQ = [
  ...basics,
  {
    type: 'input',
    message: 'Name of attended institution:',
    name: 'school'
  }
];

//functions
function generateHTML() {
  let html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Development Team Page</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css">
  </head>
  <body>
    <div>
      <header class='bg-danger d-flex justify-content-center'>
        <h1 class='text-white'>Development Team</h1>
      </header>
    </div>
    <div class='justify-content-center d-flex'>`;
    let card = '';
    let cards = '';
  employees.forEach((employee) => {
    let icon;
    let extra;
    if (employee.getRole() === 'Engineer') {
      icon = '<i class="d-inline fas fa-wrench"></i>'
      extra = `<li class="list-group-item">Github: ${employee.github}</li>\n`
    } else if (employee.getRole() === 'Intern') {
      icon = '<i class="fas fa-graduation-cap"></i>'
      extra = `<li class="list-group-item">School: ${employee.school}</li>\n`
    } else if (employee.getRole() === 'Manager') {
      icon = '<i class="fas fa-mug-hot"></i>'
      extra = `<li class="list-group-item">Office Number: ${employee.officeNumber}</li>\n`
    } else {
      icon = '';
      extra = '';
    };
    card = `<div class="card m-3" style="width: 18rem;">
    <div class="bg-primary card-body">
      <h5 class="card-title">${employee.name}</h5>
      <div>
        ${icon}
        <h6 class="card-subtitle d-inline mb-2">${employee.getRole()}</h6>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${employee.id}</li>
      <li class="list-group-item">Email: ${employee.email}</li>
      ${extra}
    </ul>
    </div>`;
    cards = cards.concat(' ', card);
  })
  let end = `</div>
  </body>
  </html>`
  let fullPage = html + cards + end;
  fs.writeFileSync('./dist/index.html', fullPage);
}

function newEmployee() {
  let startPrompt = inquirer.createPromptModule();
  startPrompt(options)
  .then((answer) => {
    if(answer.option === 'Engineer') {
      inquirer.prompt(engineerQ)
      .then((answer) => {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
        employees.push(engineer);
        newEmployee();
      })
    } else if (answer.option === 'Intern') {
      inquirer.prompt(internQ)
      .then((answer) => {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        employees.push(intern);
        newEmployee();
      })
    } else {
      generateHTML();
      return 
    }
  })
}

function start() {
  let startPrompt = inquirer.createPromptModule();
  startPrompt(opening)
  .then((answers) => {
    let manager = new Manager(answers.name, answers.id, answers.email, answers.office);
    employees.push(manager);
    newEmployee();
  })
  .catch((err) => {
    console.log(err);
  })
}

start();

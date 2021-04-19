// const addBtn = document.querySelector('.btn-add');
const form = document.querySelector('#form');
const taskList = document.querySelector('.task-list');
const filter = document.querySelector('.filter');
const inputTask = document.querySelector('#new-task');
const deleteItem = document.querySelector('.delete');

const tabs = document.querySelectorAll('.tabs-wrap ul li button');
const all = document.querySelectorAll('.add-task');
const actives = document.querySelectorAll('.active');
const dones = document.querySelectorAll('.task-list .add-task p.line-through');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
      tabs.forEach((tab) => {
        tab.classList.remove('choose');
      })

    tab.classList.add('choose');

    let tabval = tab.getAttribute('data-tabs');
    
    all.forEach((item)=>{
			item.style.display = "none";
		})

    if (tabval === 'active') {
       actives.forEach((active) => {
         active.style.display = 'block';
       })
    } else if (tabval === 'line-through') {
      dones.forEach((done) => {
        done.style.display = 'block';
      })
    } else {
      all.forEach((item) => {
        item.style.display = 'block';
      })
    }

  })
  
})


loadEventListeners();

function loadEventListeners() {

  // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    inputTask.addEventListener('keydown', enter)

    form.addEventListener('submit', submit);

    taskList.addEventListener('click', removeItem);

    taskList.addEventListener('click', addImportant);

    taskList.addEventListener('click', throughTask);

    filter.addEventListener('keyup', filterItems);

    tabs.addEventListener('click', action);

}

// Получить данные из Lc 
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
     // Создание li элемента
     const li = document.createElement("li");
     // Добавляем класс
    li.className = 'add-task';

    li.innerHTML = `<p>${task}</p><button class="important">MARK IMPORTANT</button><button class="delete"></button>`;

    taskList.appendChild(li);
  });
}


function enter(e) {
    if (!e.shiftKey && e.keyCode === 13) {
        e.preventDefault();
        // тут код для отправки сообщения
        submit(e);
      }
}

function submit(e) {
    e.preventDefault();
    if(inputTask.value != '')
      addTask(inputTask.value);
    inputTask.value = '';
  }


function addTask(task) {
    // Создание li элемента
    const li = document.createElement("li");
     // Добавляем класс
    li.className = 'add-task';
    li.innerHTML = `<p>${task}</p><button class="important">MARK IMPORTANT</button><button class="delete"></button>`;

    // Хранение в LocalStorage

    storeTaskInLocalStorage(task);
    
    taskList.appendChild(li);
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();

        // remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        removeItem(tasks);
    }
}  

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
      tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addImportant(e) {

    // console.log(e.target);

    const importantBtn = e.target.closest('.important');

    if (importantBtn) {

      const para = e.target.closest('.add-task').querySelector('p');
      const star = document.createElement('span');
      star.innerHTML =  '&#9734;';
      console.log(para);

        if (e.target.textContent === 'MARK IMPORTANT') {
          e.target.textContent = 'NOT IMPORTANT';
          para.prepend(star);
        } else {
          e.target.textContent = 'MARK IMPORTANT';
          para.firstChild.remove();
          // e.target.className == 'important' ? e.target.className = 'unimportant' : e.target.className = 'important';

        }
        e.target.classList.toggle('unimportant');

        para.classList.toggle('bold');
        // Создание звезды
        
        
    }
            
}




function filterItems(e) {
    const text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('.add-task').forEach(function(task){
      const item = task.firstChild.textContent;
    //   console.log(item);
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}

function throughTask(e) {
    const task = e.target.closest('.add-task');

    if (task) {
      const taskText = task.querySelector('p');
      let importantBtn = e.target.closest('.important');
      let removeBtn = e.target.closest('.delete');

      // if (task && !importantBtn && !removeBtn) 
      if (e.target.tagName === 'P') {
        importantBtn = task.querySelector('.important');
        importantBtn.classList.toggle('hidden');

        taskText.classList.toggle('line-through');

      }

    }
}

function action(e) {

  // const tasks = document.querySelectorAll('.task-list .add-task');
  // let filter = e.target.dataset.filter;

  // tasks.forEach(task => {
  //   task.classList.contains(filter)
  //   ? task.classList.remove('invisible') 
  //   : task.classList.add('invisible');

  // });

  // console.log(filter);

  // tabs.forEach((tab) => {
  //   console.log('clicked');
  // })



}
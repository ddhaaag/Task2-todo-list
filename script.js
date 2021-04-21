const form = document.querySelector('#form'),
      taskList = document.querySelector('.task-list'),
      filter = document.querySelector('.filter'),
      inputTask = document.querySelector('#new-task'),
      deleteItem = document.querySelector('.delete'),

      tabsWrap = document.querySelector('.tabs-wrap');

const tabs = document.querySelectorAll('.tabs-wrap > ul > li > button'),
      all = document.querySelectorAll('p'),
      actives = document.querySelectorAll('.task-list > .add-task > p.active'),
      dones = document.querySelectorAll('.task-list > .add-task > p.done'),
      li = document.getElementsByClassName('add-task');

window.onload = () => {
  taskList.innerHTML = localStorage.getItem('todos');
      
  taskList.childNodes.forEach(node => {
    node.style.display = 'block';
  });
};

function updateLocalStorage() {
  localStorage.setItem('todos', taskList.innerHTML);
}

loadEventListeners();

function loadEventListeners() {

    inputTask.addEventListener('keydown', enter)

    form.addEventListener('submit', submit);

    taskList.addEventListener('click', removeItem);

    taskList.addEventListener('click', addImportant);

    taskList.addEventListener('click', throughTask);

    filter.addEventListener('keyup', filterItems);

    tabsWrap.addEventListener('click', action);

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
    
    taskList.appendChild(li);
    updateLocalStorage();
}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        updateLocalStorage();
    }
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

        }
        e.target.classList.toggle('unimportant');

        para.classList.toggle('active');
        // Создание звезды
        updateLocalStorage();
        
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

        taskText.classList.toggle('done');
        updateLocalStorage();
      }

    }
}

function action(e) {

  let btn = e.target.closest('button');

  if (!btn) return;

  const tabs = document.querySelectorAll('.tabs-wrap > ul > li > button');
	const target = e.target;
  Array.from(tabs).forEach(item => {
  	item.classList.remove('choose');
  })
  target.classList.add('choose');
  form.style.display = 'block';
  let value = btn.getAttribute('data-tabs');
  // console.log(value);
  
  Array.from(li).forEach((item) => {
      item.style.display = 'none';
      
  }) 
    
    if (value === 'active') {
        Array.from(li).forEach(item => {
          if (item.firstElementChild.classList.contains('done')) {
                item.style.display = 'none';
          } else {
            item.style.display = 'block';
          }
        })
    } else if (value === 'done') {
      form.style.display = 'none';
        Array.from(li).forEach(item => {
          if (item.firstElementChild.classList.contains('done')) {
              item.style.display = 'block';
          }   
        })
    } else {
        Array.from(li).forEach((item) => {
          item.style.display = 'block';
        })
    } 
};

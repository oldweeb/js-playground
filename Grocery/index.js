const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.querySelector('#grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag = false;
let editID = '';

const createListItem = (id, value) => {
    const element = document.createElement('article');
    let attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add('grocery-item');
    element.innerHTML = `<p class="title">${value}</p>
                            <div class="btn-container">
                                <button type="button" class="edit-btn">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button type="button" class="delete-btn">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>`;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
    list.appendChild(element); 
};

const setupItems = () => {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach((item) => {
            createListItem(item.id, item.value);
        });
        container.classList.add('show-container');
    }
};

const setBackToDefault = () => {
    console.log('set back to default');
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
};

const getLocalStorage = () => {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
};

const addToLocalStorage = (id, value) => {
    const item = { id, value };
    let items = getLocalStorage();
    items.push(item);
    localStorage.setItem('list', JSON.stringify(items));
    console.log(`#${id} added to local storage`);
};

const removeFromLocalStorage = (id) => {
    let items = getLocalStorage();
    items = items.filter((item) => {
        return item.id !== id;
    });
    localStorage.setItem('list', JSON.stringify(items));
    console.log(`#${id} removed from local storage`);
};

const editLocalStorage = (id, value) => {
    let items = getLocalStorage();
    items = items.map((item) => {
        if (item.id == id) {
            item.value = value;
        }
        return item;
    }); 
    localStorage.setItem('list', JSON.stringify(items));
    console.log(`#${id} edited in local storage`);
};

const displayAlert = (text, action) => {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
};

const deleteItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (!list.children.length) {
        container.classList.remove('show-container');
    }
    displayAlert('item removed', 'success');
    setBackToDefault();
    removeFromLocaleStorage(id);
    console.log('item deleted');
};

const editItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement;
    editFlag = true;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    editID = element.dataset.id;
    grocery.value = editElement.innerHTML;
    submitBtn.textContent = 'edit';
    console.log('edit on');
};

const addItem = (e) => {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        console.log('adding item to the list');
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
                            <div class="btn-container">
                                <button type="button" class="edit-btn">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button type="button" class="delete-btn">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>`;
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        list.appendChild(element); 
        displayAlert('item added to the list', 'success');
        container.classList.add('show-container');
        addToLocalStorage(id, value);
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        editLocalStorage(editID, value);
        setBackToDefault();
        console.log('editing');
    } else {
        console.log('empty value');
        displayAlert('please enter value', 'danger');
    }
};

const clearItems = () => {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach((item) => {
            list.removeChild(item);
        });
    }
    container.classList.remove('show-container');
    displayAlert('empty list', 'success');
    localStorage.removeItem('list');
    setBackToDefault();
};

form.addEventListener('submit', addItem);
clearBtn.addEventListener('click', clearItems);
document.addEventListener('DOMContentLoaded', setupItems);

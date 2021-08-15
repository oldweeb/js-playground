const menu = [
    {
        id: 1,
        title: 'buttermilk pancakes',
        category: 'breakfast',
        price: 15.99,
        img: './img/item-1.jpeg'
    },
    {
        id: 2,
        title: 'diner double',
        category: "lunch",
        price: 13.99,
        img: './img/item-2.jpeg'
    },
    {
        id: 3,
        title: 'godzilla milkshake',
        category: 'shakes',
        price: 6.99,
        img: './img/item-3.jpeg'
    },
    {
        id: 4,
        title: 'country delight',
        category: 'breakfast',
        price: 20.99,
        img: './img/item-4.jpeg',
    },
    {
        id: 5,
        title: 'egg attack',
        category: 'lunch',
        price: 22.99,
        img: './img/item-5.jpeg',
    },
    {
        id: 6,
        title: 'oreo dream',
        category: 'shakes',
        price: 18.99,
        img: './img/item-6.jpeg',
    },
    {
        id: 7,
        title: 'bacon overflow',
        category: 'breakfast',
        price: 8.99,
        img: './img/item-7.jpeg',
    },
    {
        id: 8,
        title: 'american classic',
        category: 'lunch',
        price: 12.99,
        img: './img/item-8.jpeg',
    },
    {
        id: 9,
        title: 'quarantine buddy',
        category: 'shakes',
        price: 16.99,
        img: './img/item-9.jpeg',
    },
    {
        id: 10,
        title: 'bison steak',
        category: 'dinner',
        price: 22.99,
        img: './img/item-10.jpeg',
    }
];

var btnContainer;
var itemsContainer;

document.addEventListener('DOMContentLoaded', () => {
    btnContainer = document.querySelector('.btn-container');
    itemsContainer = document.querySelector('.menu-items-container');
    displayItems(menu);
    displayButtons();
});

const displayItems = (items) => {
    let displayedMenu = items.map((item) => {
        return `<article class="menu-item">
                    <img src=${item.img} alt=${item.title} class="photo">
                    <div class="item-info">
                        <header>
                            <h4>${item.title}</h4>
                            <h4 class="price">$${item.price}</h4>
                        </header>
                    </div>
                </article>`
    }).join('');
    itemsContainer.innerHTML = displayedMenu;
};

const displayButtons = () => {
    const categories = menu.reduce(
        (values, item) => {
            if (!values.includes(item.category)) {
                values.push(item.category);
            }
            return values;
        },
        ['all']
    );
    const btns = categories.map(
        (category) => {
            return `<button type="button" class="filter-btn" data-id=${category}>
                        ${category}
                    </button>`
        }
    ).join('');
    btnContainer.innerHTML = btns;
    
    const filterBtns = btnContainer.querySelectorAll('.filter-btn');
    console.log(filterBtns);

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.currentTarget.dataset.id;
            const menuCategory = menu.filter((menuItem) => {
                if (menuItem.category === category) {
                    return menuItem;
                }
            });
            if (category === 'all') {
                displayMenuItems(menu);
            } else {
                displayItems(menuCategory);
            }
        });
    });
};
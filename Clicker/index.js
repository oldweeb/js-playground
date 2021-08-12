var counter = 0;

var gameplayAchievements;

document.addEventListener('DOMContentLoaded', () => {
    const clicker = document.querySelector('.btn-clicker');
    let style = document.createElement('style');
    gameplayAchievements = document.querySelectorAll('#gameplay-item');
    clicker.addEventListener('click', () => {
        const counterEl = document.querySelector('.counter');
        counterEl.innerHTML = (1 + counter++).toString();
        if (counter % 10 === 0) {
            $('.clicker').css('background-color', getRandomColor());
            let cssText = `.btn-clicker:hover {
                background-color: ${getRandomColor()};
            }`;
            if (style.styleSheet) {
                style.styleSheet.cssText = cssText;
            } else {
                style.innerHTML = '';
                style.appendChild(document.createTextNode(cssText));
            }
            let head = document.getElementsByTagName('head')[0];
            console.log(head.lastChild.tagName === 'style');
            if (head.lastChild.tagName === 'style') {
                head.removeChild(head.lastChild);
            }
            head.appendChild(style);
        }
        checkAchievements();
    });
    let enterAchievement = document.querySelector('#none-gameplay-item');
    enterAchievement.children[2].innerHTML = '<i class="fa fa-check"></i> 100%';
    enterAchievement.children[1].children[0].style = 'height: 5px;width: 100%;';
    shakeButton();
});

const shakeButton = () => {
    let style = document.createElement('style');
    let cssText = '.btn-achievements {\
        animation: shake 0.4s infinite;\
    }';
    if (style.styleSheet) {
        style.styleSheet.cssText = cssText;
    } else {
        style.appendChild(document.createTextNode(cssText));
    }
    if (document.getElementsByTagName('body')[0].lastChild.tagName !== 'STYLE') {
        document.getElementsByTagName('body')[0].appendChild(style);
    }
};

const checkAchievements = () => {
    for (let i = 0; i < gameplayAchievements.length; ++i) {
        let goal = parseInt(gameplayAchievements[i].childNodes[1].firstElementChild.innerHTML);
        let percentage = counter / goal < 1 ? (counter / goal) * 100 : 100;
        if (percentage === 100) {
            if (!gameplayAchievements[i].id.includes('seen')) {
                gameplayAchievements[i].id += ' seen';
                shakeButton();
            } else { continue; }
            gameplayAchievements[i].children[2].innerHTML = '<i class="fa fa-check"></i> 100%';
            gameplayAchievements[i].children[1].children[0].style = 'height: 5px; width: 100%;'
        } else {
            gameplayAchievements[i].children[2].innerHTML = `${percentage.toFixed(3)}%`;
            gameplayAchievements[i].children[1].children[0].style = `height: 5px; width: ${percentage}%`;
        }
    }
};

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const openAchievements = () => {
    let body = document.getElementsByTagName('body')[0];
    if (body.lastChild.tagName == 'STYLE') {
        body.removeChild(body.lastChild);
    }
    $('.achievements-tab').css('width', '250px');
};

const closeAchievements = () => {
    $('.achievements-tab').css('width', '0');
};
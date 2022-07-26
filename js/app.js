'use strict';

//***Global Variables***//

let voteLimit = 25;
let voteItems = [];

//***DOM References***//

let imgArticle = document.getElementById('imgs-article');
let results = document.getElementById('results');
let resultsButton;

let imgContainerOne = document.getElementById('img-cont-1');
let imgContainerTwo = document.getElementById('img-cont-2');
let imgContainerThree = document.getElementById('img-cont-3');

let imgContainers = [
  imgContainerOne,
  imgContainerTwo,
  imgContainerThree
];

let itemHeadOne = document.getElementById('head-1');
let itemHeadTwo = document.getElementById('head-2');
let itemHeadThree = document.getElementById('head-3');

let currentHeads = [
  itemHeadOne,
  itemHeadTwo,
  itemHeadThree
];

let itemImgOne = document.getElementById('img-1');
let itemImgTwo = document.getElementById('img-2');
let itemImgThree = document.getElementById('img-3');

let currentImgs = [
  itemImgOne,
  itemImgTwo,
  itemImgThree
];

//***Constructor***//

function VoteItem(name, itemImgExtension = 'jpg') {
  this.itemName = name;
  this.itemImg = `img/${this.itemName}.${itemImgExtension}`;
  this.votes = 0;
  this.views = 0;

  voteItems.push(this);
}

//***Genereate Items***//

function generateVoteItems() {
  let bag = new VoteItem('bag');
  let banana = new VoteItem('banana');
  let bathroom = new VoteItem('bathroom');
  let boots = new VoteItem('boots');
  let breakfast = new VoteItem('breakfast');
  let bubblegum = new VoteItem('bubblegum');
  let chair = new VoteItem('chair');
  let cthulhu = new VoteItem('cthulhu');
  let dogDuck = new VoteItem('dog-duck');
  let dragon = new VoteItem('dragon');
  let pen = new VoteItem('pen');
  let petSweep = new VoteItem('pet-sweep');
  let scissors = new VoteItem('scissors');
  let shark = new VoteItem('shark');
  let sweep = new VoteItem('sweep', 'png');
  let tauntaun = new VoteItem('tauntaun');
  let unicorn = new VoteItem('unicorn');
  let waterCan = new VoteItem('water-can');
  let wineGlass = new VoteItem('wine-glass');
}

//***Execution***//

generateVoteItems();

renderVoteItems();

//***Renderers***//

function renderVoteItems() {
  let voteItemsIndexs = [];

  for (let i = 0; i < 3; i++) {
    voteItemsIndexs.push(randomIndexChecker(voteItemsIndexs));
  }

  for (let i = 0; i < currentHeads.length; i++) {
    currentHeads[i].textContent = voteItems[voteItemsIndexs[i]].itemName;

    currentImgs[i].src = voteItems[voteItemsIndexs[i]].itemImg;
    currentImgs[i].alt = voteItems[voteItemsIndexs[i]].itemImg;
    currentImgs[i].name = voteItems[voteItemsIndexs[i]].itemName;

    imgContainers[i].appendChild(currentHeads[i]);
    imgContainers[i].appendChild(currentImgs[i]);

    voteItems[voteItemsIndexs[i]].views++;
  }
}

function renderButton() {
  resultsButton = document.createElement('button');
  results.appendChild(resultsButton);
  resultsButton.textContent = 'Show Results';
}

function renderVoteList() {
  let ul = document.createElement('ul');
  results.appendChild(ul);

  for (let i = 0; i < voteItems.length; i++) {
    let templi = document.createElement('li');
    templi.textContent = `${voteItems[i].itemName} was viewed ${voteItems[i].views} and was voted on ${voteItems[i].votes} times.`;
    ul.appendChild(templi);
  }

  resultsButton.removeEventListener('click', renderVoteList);
  resultsButton.remove();
}

//***Calculations***//

function randomIndexGenerator() {
  return Math.floor(Math.random() * voteItems.length);
}

function randomIndexChecker(voteItemsIndexs) {
  let tempIndex = randomIndexGenerator();
  let checkIndex = true;

  if (voteItemsIndexs.length === 0) {
    return tempIndex;
  } else while (checkIndex) {
    for (let i = 0; i < voteItemsIndexs.length; i++) {
      if (tempIndex === voteItemsIndexs[i]) {
        tempIndex = randomIndexGenerator();
        i = 0;
      }
    }
    checkIndex = false;
  }
  return tempIndex;
}

//***Event Handlers***//

function processVoteClick(event) {
  for (let i = 0; i < currentImgs.length; i++) {
    if (currentImgs[i].contains(event.target)) {
      for (let i = 0; i < voteItems.length; i++) {
        if (event.target.name === voteItems[i].itemName) {
          voteItems[i].votes++;
          break;
        }
      }

      voteLimit--;

      renderVoteItems();
    }
  }

  if (voteLimit === 0) {
    imgArticle.removeEventListener('click', processVoteClick);
    renderButton();
    resultsButton.addEventListener('click', renderVoteList);
  }
}

//***Primary Event Listener***//

imgArticle.addEventListener('click', processVoteClick);


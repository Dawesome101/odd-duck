'use strict';

//***Global Variables***//

let voteLimit = 25;
let voteItems = [];
let lastUsedItemsIndexs = [];

//***DOM References***//

let imgArticle = document.getElementById('imgs-article');
let results = document.getElementById('results');
let graphContainer = document.getElementById('chart-cont');
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

let itemNames = [];
let itemVotes = [];
let itemViews = [];

//***Local Storage Parser***//

let parsedVoteItemPackage = JSON.parse(localStorage.getItem('voteItemsPackage'));

//***Constructor***//

function VoteItem(name, itemImgExtension = 'jpg') {
  this.itemName = name;
  this.itemImg = `img/${this.itemName}.${itemImgExtension}`;
  this.votes = 0;
  this.views = 0;

  voteItems.push(this);
}

//***Generation***//

function generateVoteItems() {

  if(parsedVoteItemPackage){
    voteItems = parsedVoteItemPackage;
  } else {
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
}

function generateColors(color = 0, colorCount) {
  let tempColorsSolid = [];
  let tempColorsOpaque = [];
  let tempHalfColorsSolid = [];
  let tempHalfColorsOpaque = [];
  let tempColorSolid = 0;
  let tempColorOpaque = 0;
  let tempHalfColorSolid = 0;
  let tempHalfColorOpaque = 0;

  if (color === 0) {
    tempColorSolid = [255, 0, 0, 1];
    tempColorOpaque = [255, 0, 0, 0.2];
    tempHalfColorSolid = [155, 155, 0, 1];
    tempHalfColorOpaque = [155, 155, 0, 0.2];
  } else if (color === 1) {
    tempColorSolid = [0, 255, 0, 1];
    tempColorOpaque = [0, 255, 0, 0.2];
    tempHalfColorSolid = [0, 155, 155, 1];
    tempHalfColorOpaque = [0, 155, 155, 0.2];
  } else {
    tempColorSolid = [0, 0, 255, 1];
    tempColorOpaque = [0, 0, 255, 0.2];
    tempHalfColorSolid = [155, 0, 155, 1];
    tempHalfColorOpaque = [155, 0, 155, 0.2];
  }

  for (let i = 0; i < colorCount; i++) {
    tempColorsSolid.push(`rgba(${tempColorSolid})`);
    tempColorsOpaque.push(`rgba(${tempColorOpaque})`);
    tempHalfColorsSolid.push(`rgba(${tempHalfColorSolid})`);
    tempHalfColorsOpaque.push(`rgba(${tempHalfColorOpaque})`);
  }

  return [tempColorsSolid, tempColorsOpaque, tempHalfColorsSolid, tempHalfColorsOpaque];
}

//***Execution***//

generateVoteItems();
renderVoteItems();

//***Renderers***//

function renderVoteItems() {
  let voteItemsIndexs = getRandomIndexs();

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
  results.style.height = '15vw';
  resultsButton = document.createElement('button');
  results.appendChild(resultsButton);
  resultsButton.textContent = 'Show Results';
  imgArticle.remove();
}

function renderVoteList() {
  results.style.height = '0%';

  let canvas = document.createElement('canvas');

  for (let i = 0; i < voteItems.length; i++) {
    itemNames.push(voteItems[i].itemName);
    itemVotes.push(voteItems[i].votes);
    itemViews.push(voteItems[i].views);
  }

  let colors = generateColors(Math.floor(Math.random() * 3), voteItems.length);

  let chart = {
    type: 'bar',
    data: {
      labels: itemNames,
      datasets: [{
        label: 'Votes',
        data: itemVotes,
        backgroundColor: colors[1],
        borderColor: colors[0],
        borderWidth: 1
      },
      {
        label: 'Views',
        data: itemViews,
        backgroundColor: colors[3],
        borderColor: colors[2],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(canvas, chart);

  graphContainer.appendChild(canvas);

  resultsButton.removeEventListener('click', renderVoteList);
  resultsButton.remove();
}

//***Calculations***//

function randomIndexGenerator() {
  return Math.floor(Math.random() * voteItems.length);
}

function getRandomIndexs(tempIndexs = []) {
  let tempIndex;
  let checkIndexs = true;
  let checkLastUsedIndexs = true;

  while (checkIndexs) {
    tempIndex = randomIndexGenerator();
    while (checkLastUsedIndexs) {
      if (lastUsedItemsIndexs.includes(tempIndex)) {
        tempIndex = randomIndexGenerator();
      } else {
        checkLastUsedIndexs = false;
      }
    }

    if (tempIndexs.length === 0) {
      tempIndexs.push(tempIndex);
    } else if (tempIndexs.includes(tempIndex)) {
      tempIndex = randomIndexGenerator();
    } else {
      tempIndexs.push(tempIndex);
    }

    checkLastUsedIndexs = true;

    if (tempIndexs.length === 3) {
      checkIndexs = false;
    }
  }

  lastUsedItemsIndexs = tempIndexs;
  return tempIndexs;
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
    localStorage.setItem('voteItemsPackage', JSON.stringify(voteItems));

    imgArticle.removeEventListener('click', processVoteClick);
    renderButton();
    resultsButton.addEventListener('click', renderVoteList);
  }
}

//***Primary Event Listener***//

imgArticle.addEventListener('click', processVoteClick);

'use strict';
// Anime Categories array
var animeCategories = ['History', 'Comedy', 'Horror', 'Romance', 'Supernatural'];
// Fill select list with Anime Categories
function fillCategoriesList() {
  var categoriesList = document.getElementById('animeCategory');
  for (var i = 0; i < animeCategories.length; i++) {
    var categoriesListOption = document.createElement('option');
    categoriesListOption.textContent = animeCategories[i];
    categoriesList.appendChild(categoriesListOption);
  }
}
fillCategoriesList();

// Random Integer Generator
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// Constructor
function Anime(animeTitle, animeCategory, animeSeason){
  this.animeTitle = animeTitle;
  this.animeCategory = animeCategory;
  this.animeSeason = animeSeason;
  Anime.all.push(this);
}
var animeList = JSON.parse(localStorage.getItem('animeList'));
if(animeList){
  Anime.all = animeList;
  renderAnimeList();
} else{
  Anime.all = [];
}

// Add event listner and handler to form
var addAnimeForm = document.getElementById('addAnimeToWL');
addAnimeForm.addEventListener('submit', addAnimeFormHandler);

// Form handler
function addAnimeFormHandler(e){
  var animeName = e.target.animeTitleInput.value;
  var animeCat = e.target.animeCategory.value;
  var animeRandomSeason = getRandomInt(1,8);
  var animeItem = new Anime(animeName,animeCat,animeRandomSeason);
  localStorage.setItem('animeList', JSON.stringify(Anime.all));
  var animeTable = document.getElementById('animeListTable');
  animeTable.innerHTML = '';
  renderAnimeList();
}


// Render Anime List function

function renderAnimeList(){
  renderAnimeListHeader();
  var animeTable = document.getElementById('animeListTable');
  var animeTableBody = document.createElement('tbody');
  for(var i = 0; i < Anime.all.length; i++){
    var animeTableRow = document.createElement('tr');
    var animeTableRowTitle = document.createElement('td');
    var animeTableRowCategory = document.createElement('td');
    var animeTableRowSeason = document.createElement('td');
    var animeTableRowRemove = document.createElement('td');
    var animeTableRowRemoveBtn = document.createElement('button');
    animeTableRowRemoveBtn.textContent = 'X';
    animeTableRowRemoveBtn.setAttribute('id', i);

    animeTableRowRemoveBtn.addEventListener('click', deleteAnimeFromList);

    animeTableRowTitle.textContent = Anime.all[i].animeTitle;
    animeTableRowCategory.textContent = Anime.all[i].animeCategory;
    animeTableRowSeason.textContent = Anime.all[i].animeSeason;
    animeTableRowRemove.appendChild(animeTableRowRemoveBtn);

    animeTableRow.appendChild(animeTableRowTitle);
    animeTableRow.appendChild(animeTableRowCategory);
    animeTableRow.appendChild(animeTableRowSeason);
    animeTableRow.appendChild(animeTableRowRemove);

    animeTableBody.appendChild(animeTableRow);
  }
  animeTable.appendChild(animeTableBody);
}

// Render Anime List Table header function
function renderAnimeListHeader(){
  var animeTable = document.getElementById('animeListTable');
  var animeTableHeader = document.createElement('thead');
  var animeTableHeaderRow = document.createElement('tr');

  var animeTableHeaderTitle = document.createElement('th');
  var animeTableHeaderCat = document.createElement('th');
  var animeTableHeaderSeason = document.createElement('th');
  var animeTableHeaderRemove = document.createElement('th');

  animeTableHeaderTitle.textContent = 'Anime Title';
  animeTableHeaderCat.textContent = 'Category';
  animeTableHeaderSeason.textContent = 'Random Season';
  animeTableHeaderRemove.textContent = 'Remove';

  animeTableHeaderRow.appendChild(animeTableHeaderTitle);
  animeTableHeaderRow.appendChild(animeTableHeaderCat);
  animeTableHeaderRow.appendChild(animeTableHeaderSeason);
  animeTableHeaderRow.appendChild(animeTableHeaderRemove);

  animeTableHeader.appendChild(animeTableHeaderRow);
  animeTable.appendChild(animeTableHeader);
}

function deleteAnimeFromList(e){
  var selectedAnime = e.target.id;
  Anime.all.splice(selectedAnime, 1);
  localStorage.setItem('animeList', JSON.stringify(Anime.all));
  var animeTable = document.getElementById('animeListTable');
  animeTable.innerHTML = '';
  renderAnimeList();
}

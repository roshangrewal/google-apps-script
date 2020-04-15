// Google Sheet Link
const url = "https://docs.google.com/spreadsheets/d/1Vfg8T7rOFB5z1G-fdeIyUm_IKg63I9pLcmV7YQ3Z6Fc/edit#gid=0";

function doGet(e) {
//  Logger.log(e.parameter);
  
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Options");
  var list = ws.getRange(1,1,ws.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  
  //converting  2D array into 1D using Map Method
  var htmlListArray = list.map(function(r){ return '<option>' + r[0] + '</option>';}).join('');
  
  //making instance of main-page to change data dynamically, inside main-page
  var tmp = HtmlService.createTemplateFromFile("page");
  tmp.title = "Very Begining to Apps Script";
  tmp.list = htmlListArray;
  return tmp.evaluate();
}

// this function is to add user information into spread sheets, which is coming from the page-js
function userClicked(userInfo){
  
  //spreadsheets url
  var ss = SpreadsheetApp.openByUrl(url);
  
  //selecting sheet named 'Data' 
  var ws = ss.getSheetByName("Data");
  
  //adding into 'Data' sheet
  ws.appendRow([userInfo.firstName, userInfo.lastName, userInfo.app, new Date()]);
  
}

//creating include function to render css and js inside main page
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
  
}
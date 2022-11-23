if (!ENV.COURSE_ID) ENV.COURSE_ID = /\/courses\/(\d+)/.exec(location.pathname)[1];
let uio_entireCourseStructure = {modules:{}};
uio_entireCourseStructure.done = function(){
return this.requests && this.answers == this.requests
};

function uioGetEntireStructure (){
//load all modules and items, and insert all items into one array for each module -- uio_entireCourseStructure.modules[moduleid] = items json-data.
//requests and answers are kept track of to check if it is done.
uio_entireCourseStructure.requests = 1;
uio_entireCourseStructure.answers = 0;
$.getJSON(`${location.origin}/api/v1/courses/${ENV.COURSE_ID}/modules?per_page=999`,(modules)=>{
for (let i=0; i<modules.length; i++){
uio_entireCourseStructure.requests++;
$.getJSON(`${location.origin}/api/v1/courses/${ENV.COURSE_ID}/modules/${modules[i].id}/items?per_page=999`,(items)=>{
uio_entireCourseStructure.modules[modules[i].id] = items;
uio_entireCourseStructure.answers++;
})
}
uio_entireCourseStructure.answers++;
});
}
function uioGetCurrentModuleItemId() {
if (location.search.indexOf('menu=off')!=-1) return false;
let match = /courses\/\d+\/modules\/items\/(\d+)$/.exec(location.pathname);
if (match) return match[1];
match = /module_item_id=(\d+)/.exec(location.search);
if (match){
//a link from another page can have wrong module_item_id and still show the correct page, so check that the id is valid
if (uioGetCurrentModuleId(match[1])) return match[1];
}
//lacking module_item_id or has erroneous module_item_id
for (let moduleid in uio_entireCourseStructure.modules) {
for (let i=0; i<uio_entireCourseStructure.modules[moduleid].length; i++){
let itemurl = /\/courses.*/.exec(uio_entireCourseStructure.modules[moduleid][i].url);
if (itemurl && itemurl[0] == location.pathname){
return uio_entireCourseStructure.modules[moduleid][i].id;
}
}
}
}

function uioGetCurrentModuleId(moduleItemId){
for (let moduleid in uio_entireCourseStructure.modules) {
for (let i=0; i<uio_entireCourseStructure.modules[moduleid].length; i++){
if (uio_entireCourseStructure.modules[moduleid][i].id == moduleItemId) return moduleid;
}
}
return false;
}

function uioMakemenu(items, itemId){
//insert css
let style = document.createElement('style');
style.type = 'text/css'
style.innerText = `
ul.uioMeny {
list-style-type: none;
background-color: #e1ebeb; /* #e1ebeb;*/
font-size: 95%;
border: 1px solid Gainsboro; /* #d1d1d1; */
border-radius: 3px;
}
.uioMeny li a {
display: block;
color: Black; /* #555; */
padding: 3px 0 3px 16px !important;
text-decoration: none;
}
.uioMeny li a:hover {
background-color: #ddd;
color: Black;
}
.uioMeny li {
padding: 0px !important;
text-align: left;
border-bottom: 1px solid White;
}
.uioMeny li:last-child {
border-bottom: none;
}
.uioMeny .module-home a {
font-weight: bold;
font-size: 100%;
background-color: #4747a5; /* #58b2dc;*/
color: White !important;
}
.uioMeny .module-home a:hover {
background-color: lavender; /* #e1ebeb !important;*/
}
.uioMeny li.uioMeny-aktiv {
padding: 3px 0px 3px 16px !important;
background-color: Grey; /* #787676 !important;*/
color: White !important;
}
`;
document.head.appendChild(style);
//make menu
let menuhtml = '<ul class="uioMeny">';
menuhtml += `<li class="module-home"><a href="/courses/${ENV.COURSE_ID}/modules/">Tilbake til hovedmenyen</a></li>`;
for (let i=0; i<items.length; i++){
menuhtml += '<li';
if (items[i].completion_requirement && items[i].completion_requirement.completed){
menuhtml += ' style="background:#aaffaa;"';
}
if (items[i].id == itemId){//this is the current item
menuhtml += ` class="uioMeny-aktiv">${items[i].title}</li>`;
}else{
menuhtml += `><a href="${items[i].html_url}">${items[i].title}</a></li>`;
}
}
menuhtml += '</ul>';
//insert menu
$("#right-side").prepend(menuhtml);
$("#right-side-wrapper").show();
$("#right-side").show();
}

function uioRightmenuTimedFunction(){
if (uio_entireCourseStructure.done()){
clearInterval(uioRightmenuInterval);
let itemId = uioGetCurrentModuleItemId();
if (itemId){
let moduleId = uioGetCurrentModuleId(itemId);
uioMakemenu(uio_entireCourseStructure.modules[moduleId],itemId);
}
}
}

uioGetEntireStructure();
let uioRightmenuInterval = setInterval(uioRightmenuTimedFunction, 200);
    //
// Use in combination with CSS that loads all modules in a collapsed state.
// When navigation to the modules page is to a specific module,
// automagically click the module so it opens in an expanded state.
//
var anchor = window.location.hash;
var underscore = anchor.indexOf("_") + 1;
var characters = anchor.length;
var module = anchor.substring(underscore,characters);
var selector = "span[aria-controls='context_module_content_"+module+"']";
console.log(selector);

window.onload = function() {expand_module()};
function expand_module() {
    document.querySelector(selector).click();
    console.log("click attempted");
}

//
// Add button and script to expand and collapse all modules
//

// Create the button on Modules pages
/*if(window.location.href.indexOf("modules") > -1) {
    document.querySelector('.header-bar-right__buttons').insertAdjacentHTML( 'afterbegin', '<button class="btn" id="expand-collapse-modules" status="collapsed" onclick="expand_collapse_modules()"><span class="screenreader-only">Collapse or expand all modules</span>Expand All Modules</button>');
    }
*/
// when the button is clicked, expand or collapse all modules that are not currently expanded or contracted.
function expand_collapse_modules()
{

    if (document.getElementById("expand-collapse-modules").status == "collapsed"){
        document.getElementById("expand-collapse-modules").innerText = "Expand All Modules";
        document.getElementById("expand-collapse-modules").status = "expanded";
        var item_ = document.querySelectorAll("span[style='display: inline-block;'][aria-expanded='true']");

        }
    else {
        document.getElementById("expand-collapse-modules").innerText = "Collapse All Modules";
        document.getElementById("expand-collapse-modules").status = "collapsed";
        var item_ = document.querySelectorAll(".expand_module_link:not([style='display: none;'])");
        }

    for (var i = item_.length-1; i >= 0 ; i--) {
        console.log(i);
        item_[i].click();
    }

}

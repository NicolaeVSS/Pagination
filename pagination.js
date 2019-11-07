'set strict'

/*
 * Global vairables and classes
*/
class Book
{
    constructor(id, title, author)
    {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}

var records = 
[
    new Book(0,"Lorem","ipsum"), new Book(1,"dolor","sit amet"), new Book(2,"consectetur","adipiscing"),
    new Book(3,"elit","sed do"), new Book(4,"eiusmodr","tempor"), new Book(5,"incididunt","ut laborec"),
    new Book(6,"yet dolore","magna"), new Book(7,"aliqua","Bibendum"), new Book(8,"enim","facilisis"),
    new Book(9,"gravida","neque"), new Book(10,"convallis","a cras"), new Book(11,"Pellentesque","habitant"),
    new Book(12,"morbi tristique","purus semper"), new Book(13,"senectus","et netus et"), new Book(14,"malesuada","fames ac turpis"),
    new Book(15,"egestas sed","tempus urna"), new Book(16,"Auctor elit","sed vulputate"), new Book(17,"mi sit amet","mauris"),
    new Book(18,"Mollis aliquam","ut porttitor leo"), new Book(19,"diam sollicitudin","Orci a scelerisque")
];
var curPage = 1;
const recordsPerPage = document.getElementById("bookTable").rows.length-1; // compenate for the header row!
const totalPages = Math.ceil(records.length / recordsPerPage);

/*
 * Functions
*/
function setPage(pageNum)
{
    // Ensure we are in page boundries
    if(pageNum < 1 || pageNum > totalPages)
    {
        console.error("Page number out of bounds! ("+pageNum+")");
        pageNum = 1;
    }

    // update the current page
    curPage = pageNum;

    // get the required elements
    let bookTable = document.getElementById("bookTable");
    let pageButton = document.getElementById("paginationButtons");

    const endIndex = curPage * recordsPerPage;
    const startIndex = endIndex - recordsPerPage;
    let curIndex = startIndex;

    // debugging
    //console/console.log("showing page: " + curPage + " out of " + totalPages);
    //console.log("showing indicies: " + startIndex + "-" + endIndex);

    // clear the table beforehand, not efficient- but neither is life, so...
    for(let i = 1; i<bookTable.rows.length; ++i) // compenate for the header row!
    {
        bookTable.rows[i].cells[0].innerHTML = "";
        bookTable.rows[i].cells[1].innerHTML = "";
        bookTable.rows[i].cells[2].innerHTML = "";
    }

    // for every row in the table
    for(let i = 1; i<bookTable.rows.length; ++i) // compenate for the header row!
    {
        // fill that row's content with the Book at the curIndex
        bookTable.rows[i].cells[0].innerHTML = records[curIndex].id;
        bookTable.rows[i].cells[1].innerHTML = records[curIndex].title;
        bookTable.rows[i].cells[2].innerHTML = records[curIndex].author;

        // iterate curIndex, and check if we've reached the end of the table or records array
        curIndex++;
        if(curIndex > endIndex || curIndex > records.length-1)
        {
            break;
        }
    }
}

function prevPage()
{
    if(curPage > 1)
    {
        setPage(--curPage)
    }
}

function nextPage()
{
    if(curPage < totalPages)
    {
        setPage(++curPage);
    }
}

window.onload = function() 
{
    setPage(curPage);
};
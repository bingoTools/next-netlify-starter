exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        body: returnThis()
//        body: JSON.stringify({            message: "Hello World"        }),
    };
}

function returnThis() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    //https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?pageno=220&strCat=-1&strPrevDate=20220207&strScrip=&strSearch=P&strToDate=20220207&strType=C

    pageNo = 1;
    //var totalRows = null;
    today = yyyy + mm + dd;
    var url = "[https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?pageno=](https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?pageno=)" + pageNo + "&strCat=-1&strPrevDate=" + today + "&strScrip=&strSearch=P&strToDate=" + today + "&strType=C";

    function isAnyBBNews(numberOfPages) {
        if (pageNo > numberOfPages) {
            console.log(4);
            return false;
        } else {
            var url = "[https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?pageno=](https://api.bseindia.com/BseIndiaAPI/api/AnnGetData/w?pageno=)" + pageNo + "&strCat=-1&strPrevDate=" + today + "&strScrip=&strSearch=P&strToDate=" + today + "&strType=C";
            ++pageNo;
            let xhttp1 = new XMLHttpRequest();
            xhttp1.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //		console.log(xhttp1.responseText);
                    var jsonData = JSON.parse(xhttp1.responseText);
                    var rowsArr = jsonData.Table;
                    for (var j = 0; j < rowsArr.length; j++) {
                        let NEWSSUB = rowsArr[j]["NEWSSUB"];
                        let HEADLINE = rowsArr[j]["HEADLINE"];
                        let CATEGORYNAME = rowsArr[j]["CATEGORYNAME"];
                        let flag = false;
                        if (NEWSSUB != null && (NEWSSUB.indexOf("Buy") != -1 || NEWSSUB.indexOf("buy") != -1)) {
                            flag = true;
                        } else if (HEADLINE != null && (HEADLINE.indexOf("Buy") != -1 || HEADLINE.indexOf("buy") != -1)) {
                            flag = true;
                        } else if (CATEGORYNAME != null && (CATEGORYNAME.indexOf("Buy") != -1 || CATEGORYNAME.indexOf("buy") != -1)) {
                            flag = true;
                        }
                        if (NEWSSUB != null && (NEWSSUB.indexOf("Daily Buy Back of equity shares") != -1)) {
                            flag = false;
                        }
                        if (flag == true) {
                            console.log("1*********");
                            return true;
                        } else if (j < rowsArr.length) {
                            console.log(2);
                            isAnyBBNews(numberOfPages);
                        } else {
                            console.log(3);
                            return false;
                        }
                    }
                }
            };
            xhttp1.open("GET", url, true);
            xhttp1.setRequestHeader("Content-type", "application/json");
            xhttp1.send();
        }
    }



}

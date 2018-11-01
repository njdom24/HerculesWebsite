var file1 = [];//holds lines from input 1
var file2 = [];//holds lines from input 2
//var arr1 = [];//holds Courses from file1
//var arr2 = [];//holds Courses from file2
var arrCommon = [];

var openFile = function(event, num)
{
    var input = event.target;
    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function(progressEvent)
    {
        //splits by line
        var lines = this.result.split('\n');
        if (num == 1)
        {
            file1 = lines.slice(0);
        }
        else
        {
            file2 = lines.slice(0);
        }
    };
    reader.readAsText(file);
};
printAll = function(tFile)
{
    for(var line = 0; line < tFile.length; line++)
        console.log(tFile[line]);
}

test = function()
{
    
    printAll(file1);
    console.log("*********************************************************");
    printAll(file2);
    
    var cl1 = new Course("A", "B", "C", "D", "E");
    var cl2 = new Course("A", "B", "C", "D", "E");
    
    //console.log(cl1.equals(cl2));
    //console.log(cl1.toString());
}
compareSched = function()
{
    document.getElementById("heck").innerHTML = "";
    arrCommon = [];
    console.clear();
    let tName = "";
    let tDate = "";
    //let tTime = "";
    let tHour = "";
    let tMins = "";
    let tEndHour = "";
    let tEndMins = "";
    let tProf = "";
    let tLoc = "";
    let tEnd = "";

    let tFile = [];
    let arr = [];
    let arr1 = [];//holds Courses from file1
    let arr2 = [];//holds Courses from file2
    for(var f = 0; f < 2; f++)
    {
        if(f == 0)
        {
            tFile = file1;
            //arr1 = [];
            arr = arr1;
        }
        else
        {
            tFile = file2;
            //arr2 = [];
            arr = arr2;
        }
        
        for(var i = 0; i < tFile.length-10; i++)
        {
            if(tFile[i].indexOf("SUMMARY") != -1)
            {
                let s = tFile[i];
                tName = s.substring(s.indexOf(":") + 1);
                //skips 4 lines ahead
                for(var j = 0; j < 4; j++)
                {
                    //checks for end of file
                    if(i < tFile.length)
                        i++;
                }
                s = tFile[i];

                if(s.charAt(0) == 'E')
                    break;
                let index = s.indexOf(":") + 5;
                tDate = s.substring(index, index+4);
                tDate = tDate.substring(0, 2) + "/" + tDate.substring(2);
                //tTime = s.substring(index+5, index+9);
                index = s.lastIndexOf("T") + 1;
                tHour = s.substr(index, 2);
                //tTime = tTime.substring(0, 2) + ":" + tTime.substring(2);
                tMins = s.substr(index+2, 2);

                i++;
                s = tFile[i];
                index = s.lastIndexOf("T") + 1;
                tEndHour = s.substr(index, 2);
                tEndMins = s.substr(index+2, 2);

                //used to be 3
                //skips 2 lines ahead
                for(var j = 0; j < 2; j++)
                {
                    //checks for end of file
                    if(i < tFile.length)
                        i++;
                }
                s = tFile[i];
                tProf = s.substring(s.indexOf(" ") + 1);

                s = tFile[++i];
                tLoc = s.substring(s.indexOf(":") + 1);
                if(tLoc.charAt(0) == " ")
                    tLoc = tLoc.substring(1);
                
                arr.push(new Course(tName, tDate, tHour, tMins, tEndHour, tEndMins, tProf, tLoc));
            }
        }
        //console.log(tFile[tFile.length-5]);
        //hotfix for Mechanics Recitations being logged as Lectures in .ics files
        //full fix available with more test data
        if(tFile[tFile.length-5].indexOf("SUMMARY") != -1)
            arr[arr.length-1].course = tFile[tFile.length-5].substring(tFile[tFile.length-5].indexOf(":")+1)
        //for(var i = 0; i < arr.length; i++)
            //console.log(arr[i].toString());
        //console.log("*******************************************");
    }

    for(var i = 0; i < arr1.length; i++)
        for(var j = 0; j < arr2.length; j++)
            if(arr1[i].equals(arr2[j]))
            {
                //document.getElementById("heck").innerHTML += arr1[i] + "<br>";
                arrCommon.push(arr[i]);
            }
    arrCommon.sort(compare);//orders shared classes by date and time
    //for(var i = 0; i < arrCommon.length; i++)
        //document.getElementById("heck").innerHTML += arrCommon[i] + "<br>";//prints out shared classes

    toTable(arrCommon);
                
}
var compFile = function()
{
    if(!(file1.length == 0 || file2.length == 0))
    {
        //test();
        compareSched();
    }
};

var toTable = function(a)
{
    let curDay = "";
    let dayInd = -1;
    let days = [[],[],[],[],[]];//mon, tues, wed, thurs, fri
    let ceaseRows = [0,0,0,0,0];//determines the amount of rows to skip drawing blanks for per column

    for(var i = 0; i < a.length; i++)
    {
        
        if(curDay != a[i].date)
        {
            curDay = a[i].date;
            dayInd++;
        }
        //console.log(curDay + " : " + dayInd);
        days[dayInd].push(a[i]);
    }

    console.log(days);
    /*
    for(var i = 0; i < days.length; i++)
    {
        for(var j = 0; j < days[i].length; j++)
            document.getElementById("heck").innerHTML += days[i][j] + "<br>";
        document.getElementById("heck").innerHTML += "****************************************************************************************************" + "<br>";
    }
    */
    var htmlString = "<table><tr id = \"headers\"><th>Time</th><th>Monday</th> <th>Tuesday</th><th>Wednesday</th><th>Thursday</th> <th>Friday</th></tr>";
    //document.getElementById("heck").innerHTML = "<table><tr><th>Time</th><th>Monday</th> <th>Tuesday</th><th>Wednesday</th><th>Thursday</th> <th>Friday</th></tr>";
    //document.getElementById("heck").innerHTML = "<table><tr><th>Time</th><th>Monday</th> <th>Tuesday</th><th>Wednesday</th><th>Thursday</th> <th>Friday</th></tr><tr><td>Jill</td><td>Smith</td> <td>50</td></tr><tr><td>Eve</td><td>Jackson</td> <td>94</td></tr></table>";

    var hour = 8;
    var mins = 0;
    let timeClass = "evenTime";
    for(var t = 0; t <= 13*4; t++)
    {
        if(t!=0 && t%4 == 0)
        {
            hour++;
            mins = 0;
        }

        let sMins;
        let sHour;
        if(mins == 0)
            sMins = "00";
        else
            sMins = "" + mins;
        if(hour < 10)
            sHour = "0"+ hour;
        else
            sHour = "" + hour;

        if(hour < 12)
            htmlString += "<tr><td class = \"" + timeClass + "\">" + hour + ":" + sMins + "&nbspAM</td>";
        else if(hour == 12)
            htmlString += "<tr><td class = \"" + timeClass + "\">" + hour + ":" + sMins + "&nbspPM</td>";
        else
            htmlString += "<tr><td class = \"" + timeClass + "\">" + (hour-12) + ":" + sMins + "&nbspPM</td>";

        if(timeClass == "evenTime")
            timeClass = "oddTime";
        else
            timeClass = "evenTime";
        
        let rowClass = "";//"class = \"even\"";
        //days[0][0] = days[0][1];
        //checks if a class is running then
        for(var i = 0; i < days.length; i++)
        {
            let skipMins = (ceaseRows[i]%4)*15;
            if(mins+skipMins == 0 || mins+skipMins == 30)
                rowClass = "even";
            else
                rowClass = "odd";
            let found = false;
            /*
            for(var j = 0; j < days[i].length; j++)
            {
                if(days[i][j].date != "2")
                    if(parseInt(days[i][j].startHour) == hour + ceaseRows[i]/4 && parseInt(days[i][j].startMins) == mins + skipMins)//Checks ahead of time to account for the future skipped rows
                    {
                        let addRows = Math.round((parseInt(days[i][j].endHour)*60 + parseInt(days[i][j].endMins) - parseInt(days[i][j].startHour)*60 - parseInt(days[i][j].startMins))/15) + 1;
                        ceaseRows[i] += addRows;
                        //(days[i][j].course + ", " + i + ", CEASEROWS: " + ceaseRows[i] + ", ADDROWS: " + addRows);
                        htmlString += "<td class = \"course\" rowspan = \"" + addRows + "\">" + days[i][j].course + "</td>";
                        days[i][j].date = "2";//prevents reuse
                        found = true;
                        break;
                    }
            }
            if(!found)//if the class's time isn't in a 15-minute spot, estimate its position*/
                for(var j = 0; j < days[i].length; j++)
                {
                    if(days[i][j].date != "2")
                        if(parseInt(days[i][j].startHour) == hour + ceaseRows[i]/4 && parseInt(closestQuarter(parseInt(days[i][j].startMins))) == mins + skipMins)
                        {
                            let addRows = Math.round((parseInt(days[i][j].endHour)*60 + parseInt(days[i][j].endMins) - parseInt(days[i][j].startHour)*60 - parseInt(days[i][j].startMins))/15) + 1;
                            ceaseRows[i] += addRows;
                            //console.log(days[i][j].course + ", " + i + ", CEASEROWS: " + ceaseRows[i] + ", ADDROWS: " + addRows);
                            htmlString += "<td class = \"course\" rowspan = \"" + addRows + "\">" + days[i][j].course + "</td>";
                            //htmlString += "<td>" + days[i][j].course + "</td>";
                            days[i][j].date = "2";//prevents reuse
                            found = true;
                            break;
                        }
                }
            if(!found && ceaseRows[i] == 0)
                htmlString += "<td class = \"" + rowClass + "\"></td>";
            else
                ceaseRows[i]--;
        }
        //if(!found)
           // htmlString += "<td></td>";
        htmlString += "</tr>";
        mins += 15;
    }




    htmlString += "</table>";
    document.getElementById("heck").innerHTML = htmlString;

}

var closestQuarter = function(a)
{
    let num = 0;

    for(var i = 0; i < 4; i++)// 00, 15, 30, 45
    {
        if(a == num)
            return num;
        if(a-5 == num || a+5 == num)
        {
            if(num == 0)
                return "00";
            else
                return "" + num;
        }
        num += 15;
    }
    return "30";
}

var compare = function(a,b)
{
    if(a.isEarlier(b))
        return -1;
    return 1;
}
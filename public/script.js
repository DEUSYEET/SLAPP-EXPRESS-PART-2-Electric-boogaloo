var url = "http://localhost:3000/api";
var myCanvas = document.getElementById("myCanvas");
var header = document.getElementById("ammountHeaderTag");
myCanvas.width = 584;
myCanvas.height = 800;
var ctx = myCanvas.getContext("2d");
let ammountTotal = 0;
let questionOneOne =0;
let questionOneTwo =0;
let questionOneThree =0;
let questionTwoOne = 0;
let questionTwoTwo = 0;
let questionTwoThree = 0;
let questionThreeOne = 0;
let questionThreeTwo = 0;
let questionThreeThree = 0;
let totalNumber = 0;


fetch(url).then((resp) => resp.json())
.then(data => {
        //console.log(data);
        totalNumber=data.length;
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i]["ans3"]);
            var one =data[i]["ans1"];
        //    console.log(one);
           var two =data[i]["ans2"];
        //    console.log(two);
           var three =data[i]["ans3"];
        //    console.log(three);
            console.log(`Question One~~~ ${i}`);
            if(one == "Male"){
                questionOneOne++;
                console.log("One",questionOneOne);
            }else if(one == "Female"){
                questionOneTwo++;
                console.log("Two",questionOneTwo);
            } else if(one == "Other"){
                questionOneThree++;
                console.log("Three",questionOneThree);
            };
            console.log(`Question Two~~~ ${i}`);
            if(two == "Warm"){
                questionTwoOne++;
                console.log("One",questionTwoOne);
            }else if(two == "Cold"){
                questionTwoTwo++;
                console.log("Two",questionTwoTwo);
            } else if(two == "Hot"){
                questionTwoThree++;
                console.log("Three",questionTwoThree);
            };

            console.log(`Question Three~~~ ${i}`);
            if(three == "Yes"){
                questionThreeOne++;
                console.log("One",questionThreeOne);
            }else if(three == "Definitely Yes"){
                questionThreeTwo++;
                console.log("Two",questionThreeTwo);
            } else if(three == "No(Wrong Answer\)"){
                questionThreeThree++;
                console.log("Three",questionThreeThree);
            };
        };
        console.log(`Total: ${totalNumber}`);
        createGraph(questionOneOne, questionOneTwo,questionOneThree,questionTwoOne, questionTwoTwo, questionTwoThree, questionThreeOne, questionThreeTwo, questionThreeThree,totalNumber);
    }).catch(err => {
        console.log(err);
});

const createBar = (x, y, width, height, color) => {
    var yTwo = y+(height);
    var xTwo = x+(width);
    drawLineVertical(x,y, yTwo);
    drawLineVertical(xTwo,y, yTwo);
    drawLineHorizontal(x, y, xTwo);
    drawLineHorizontal(xTwo, yTwo, x);
    fillBar(x,y, (height), (width), color);
};

const drawLineVertical = (x,y, yTwo) => {
    ctx.beginPath();
    ctx.moveTo(x,y),
    ctx.lineTo(x,yTwo);
    ctx.stroke();
};

const drawLineHorizontal = (x, y, xTwo) => {
    ctx.beginPath();
    ctx.moveTo(x, y),
    ctx.lineTo(xTwo, y);
    ctx.stroke();
};

const fillBar = (x,y,height,width,color) => {
    ctx.beginPath();
    ctx.fillStyle = `${color}`;
    ctx.fillRect(x,y,width,height);
    ctx.fillStyle = ("#000")
    // ctx.fill();
};

const writeToCanvas = (text, x, y) => {
    ctx.font = "20px Arial";
    ctx.fillText(text, x, y);
};

//x and y are fixed postions

const createBottomLines = (y) => {
    var yStart = y;
    var yEnd = y-10;
    writeToCanvas("%", 66, yStart+20);
    drawLineVertical(131, yStart, yEnd);
    writeToCanvas("10", 120, yStart+20);
    drawLineVertical(181, yStart, yEnd);
    writeToCanvas("20", 170, yStart+20);
    drawLineVertical(231, yStart, yEnd);
    writeToCanvas("30", 220, yStart+20);
    drawLineVertical(281, yStart, yEnd);
    writeToCanvas("40", 270, yStart+20);
    drawLineVertical(331, yStart, yEnd);
    writeToCanvas("50", 320, yStart+20);
    drawLineVertical(381, yStart, yEnd);
    writeToCanvas("60", 370, yStart+20);
    drawLineVertical(431, yStart, yEnd);
    writeToCanvas("70", 420, yStart+20);
    drawLineVertical(481, yStart, yEnd);
    writeToCanvas("80", 470, yStart+20);
    drawLineVertical(531, yStart, yEnd);
    writeToCanvas("90", 520, yStart+20);
};

const createGraphOne = (pixelcountOne, pixelcountTwo, pixelcountThree) => {
    var height = 40;
    writeToCanvas("What is your gender?", 81, 22);
    writeToCanvas("Male", 0, 80);
    writeToCanvas("Female", 0, 138);
    writeToCanvas("Other", 0, 200);
    drawLineHorizontal(581,30, 81);
    drawLineVertical(81, 30, 230);
    drawLineVertical(581, 30, 230);
    drawLineHorizontal(581,230, 81);
    //x,y,xtwo
    createBottomLines(235);
    //createbar(x,y,width,height,color)
    createBar(82,50, pixelcountOne, height, "#004f94");
    createBar(82,110, pixelcountTwo, height, "#fab");
    createBar(82,170, pixelcountThree, height, "#9dfff1");
};

const createGraphTwo = (pixelcountOne, pixelcountTwo, pixelcountThree) => {
    var height = 40;
    drawLineVertical(81, 300, 500);
    drawLineVertical(581, 300, 500);
    writeToCanvas("Which temperature do you prefer?", 81, 294);
    writeToCanvas("Warm", 0, 350);
    writeToCanvas("Cold", 0, 410);
    writeToCanvas("Hot", 0, 470);
    drawLineHorizontal(581,300, 81);
    drawLineHorizontal(581,500, 81);
    createBottomLines(505);
    //createbar(x,y,width,height,color)
    createBar(82,320, pixelcountOne, height, "#CD9B9B");
    createBar(82,380, pixelcountTwo, height, "#a7e4f2");
    createBar(82,440, pixelcountThree, height, "#8b0000");
};

const createGraphThree = (pixelcountOne, pixelcountTwo, pixelcountThree) => {
    var height = 40;
    drawLineVertical(81, 570, 770);
    drawLineVertical(581, 570, 770);
    writeToCanvas("Do you like Winne The Pooh?", 81, 565);
    writeToCanvas("Yes", 0, 620);
    writeToCanvas("Deffinitly", 0, 668);
    writeToCanvas("Yes", 0, 688);
    writeToCanvas("No", 0, 720);
    writeToCanvas("(Wrong", 0, 740);
    writeToCanvas("Answer)", 0, 760);
    drawLineHorizontal(581,570, 81);
    drawLineHorizontal(581,770, 81);
    createBottomLines(775);
    //createbar(x,y,width,height,color)
    //302-Max
    //10 - 10
    createBar(82,590, pixelcountOne, height, "#ffdea4");
    createBar(82,650, pixelcountTwo, height, "#f52532");
    createBar(82,710, pixelcountThree, height, "#ef7f01");
};

const precentWriter = (a,t) =>{
console.log(a,t);
let division = (a/t);
let percent = (Math.round(division*100)/100)*100;
let pixelcount = percent*5;
return pixelcount;
};

const createGraph = (aOneOne,aOneTwo,aOneThree,aTwoOne,aTwoTwo,aTwoThree,aThreeOne,aThreeTwo,aThreeThree,total) => {
    // console.log(aOneOne,aOneTwo,aOneThree,aTwoOne,aTwoTwo,aTwoThree,aThreeOne,aThreeTwo,aThreeThree,total);
    // createGraphOne(aOneOne,aOneTwo,aOneThree);
    // createGraphTwo(aTwoOne,aTwoTwo,aTwoThree);
    // createGraphThree(aThreeOne,aThreeTwo,aThreeThree);
    ammountHeaderTag.innerHTML = `Currently ${total} people NOT being scammed!`
    createGraphOne(precentWriter(aOneOne,total),precentWriter(aOneTwo,total),precentWriter(aOneThree,total));
    createGraphTwo(precentWriter(aTwoOne,total),precentWriter(aTwoTwo,total),precentWriter(aTwoThree,total));
    createGraphThree(precentWriter(aThreeOne,total),precentWriter(aThreeTwo,total),precentWriter(aThreeThree,total));
};

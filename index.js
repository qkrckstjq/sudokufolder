const table = document.getElementsByTagName('table')[0];
const tds = document.getElementsByTagName('td')
easy = 41
normal = 51
hard = 61

for(let i = 0; i < 9; i++){
    const tr = document.createElement('tr');
    for(let j = 0; j < 9; j++){
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.className='X' + String(j) + 'Y' + String(i);
        input.type='number',input.min=0,input.max=10;
        input.readOnly = true;
        input.classList.add('blue')
        td.appendChild(input);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

// for(let i = 1; i <= 2; i++){
//     document.getElementsByTagName('tr')[(i*3)-1].style.border = '5px solid black';
// }

let InputMemo = {};
let over = 81;
let life = 10;
let x = 0;
let y = 0;
let sudoku = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

function checkX (value, x, y){
    for(let i = 0; i < 9; i++){
        if(x != i){
            let nearValue = document.getElementsByTagName('tr')[y].childNodes[i].childNodes[0].value
            if(nearValue != '' && nearValue == value) {
                return false
            }
        }
    }
    return true
}

function checkY (value, x, y){
    for(let i = 0; i < 9; i++){
        if(y != i){
            let nearValue = document.getElementsByTagName('tr')[i].childNodes[x].childNodes[0].value
            if(nearValue == value && nearValue !== '') {
                return false
            }
        }
    }
    return true
}

function getSection(x, y) {
    return x>=0&&y>=0&&x<=2&&y<=2?//section1  //섹션검사
            [0,0,2,2]:
            x>=3&&y>=0&&x<=5&&y<=2?//section2
            [3,0,5,2]:
            x>=6&&y>=0&&x<=8&&y<=2?//section3
            [6,0,8,2]:
            x>=0&&y>=3&&x<=2&&y<=5?//section4
            [0,3,2,5]:
            x>=3&&y>=3&&x<=5&&y<=5?//section5
            [3,3,5,5]:
            x>=6&&y>=3&&x<=8&&y<=5?//section6
            [6,3,8,5]:
            x>=0&&y>=6&&x<=2&&y<=8?//section7
            [0,6,2,8]:
            x>=3&&y>=6&&x<=5&&y<=8?//section8
            [3,6,5,8]:
            x>=6&&y>=6&&x<=8&&y<=8?//section9
            [6,6,8,8]:undefined;
}

function checkSec (value,x,y) {// 5 x = 6, y = 4
    const [startX, startY, endX, endY] = x>=0&&y>=0&&x<=2&&y<=2?//section1
                                        [0,0,2,2]:
                                        x>=3&&y>=0&&x<=5&&y<=2?//section2
                                        [3,0,5,2]:
                                        x>=6&&y>=0&&x<=8&&y<=2?//section3
                                        [6,0,8,2]:
                                        x>=0&&y>=3&&x<=2&&y<=5?//section4
                                        [0,3,2,5]:
                                        x>=3&&y>=3&&x<=5&&y<=5?//section5
                                        [3,3,5,5]:
                                        x>=6&&y>=3&&x<=8&&y<=5?//section6
                                        [6,3,8,5]:
                                        x>=0&&y>=6&&x<=2&&y<=8?//section7
                                        [0,6,2,8]:
                                        x>=3&&y>=6&&x<=5&&y<=8?//section8
                                        [3,6,5,8]:
                                        x>=6&&y>=6&&x<=8&&y<=8?//section9
                                        [6,6,8,8]:undefined;
        for(let i = startY; i <=endY; i++){
            for(let j = startX; j <= endX; j++){
                if(x != j && y != i) {
                    let nearValue = document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].value
                    if(nearValue == value && nearValue !== ''){
                        return false
                    }
                }
            }
        }
        return true;
}

function makeran () {
    x = Math.floor(Math.random()*9)
    if(x == 9) x--;
    y = Math.floor(Math.random()*9)
    if(y == 9) y--;
    return [y,x]
}

function makesudoku () {
        for(let i = 0; i < 3; i++){
            make:while(true) {
                let [y,x] = makeran();
                let value = Math.floor(Math.random()*10)
                value == 0 ? value = 1 : undefined;
                value == 10 ? value = 9 : undefined;
                let duplicate = 0;
                if(document.getElementsByTagName('tr')[0].childNodes[x].childNodes[0].value == ''){
                    for(let j = 0; j < 9; j++){
                        if(document.getElementsByTagName('tr')[0].childNodes[j].childNodes[0].value != '' && document.getElementsByTagName('tr')[0].childNodes[j].childNodes[0].value == value){
                            duplicate = 1;
                            break;
                        }
                    }
                    if(!duplicate) {
                        document.getElementsByTagName('tr')[0].childNodes[x].childNodes[0].value = value;
                        sudoku[0][x] = value;
                        break make
                    }                    
                }
            }
        }
}

function findemptyYX(board) {
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] == 0){
                return [i,j] //i == y축, j == x축
            }
        }
    }
    return [false,false] //빈 값이 없다 == 수도쿠가 완성이 되었다.
}

function findpossiblevalue(board, y,x, num=1){
    let result = 0;
    num:for(num; num <= 9; num++){
        find:while(1){
            for(let i = 0; i < 9; i++){//y축 검사
                if(y != i){
                    let nearValue = board[i][x]//
                    if(nearValue == num && nearValue !== 0) {
                        break find;
                    }
                }
            }
            for(let i = 0; i < 9; i++){//x축 검사
                if(x != i){
                    let nearValue = board[y][i]//
                    if(nearValue == num && nearValue !== 0) {
                        break find;
                    }
                }
            }
            const [startX, startY, endX, endY] = x>=0&&y>=0&&x<=2&&y<=2?//section1  //섹션검사
                                            [0,0,2,2]:
                                            x>=3&&y>=0&&x<=5&&y<=2?//section2
                                            [3,0,5,2]:
                                            x>=6&&y>=0&&x<=8&&y<=2?//section3
                                            [6,0,8,2]:
                                            x>=0&&y>=3&&x<=2&&y<=5?//section4
                                            [0,3,2,5]:
                                            x>=3&&y>=3&&x<=5&&y<=5?//section5
                                            [3,3,5,5]:
                                            x>=6&&y>=3&&x<=8&&y<=5?//section6
                                            [6,3,8,5]:
                                            x>=0&&y>=6&&x<=2&&y<=8?//section7
                                            [0,6,2,8]:
                                            x>=3&&y>=6&&x<=5&&y<=8?//section8
                                            [3,6,5,8]:
                                            x>=6&&y>=6&&x<=8&&y<=8?//section9
                                            [6,6,8,8]:undefined;
            for(let i = startY; i <=endY; i++){
                for(let j = startX; j <= endX; j++){
                    if(x != j && y != i) {
                        let nearValue = board[i][j];
                        if(nearValue == num && nearValue !== 0){
                            break find;
                        }
                    }
                }
            }
            result = num;
            break num;
        }
    }
    return result !== 0 ? result : 0;
}

function delay(time){
    return new Promise(resolve => setTimeout(() => {
        return resolve();
    }, time))
}

//dfs 깊이우선탐색으로 구현
async function dfsbacktracking(board,stack, isBack = false, slow = false, first = true) {
    // let [y,x] = findemptyYX(board);
    // if(y === false && x === false) return true //빈 공간이 더 이상 없음 === 다 채우기 성공
    // let lastNum = stack[stack.length-1];
    // let possibleNum = isBack ? (stack.pop() == 9 ? 0 : findpossiblevalue(board,y,x,lastNum+1)) : findpossiblevalue(board,y,x)
    // if(possibleNum == 0) {
    //     if(x === 0, y === 0) return false;
    //     x == 0 ? (y--,x=8) : x--;
    //     document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = '';
    //     board[y][x] = 0;
    //     return dfsbacktracking(board, stack, true);
    // } else {
    //     board[y][x] = possibleNum;
    //     document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = possibleNum;
    //     stack.push(possibleNum);
        
    //     return dfsbacktracking(board,stack);
    // }
    /*---------위에는 재귀로 풀었음 콜스택 실행 환경이 안 좋음 ----------*/

    let time = 1000
    setInterval(() => {
        if(time > 100) {
            time-=100;
        } else if (time > 10) {
            time-=10;
        } else if (time >= 1) {
            time-=1;
        }
    }, 400);

    while(1){
        console.log(`time:${time}, slow의 상태:${slow}`)
        let [y,x] = findemptyYX(board);
        if(y === false && x === false) return true;
        let lastNum = stack[stack.length-1];
        let possibleNum = isBack ? (stack.pop() == 9 ? 0 : findpossiblevalue(board,y,x,lastNum+1)) : findpossiblevalue(board,y,x);
            if(possibleNum == 0) {
                if(slow===true) {
                    await delay(time)
                    time == 0 ? slow = false : undefined;
                }
                if(x === 0&&y === 0) return false;
                if(first === false) {
                    findempty:while(true) {
                        x == 0 ? (y--,x=8) : x--;
                        if(!document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].classList.contains('blue')) {
                            if(x === 0 && y === 0){
                                return false
                            } else {
                                break findempty;
                            };
                        };
                    }
                } else if(first == true){
                    x == 0 ? (y--,x=8) : x--;
                }
                document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = '';
                board[y][x] = 0;
                isBack = true;
            } else {
                if(slow===true) {
                    await delay(time)
                    time == 0 ? slow = false : undefined;
                }
                board[y][x] = possibleNum;
                document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = possibleNum;
                stack.push(possibleNum);
                isBack=false;
            }
    }
}

//bfs 너비우선탐색으로 구현 하지만 경우의 수가 너무 많음 한번 검색할때 마다 배열을 계속 복사해서 넘겨줘야 해서 공간복잡도, 시간복잡도 모두 dfs에 비해 떨어짐
//스도쿠에서는 bfs가 효율적이지 않음
function bfsbacktracking(board, queue,isBack = false, slow = false, first = true) {
    /*
    queue.push(board);
    while(queue.length!==0){
        let received = queue.shift();
        let [y,x] = findemptyYX(received);
        let possibleNum = 0;
        if(y !== false && x !== false) {
            while(1) {
                possibleNum = findpossiblevalue(received,y,x,possibleNum+1)
                if(possibleNum !== 0){
                    let copy = [...received.map(item=>[...item])];
                    copy[y][x] = possibleNum;
                    queue.push(copy);
                } else {
                    break;
                }
            }
        } else if (y === false && x === false){
            break;
        }
        if(q == 9999){
            let copy = [...received.map(item=>[...item])];
            for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                    document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].value = copy[i][j];
                }
            }
        }
    }
    */
}

function setEnv (num = 61,isBack = false, slow = false, first = true) {
    while(1){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                let dom_sudoku = document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0]
                dom_sudoku.value = '';
                dom_sudoku.readOnly = true;
                dom_sudoku.classList.add('blue')
                sudoku[i][j] = 0;
            }
        }
        makesudoku();
        if(dfsbacktracking(sudoku,[],isBack = false, slow = false, first = true)) {
            break;
        } 
    }

    for(let i = 0; i < num; i++){
        while(1) {
            let [y,x] = makeran();
            if(sudoku[y][x] != 0) {
                sudoku[y][x] = 0;
                document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = '';
                document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].readOnly = false;
                document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].classList.remove('blue')
                break;
            };
        }
    }
}

window.addEventListener('DOMContentLoaded',function(){
    setEnv(easy,false,false,true);
    // makesudoku()
})

// document.getElementsByTagName('td').addEventListener('click', function(e) {
//     console.log('aw')
// })

window.addEventListener('click', function (e) {
    if (e.target.tagName == 'BODY') {
        for(let j = 0; j < 9 ; j++) {
            for(let k = 0; k < 9; k++) {
                document.getElementsByTagName('tr')[j].childNodes[k].childNodes[0].classList.remove('lightblue')
            }
        }
    }
})


for(let i = 0; i < tds.length; i++) {
    document.getElementsByTagName('td')[i].addEventListener('click', function (e) {
        for(let j = 0; j < 9 ; j++) {
            for(let k = 0; k < 9; k++) {
                document.getElementsByTagName('tr')[j].childNodes[k].childNodes[0].classList.remove('lightblue')
            }
        }
        x = parseInt(e.target.className[1])
        y = parseInt(e.target.className[3])
        section = getSection(x, y)
        for(let j = 0; j < 9; j++) {
            document.getElementsByTagName('tr')[y].childNodes[j].childNodes[0].classList.add('lightblue')
            document.getElementsByTagName('tr')[j].childNodes[x].childNodes[0].classList.add('lightblue')
        }
        for(let j = section[0]; j <= section[2] ; j++) {
            for(let k = section[1]; k <= section[3]; k++) {
                document.getElementsByTagName('tr')[k].childNodes[j].childNodes[0].classList.add('lightblue')
            }
        }
    })
}


document.addEventListener('input',function (e){
    e.target.value = e.target.value.slice(0,1);
    (e.target.value == 0 || e.target.value == 10) ? e.target.value = '' : undefined;
    x = parseInt(e.target.className[1])
    y = parseInt(e.target.className[3])
    sudoku[y][x] = parseInt(e.target.value);
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let target = document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].value;
            if(document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].value == '') {
                target = 0;
            }
            if(!checkX(target,j,i) || !checkY(target,j,i) || !checkSec(target,j,i)) {
                if(document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].classList.contains('blue')){
                    document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].classList.add('blink');
                } else {
                    document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].classList.add('red');
                    document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].classList.add('blink');
                }
            } else {
                document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].classList.remove('red');
                    document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].classList.remove('blink');
            }
        }
    }
})

// document.querySelector('.btn__show__dfs').addEventListener('click',function (){
//     let CantSolve = false;
//     findred : for(let i = 0; i < 9; i++){
//         for(let j = 0; j < 9; j++){
//             if(document.getElementsByTagName('tr')[i].childNodes[j].childNodes[0].classList.contains('red')){
//                 CantSolve = true;
//                 break findred;
//             }
//         }
//     }
//     if(CantSolve){
//         alert('현재 상황에서는 풀 수 없음');
//     } else {
//         dfsbacktracking(sudoku,[], false, true, false);
//     }
// })

// document.querySelector('.btn__refresh').addEventListener('click',function(){
//     setEnv();
// })

document.addEventListener('click',function(e){
    let tag = e.target.className;
    if(tag === 'easy__mode'|| tag === 'nomal__mode' || tag==='hard__mode'){
        let show__num = 
        tag==='easy__mode'
        ? (life=10,easy)
        : tag==='nomal__mode'
        ? (life=5,normal)
        : tag==='hard__mode'
        ? (life=3,hard) : undefined;
        setEnv(show__num);
        console.log(`life = ${life}, showNum = ${81-show__num}`)
    }
})

// slalAnimObj.esp
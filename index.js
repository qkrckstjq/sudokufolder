const table = document.getElementsByTagName('table')[0];

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
                // console.log('checkX is false')
                return false;
            };
        }
    }
    return true
}

function checkY (value, x, y){
    for(let i = 0; i < 9; i++){
        if(y != i){
            let nearValue = document.getElementsByTagName('tr')[i].childNodes[x].childNodes[0].value
            if(nearValue == value && nearValue !== '') {
                // console.log('checkY is false')
                return false
            }
        }
    }
    return true
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
                        // console.log('checkSection is false')
                        return false
                    }
                }
            }
        }
        return true
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
                y = 0;
                let value = Math.floor(Math.random()*10)
                value == 0 ? value = 1 : undefined;
                value == 10 ? value = 9 : undefined;
                if(checkX(value,x,y) && checkY(value,x,y) && checkSec(value,x,y)) {
                    document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = value;
                    sudoku[y][x] = value;
                    break make;
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

function delay(){
    return new Promise(resolve => setTimeout(() => {
        return resolve();
    }, time))
}

async function backtracking(board,stack, isBack = false, slow = false, first = true) {
    // count++
    // let [y,x] = findemptyYX(board);
    // if(y === false && x === false) return true //빈 공간이 더 이상 없음 === 다 채우기 성공
    // let lastNum = stack[stack.length-1];
    // let possibleNum = isBack ? (stack.pop() == 9 ? 0 : findpossiblevalue(board,y,x,lastNum+1)) : findpossiblevalue(board,y,x)
    // if(possibleNum == 0) {
    //     if(x === 0, y === 0) return false;
    //     x == 0 ? (y--,x=8) : x--;
    //     document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = '';
    //     board[y][x] = 0;
    //     return backtracking(board, stack, true);
    // } else {
    //     board[y][x] = possibleNum;
    //     document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = possibleNum;
    //     stack.push(possibleNum);
        
    //     return backtracking(board,stack);
    // }
    /*---------위에는 재귀로 풀었음 콜스택 실행 환경이 안 좋음 ----------*/

    let time = 1000
    setInterval(() => {
        time != 0 ? time-=100 : time = 0;
    }, 1000);

    while(1){
        count++
        let [y,x] = findemptyYX(board);
        if(y === false && x === false) return true;
        let lastNum = stack[stack.length-1];
        let possibleNum = isBack ? (stack.pop() == 9 ? 0 : findpossiblevalue(board,y,x,lastNum+1)) : findpossiblevalue(board,y,x);
            if(possibleNum == 0) {
                if(slow===true) {
                    await delay(time)
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
                }
                board[y][x] = possibleNum;
                document.getElementsByTagName('tr')[y].childNodes[x].childNodes[0].value = possibleNum;
                stack.push(possibleNum);
                isBack=false;
            }
    }
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
        if(backtracking(sudoku,[],isBack = false, slow = false, first = true)) {
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
    setEnv(num=61,first=true);
    // makesudoku()
})

document.addEventListener('input',function (e){
    e.target.value = e.target.value.slice(0,1);
    (e.target.value == 0 || e.target.value == 10) ? e.target.value = '' : undefined;
    x = parseInt(e.target.className[1])
    y = parseInt(e.target.className[3])
    if(!checkX(e.target.value,x,y) || !checkY(e.target.value,x,y) || !checkSec(e.target.value,x,y)) {
        e.target.classList.add('red')
        e.target.classList.remove('blue')
        sudoku[y][x] = 0;
    } else {
        e.target.classList.remove('red')
        e.target.classList.remove('blue')
        sudoku[y][x] = parseInt(e.target.value);
    }
})

document.querySelector('.btn__show').addEventListener('click',function (){
    backtracking(sudoku,[], false, true, false) ? console.log(count) : undefined;
})

document.querySelector('.btn__refresh').addEventListener('click',function(){
    setEnv();
})

document.addEventListener('click',function(e){
    let tag = e.target.className;
    if(tag === 'easy__mode'|| tag === 'nomal__mode' || tag==='hard__mode'){
        let show__num = 
        tag==='easy__mode'
        ? (life=10,61)
        : tag==='nomal__mode'
        ? (life=5,71)
        : tag==='hard__mode'
        ? (life=3,76) : undefined;
        setEnv(show__num);
    }
})
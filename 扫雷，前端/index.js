var allMine = [];
var choseMine = [];
var mine = [];
const numbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];
const icons = ['🐣','💣','🚧'];
console.log(icons[0]);
var isMarked = [];


//初始化
function setNum (){
  //clearInterval(timer);  
  var map = document.getElementById('map');
  map.innerHTML = '';
  for(let i=0;i<col.value;i++){
    var bigGe = document.createElement('div');
    bigGe.id = "row"+i;
    bigGe.className = "bigGe";
    map.appendChild(bigGe);
    mine[i] = new Array();
    isMarked[i] = new Array();
    for(let j = 0;j<row.value;j++){
      var smaGe = document.createElement('div');
      smaGe.className = "smaGe";
      smaGe.id = i+'-'+j;
      smaGe.innerHTML = '◻️';
      bigGe.appendChild(smaGe);
      mine[i][j] = Number(0);
      isMarked[i][j] = false;
    }
  }
  var dileiNum = document.getElementById('dileiNum');
  document.getElementById('restNum').innerHTML = dileiNum.value+'/'+dileiNum.value;
  createMine();
  mineSum();
  a();
  var result = document.getElementById('default');
  result.innerHTML = '😀';
}
setNum();



//给每一个格子绑定点击函数
function a(){
  var smaGe = document.getElementsByClassName('smaGe');
  var col = document.getElementById('col');
  var row = document.getElementById('row');
for(let i = 0;i<(col.value)*(row.value);i++){
  smaGe[i].onclick = function geClick(event){
    var locaxy = this.id.split('-',2);
    var locax = locaxy[0];
    var locay = locaxy[1];
    if(click(locax,locay)){
      isEnding();
    }
  }
}
}

console.log(isMarked);
//初始设置

//设置页面的出现
function setPageOut(){
  var center = document.getElementById('centerPart');
  var setPage = document.getElementById('setPage');
  //center.setAttribute("display","none");
  if(center.style.display == 'inline-block')
  {
    center.setAttribute('style','display:none');
    setPage.setAttribute('style','display:inline-block');
  }
  else{
    center.setAttribute('style','display:inline-block');
    setPage.setAttribute('style','display:none');
  }
  setNum();
}


//随机分配地雷
function createMine(){
  var col = document.getElementById('col');
  var row = document.getElementById('row');
  var dileiNum = document.getElementById('dileiNum');  
  let i=0;
  while(i<dileiNum.value){
    var ranx = Math.floor((Math.random()*(row.value)));
    var rany = Math.floor((Math.random()*(col.value)));
    if(mine[ranx][rany]!=-1){
      mine[ranx][rany]=-1;
      i++;
    }
  }
}

//是否是地雷 函数判断
function isMine(a,b){
  let row = a;
  let col = b;
  if(mine[row][col]==-1){
    return true;
  }
  else{
    return false;
  }
}

//给每一个方块标示周围的雷的数量
function mineSum(){
  var col = document.getElementById('col');
  var row = document.getElementById('row');
  for(let i=0;i<row.value;i++){
    for(let j=0;j<col.value;j++){
      if(mine[i][j] == -1){
        continue;
      }
      if(i-1>=0&&isMine(i-1,j)){
          mine[i][j]++;
      }
      if(i-1>=0&&j<col.value-1&&isMine(i-1,j+1)){
        mine[i][j]++;
      }
      if(i-1>=0&&j-1>=0&&isMine(i-1,j-1)){
        mine[i][j]++;
      }
      if(i<row.value-1&&isMine(i+1,j)){
        mine[i][j]++;
      }
      if(i<row.value-1&&j<col.value-1&&isMine(i+1,j+1)){
        mine[i][j]++;
      }
      if(j-1>=0&&i<row.value-1&&isMine(i+1,j-1)){
        mine[i][j]++;
      }
      if(j<col.value-1&&isMine(i,j+1)){
        mine[i][j]++;
      }
      if(j-1>=0&&isMine(i,j-1)){
        mine[i][j]++;
      }
    }
  }
  console.log(mine);
}

//判断地雷是否都被找出来了
function isEnding(){
  var dileiNum = document.getElementById('dileiNum');
  var col = document.getElementById('col');
  var row = document.getElementById('row');
  var result = document.getElementById('default');
  let count = 0;
  for(let i=0;i<row.value;i++){
    for(let j=0;j<col.value;j++){
      if(!isMarked[i][j]){
        count = count+1;
      }
    }
  }
  console.log(count,dileiNum.value);
  if(dileiNum.value == count){
    console.log('x');
    allOut();
    result.innerHTML = '😎';
    clearInterval(timer);
    return true;
  }
  else{
    return false;
  }
}

//都被找出后的操作
function allOut(){
  for(let i=0;i<row.value;i++){
    for(let j=0;j<col.value;j++){
      if(mine[i][j]==-1){
        var temp = document.getElementById(i+'-'+j);
        temp.innerHTML = icons[2];
      }
    }
  }
}

//碰到地雷，游戏结束
function GameOver(){
  var result = document.getElementById('default');
  result.innerHTML = 'GAME OVER'+'😵';
  for(let i=0;i<row.value;i++){
    for(let j=0;j<col.value;j++){
      if(mine[i][j]==-1){
        var temp = document.getElementById(i+'-'+j);
        temp.innerHTML = icons[1];
      }
      else{
        if(mine[i][j]==0){
          OutWhite(i,j);
        }else{
          OutNum(i,j);
        }
      }
    }
  }
  
}


//判断空白并延伸
function autoSpread(a,b){
  let row = Number(a);
  let col = Number(b);
  var col1 = document.getElementById('col');
  var row1 = document.getElementById('row');
  if(row<0||col<0||row>=row1.value||col>=col1.value||isMarked[row][col]){
    return 0;
  }
  else{
      if(mine[row][col]==0&& !(isMarked[row][col])){
          OutWhite(row,col);
          autoSpread(row-1,col-1);
          autoSpread(row-1,col);
          autoSpread(row-1,col+1);
          autoSpread(row,col+1);
          autoSpread(row,col-1);
          autoSpread(row+1,col-1);
          autoSpread(row+1,col);
          autoSpread(row+1,col+1);
      }
      else{
        OutNum(row,col);
      }
  }
  return 0;
}

//点击事件绑定，点击的几种情况
function click(a,b){
  document.getElementById('count').innerHTML = (Number(document.getElementById('count').innerHTML)+1);
  let row = a;
  let col = b;
  let judge = true;
  if(judge){
    timeCount();
    judge = false;
  }
  if(mine[row][col]==0){
    autoSpread(row,col);
    return true;
  }
  else if(isMine(row,col)){
        clearInterval(timer);
        GameOver();
        return false;
      }
      else{
        OutNum(row,col);
    return true;
      }
}
//出现空白
function OutWhite(a,b){
  isMarked[a][b] = true;
  var temp = document.getElementById(a+'-'+b);
  temp.innerHTML = icons[0];
  return true;

}
//出现数字
function OutNum(a,b){
  isMarked[a][b] = true;
  var temp = document.getElementById(a+'-'+b);
  temp.innerHTML = numbers[ mine[a][b]-1 ];
}

var timer;
function timeCount(){
  let count = 0;
  timer = setInterval(function(){
    count++;
    second = count/10;
    afterPoint = count%10;
    document.getElementById('spend').innerHTML = parseInt(second)+'.'+afterPoint;
  },100)
}


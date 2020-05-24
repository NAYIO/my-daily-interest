function findLongLength(arr){
  return arr.reduce(function(a,b){
    return a.length>b.length? a:b;
  },'')
}
var vm = ['sa','fdas','f','sa','fdsas','wq']
console.log(findLongLength(vm));
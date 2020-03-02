/*Vue.component('todo-item',{
    props : ['todoItem'],
    template : '<li>{{todoItem.text}}</li>'
}) 

var example = new Vue({
    el : "#example",
    data : {
        items : [
            {id : 0,text : '蔬菜'},
            {id : 1,text : '蔬菜牛奶'},
            {id : 2,text : '蔬菜水果'},
        ]
    }
})*/


var example = new Vue({
    el : '#example',
    data : {
        itemList : [
            {id : 0,text : '蔬菜'},
            {id : 1,text : '蔬菜牛奶'},
            {id : 2,text : '蔬菜水果'},
        ]
    }
})



/*var app = new Vue({
    el : '#example',
    data : {
        firstName : 'John',
        lastName : 'White'
    },
    computed : {
        fullName : {
            get : function(){
                return this.firstName + ' ' + this.lastName
            },
            set : function(newValue){
                var name = newValue.split(' ');
                this.firstName = name[0];
                this.lastName = name[name.length - 1];
            }
        }
    }
})*/
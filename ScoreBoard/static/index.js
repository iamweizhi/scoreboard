// 创建一个新的 Vue 实例
var bav = new Vue({
  el: '#leftBox',
  data: {
    name:"the Instruction",
    instructionName:"instruction Status",
    fuctionName:"functional Unit Status",
    resirterName:"Register Result Status",
    active: 'home',
    instructions:[],
    functionals:[],
    registers:[],

  },
  methods: {
    makeActive: function(item){
        // 模型改变，视图会自动更新
        this.active = item;
    }
    }
});
$.ajaxSetup({
    data: {csrfmiddlewaretoken: '{{ csrf_token }}' },
});
var right = new Vue({

    el:"#rightBox",
    data:{
        message2:"0",
        message1:"1",
        isa:0,
        endCircle:0,
        maxCircle:0
//        message3:""
    },
    methods:{
        inputInstructions: function(event){
//            alert(this.message1);
            //发送 post 请求
            this.$http.post('/getcodes/',{mesage:this.message1},{emulateJSON:true}).then(function(res){
//            success
                if(res.body==1){
                    alert("please input code with the right rules")
                }else{
                    this.isa = 1
                    var jsonObj = JSON.parse(JSON.stringify(res.data));
                    bav.instructions = jsonObj
//                    this.maxCircle =
//                    alert(bav.instructions[0]['k'])
                }
            },function(res){
                alert("internet is wrong")
            });
        },
        inputNums: function(event){
            this.$http.post('/getnumbers/',{mesage:this.message2,istrue:this.isa},{emulateJSON:true}).then(function(res){
//            success

                if(this.message2<0){
                    alert("must > 0!");
                    return
                }
                if(res.body==1){
                    alert("please input right number")
                    alert(res.body)
                }else{
                    var jsonObj = JSON.parse(JSON.stringify(res.data));
                    bav.instructions = jsonObj["insTable"]
                    bav.functionals = jsonObj["funcUTable"]
                    bav.registers = jsonObj["registerTable"]
                    this.endCircle = jsonObj["end_cycle"]
//                    alert(bav.functionals)
                }
            },function(res){
                alert("internet is wrong")
            });
        },
        before: function(event){
            this.$http.post('/getnumbers/',{mesage:this.endCircle-1,istrue:this.isa},{emulateJSON:true}).then(function(res){
//            success
                if(this.endCircle-1<0){
                    alert("must > 0!");
                    return
                }
                if(res.body==1){
                    alert("the number is too small")
                    alert(res.body)
                }else{
                    var jsonObj = JSON.parse(JSON.stringify(res.data));
                    bav.instructions = jsonObj["insTable"]
                    bav.functionals = jsonObj["funcUTable"]
                    bav.registers = jsonObj["registerTable"]
                    this.endCircle = jsonObj["end_cycle"]
//                    alert(bav.functionals)
                }
            },function(res){
                alert("internet is wrong")
            });
        },
        after:function(event){
            this.$http.post('/getnumbers/',{mesage:this.endCircle+1,istrue:this.isa},{emulateJSON:true}).then(function(res){
//            success
                if(res.body==1){
                    alert("the number is too max")
                    alert(res.body)
                }else{
                    var jsonObj = JSON.parse(JSON.stringify(res.data));
                    bav.instructions = jsonObj["insTable"]
                    bav.functionals = jsonObj["funcUTable"]
                    bav.registers = jsonObj["registerTable"]
                    this.endCircle = jsonObj["end_cycle"]
//                    alert(bav.functionals)
                }
            },function(res){
                alert("internet is wrong")
            });
        }
    }
})
class Players{

    constructor(){
         
         this.userArray = [];
         this.cardArray = [
            {card_name:'A1-1',card_num:'14',priority_num:'14','img_name':'A1-1.png'},
            {card_name:'A1-2',card_num:'2',priority_num:'2','img_name':'A1-2.png'},
            {card_name:'A1-3',card_num:'3',priority_num:'3','img_name':'A1-3.png'},
            {card_name:'A1-4',card_num:'4',priority_num:'4','img_name':'A1-4.png'},
            {card_name:'A1-5',card_num:'5',priority_num:'5','img_name':'A1-5.png'},
            {card_name:'A1-6',card_num:'6',priority_num:'6','img_name':'A1-6.png'},
            {card_name:'A1-7',card_num:'7',priority_num:'7','img_name':'A1-7.png'},
            {card_name:'A1-8',card_num:'8',priority_num:'8','img_name':'A1-8.png'},
            {card_name:'A1-9',card_num:'9',priority_num:'9','img_name':'A1-9.png'},
            {card_name:'A1-10',card_num:'10',priority_num:'10','img_name':'A1-10.png'},
            {card_name:'A1-11',card_num:'11',priority_num:'11','img_name':'A1-11.png'},
            {card_name:'A1-12',card_num:'12',priority_num:'12','img_name':'A1-12.png'},
            {card_name:'A1-13',card_num:'13',priority_num:'13','img_name':'A1-13.png'},

            {card_name:'A2-1',card_num:'14',priority_num:'27','img_name':'A2-1.png'},
            {card_name:'A2-2',card_num:'2',priority_num:'15','img_name':'A2-2.png'},
            {card_name:'A2-3',card_num:'3',priority_num:'16','img_name':'A2-3.png'},
            {card_name:'A2-4',card_num:'4',priority_num:'17','img_name':'A2-4.png'},
            {card_name:'A2-5',card_num:'5',priority_num:'18','img_name':'A2-5.png'},
            {card_name:'A2-6',card_num:'6',priority_num:'19','img_name':'A2-6.png'},
            {card_name:'A2-7',card_num:'7',priority_num:'20','img_name':'A2-7.png'},
            {card_name:'A2-8',card_num:'8',priority_num:'21','img_name':'A2-8.png'},
            {card_name:'A2-9',card_num:'9',priority_num:'22','img_name':'A2-9.png'},
            {card_name:'A2-10',card_num:'10',priority_num:'23','img_name':'A2-10.png'},
            {card_name:'A2-11',card_num:'11',priority_num:'24','img_name':'A2-11.png'},
            {card_name:'A2-12',card_num:'12',priority_num:'25','img_name':'A2-12.png'},
            {card_name:'A2-13',card_num:'13',priority_num:'26','img_name':'A2-13.png'},

            {card_name:'A3-1',card_num:'14',priority_num:'40','img_name':'A3-1.png'},
            {card_name:'A3-2',card_num:'2',priority_num:'28','img_name':'A3-2.png'},
            {card_name:'A3-3',card_num:'3',priority_num:'29','img_name':'A3-3.png'},
            {card_name:'A3-4',card_num:'4',priority_num:'30','img_name':'A3-4.png'},
            {card_name:'A3-5',card_num:'5',priority_num:'31','img_name':'A3-5.png'},
            {card_name:'A3-6',card_num:'6',priority_num:'32','img_name':'A3-6.png'},
            {card_name:'A3-7',card_num:'7',priority_num:'33','img_name':'A3-7.png'},
            {card_name:'A3-8',card_num:'8',priority_num:'34','img_name':'A3-8.png'},
            {card_name:'A3-9',card_num:'9',priority_num:'35','img_name':'A3-9.png'},
            {card_name:'A3-10',card_num:'10',priority_num:'36','img_name':'A3-10.png'},
            {card_name:'A3-11',card_num:'11',priority_num:'37','img_name':'A3-11.png'},
            {card_name:'A3-12',card_num:'12',priority_num:'38','img_name':'A3-12.png'},
            {card_name:'A3-13',card_num:'13',priority_num:'39','img_name':'A3-13.png'},

            {card_name:'A4-1',card_num:'14',priority_num:'53','img_name':'A4-1.png'},
            {card_name:'A4-2',card_num:'2',priority_num:'41','img_name':'A4-2.png'},
            {card_name:'A4-3',card_num:'3',priority_num:'42','img_name':'A4-3.png'},
            {card_name:'A4-4',card_num:'4',priority_num:'43','img_name':'A4-4.png'},
            {card_name:'A4-5',card_num:'5',priority_num:'44','img_name':'A4-5.png'},
            {card_name:'A4-6',card_num:'6',priority_num:'45','img_name':'A4-6.png'},
            {card_name:'A4-7',card_num:'7',priority_num:'46','img_name':'A4-7.png'},
            {card_name:'A4-8',card_num:'8',priority_num:'47','img_name':'A4-8.png'},
            {card_name:'A4-9',card_num:'9',priority_num:'48','img_name':'A4-9.png'},
            {card_name:'A4-10',card_num:'10',priority_num:'49','img_name':'A4-10.png'},
            {card_name:'A4-11',card_num:'11',priority_num:'50','img_name':'A4-11.png'},
            {card_name:'A4-12',card_num:'12',priority_num:'51','img_name':'A4-12.png'},
            {card_name:'A4-13',card_num:'13',priority_num:'52','img_name':'A4-13.png'}
        ];
        this.check_pass_arr = [];
        this.user_point_array = [{first_user_id:'',first_user_score:0,second_user_id:'',second_user_score:0}];
        this.pass_track_array = [];
        this.user_round_array = [];
    }

    

    addPlayer(id,name,email){
        var newUser = {id,name,email};
        this.userArray.push(newUser);
        return this.userArray;

    }
    getCount(){
        var new_length = this.userArray.length;
        return new_length;
    }
    deletePlayer(socketId){
        var isuser = this.getPlayer(socketId);
        if(isuser){
             this.userArray = this.userArray.filter((user)=>{
                return user.id!==socketId;
            });

            return isuser;

        }
    }

    getPlayer(socketId){
        var users = this.userArray.filter((user)=>{
            return user.id===socketId;
        })

        return users[0];
    }

    getAllPlayer(){
        return this.userArray;
    }

    getAllCards(){
        return this.cardArray;
    }

    get10Random(){
        var random_arr = [];
        while(random_arr.length < 10){
            var r = Math.floor(Math.random() * 52) + 1;
            if(random_arr.indexOf(r) === -1) random_arr.push(r);
        }
        return random_arr;
    }

    get10RandomCards(){
        var random_numbrs = this.get10Random();
        var i;
        var rand_cards = Array();
        for(i=0; i<random_numbrs.length; i++){
            rand_cards.push(this.cardArray[random_numbrs[i]]);
        }
        return rand_cards;
    }

    searchCardByPriority(prio_num){
        var card_obj = this.cardArray.filter((card)=>{
            return card.priority_num == prio_num;
        })
        return card_obj[0];
    }
    compareCards(socketId,card_num,card_prio_num){
       
        if(this.check_pass_arr.length<1){

            var f_card_detls = this.searchCardByPriority(card_prio_num);
            var f_player_detls = this.getPlayer(socketId);

            this.check_pass_arr.push({user_id:socketId,card_num:card_num,name:f_player_detls.name});
            this.pass_track_array.push({user_id:socketId,card_num:card_num,prio_num:card_prio_num});
            return {turn:1,card_detls:f_card_detls,player:f_player_detls};
        }else{
            
            var prev_card_det = this.check_pass_arr[0];
            var prev_card_num = prev_card_det.card_num;
            //convert in to integer for comparision
            var prev_card_num = parseInt(prev_card_num);
            var card_num = parseInt(card_num);
            if(prev_card_num>card_num){
    
                var score_card = this.user_point_array[0];
                //update user scorecard
                this.user_point_array[0].first_user_id = prev_card_det.user_id;
                this.user_point_array[0].first_user_score = score_card.first_user_score+2;
                this.user_point_array[0].second_user_id = socketId;
                this.user_point_array[0].second_user_score = score_card.second_user_score+0;
                
                //empty array used for compare
                this.check_pass_arr = [];
                //store pass detail of user
                this.pass_track_array.push({user_id:socketId,card_num:card_num,prio_num:card_prio_num});
                //no of round user_round_array
                var s_player_detls = this.getPlayer(socketId);
                var num_round = this.pass_track_array.length/2;
                
                
                var s_card_detls = this.searchCardByPriority(card_prio_num);
                
                //return user , winner and pass detail
                return {turn:2,card_detls:s_card_detls,player:s_player_detls,user_first:1,user_second:0,
                    f_user_name:prev_card_det.name,s_user_name:s_player_detls.name,pass:num_round,user_points:this.user_point_array[0]};
            }else if(prev_card_num<card_num){
    
                var score_card = this.user_point_array[0];
                //update user scorecard
                this.user_point_array[0].first_user_id = prev_card_det.user_id;
                this.user_point_array[0].first_user_score = score_card.first_user_score+0;
                this.user_point_array[0].second_user_id = socketId;
                this.user_point_array[0].second_user_score = score_card.second_user_score+2;
                
                //empty array used for compare
                this.check_pass_arr = [];
                //store pass detail of user
                this.pass_track_array.push({user_id:socketId,card_num:card_num,prio_num:card_prio_num});
                
                //return user , winner and pass detail
                var s_card_detls = this.searchCardByPriority(card_prio_num);
                //no of round user_round_array
                var s_player_detls = this.getPlayer(socketId);
                var num_round = this.pass_track_array.length/2;
                console.log(this.user_point_array);
                
                return {turn:2,card_detls:s_card_detls,player:s_player_detls,user_first:0,user_second:1,
                    f_user_name:prev_card_det.name,s_user_name:s_player_detls.name,pass:num_round,user_points:this.user_point_array[0]};
            }else{
                var score_card = this.user_point_array[0];
                //update user scorecard
                this.user_point_array[0].first_user_id = prev_card_det.user_id;
                this.user_point_array[0].first_user_score = score_card.first_user_score+1;
                this.user_point_array[0].second_user_id = socketId;
                this.user_point_array[0].second_user_score = score_card.second_user_score+1;
                
                //empty array used for compare
                this.check_pass_arr = [];
                //store pass detail of user
                this.pass_track_array.push({user_id:socketId,card_num:card_num,prio_num:card_prio_num});
                
                //return user , winner and pass detail
                var s_card_detls = this.searchCardByPriority(card_prio_num);
                //no of round user_round_array
                var s_player_detls = this.getPlayer(socketId);
                var num_round = this.pass_track_array.length/2;
                console.log(this.user_point_array);
                return {turn:2,card_detls:s_card_detls,player:s_player_detls,user_first:1,
                    user_second:1,f_user_name:prev_card_det.name,s_user_name:s_player_detls.name,pass:num_round,user_points:this.user_point_array[0]};
            }
            
        }
    }

    resetData(){
        this.check_pass_arr = [];
        this.user_point_array = [{first_user_id:'',first_user_score:0,second_user_id:'',second_user_score:0}];
        this.pass_track_array = [];
    }
}

module.exports = {Players};
var reminder=angular.module('reminder',[]);
    reminder.filter('search',[function(){

        return function(data,key){
          var title=function(items){
            for(var i=0;i<items.length;i++){
              if(items[i].title.indexOf(key)!=-1){
                return true;
              }
            }
            return false;
          }
    
           var r=[];
          for(var i=0;i<data.length;i++){
            if(data[i].name.indexOf(key)!=-1||title(data[i].items)){
              r.push(data[i])        
            }
          }
          return r;
       }

     }])
    reminder.controller('rdCtrl', ['$scope', function($scope){
    $scope.list=localStorage.data?JSON.parse(localStorage.data):[];
        $scope.listindex=0;
        $scope.colors=['purple','green','red','yellow','brown','pink','orange']
        $scope.showitems=function(i){
            $scope.listindex=i;
        }
        
        $scope.addlists=function(){
        var addlist={
	   	name:'新列表'+($scope.list.length+1),
	    color:$scope.colors[$scope.list.length%7],
	    items:[]
	    }
        	$scope.list.push(addlist);
        	localStorage.data=JSON.stringify($scope.list);
        }
        
        $scope.dellist=function(){
            var r=[];
            for(var i=0;i<$scope.list.length;i++){
            	if(i!=$scope.listindex){
            		r.push($scope.list[i]);
            	}
            }
            $scope.list=r;
            localStorage.data=JSON.stringify($scope.list);
            $scope.listindex=0;
        }
        
       $scope.delall=function(){
       	   localStorage.clear();
           location.reload();

       }
       $scope.clear=function(ev){
       	ev.stopPropagation();
       }
      
      $scope.additem=function(){
      	var listitem=$scope.list[$scope.listindex].items;
      	var additem={title:"新条目"+(listitem.length+1),isDone:false};
      	listitem.push(additem);
      	localStorage.data=JSON.stringify($scope.list);
      }

      $scope.delitem=function(itemi){
         var r=[];
            for(var i=0;i<$scope.list[$scope.listindex].items.length;i++){
            	if(i!=itemi){
            		r.push($scope.list[$scope.listindex].items[i]);
            	}
            }
           $scope.list[$scope.listindex].items=r;
            localStorage.data=JSON.stringify($scope.list[$scope.listindex].items);
      }
      $scope.save=function(){
      	localStorage.data=JSON.stringify($scope.list);
      }
      $scope.countdone=function(){
        var lis=$scope.list[$scope.listindex].items;
        var r=0;
        for(var i=0;i<lis.length;i++){
          if(lis[i].isDone){
            r+=1;
          }
        }
        return r;
      }
}])

window.onload=function(){
	var xuanxiang=document.querySelector(".xuanx");
	var flag=true;
	xuanxiang.onclick=function(){
        if(flag){
		document.querySelector(".xuanxiang").style.display="block";
		document.querySelector(".jiantoubox").style.display="block";
		flag=false;
	}else{
        document.querySelector(".xuanxiang").style.display="none";
		document.querySelector(".jiantoubox").style.display="none";
		flag=true;
	}
}
  document.querySelector(".quxiao").onclick=document.querySelector(".wancheng").onclick=function(){
    	document.querySelector(".xuanxiang").style.display="none";
		document.querySelector(".jiantoubox").style.display="none";
		flag=!flag;
    }

  xuanxiang.ondblclick=function(e){
  	e.stopPropagation();
  }


}
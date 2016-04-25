;
(function(window, document) {

	var smartTable = {
		createTable : function(){

		},

		initTable:function(e,params){
			console.log("col="+params.col);
			console.log("row="+params.row);
			console.log("data.th="+params.data.th);
			console.log("data.td="+params.data.td[0]);
			console.log("data.td="+params.data.td[1]);
			console.log("data.td="+params.data.td[2]);

			var component = "";
			var th = "";
			var td = "";
			
			smartTable.createTable();
		},

		
	}

	this.smartTable = smartTable;

})(window, document);

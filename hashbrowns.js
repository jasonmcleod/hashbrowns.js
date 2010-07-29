hash = {running:false,rules:[],prevhash:"",beforeNext:0};
hash.go = function(h) {
	window.location.hash = h;
}
hash.init = function() {
	window.location.hash = "";
	setInterval(function() {
		realhash = window.location.hash.replace("#","");
		if(hash.prevhash != realhash) {						
			if(typeof hash.beforeNext == "function") {
				hash.beforeNext.call();						
			}
			if(typeof hash.rules[realhash].onEnter == "function") {
				hash.rules[realhash].onEnter.call();
				hash.beforeNext = hash.rules[realhash].onExit;
				hash.prevhash = realhash;
			}
		}
	},100);
}
hash.rule = function(r,i,o) {
	hash.rules[r] = {};
	hash.rules[r].onEnter = i;
	hash.rules[r].onExit = o;	
	if(!hash.running) {
		hash.init();
	}
};
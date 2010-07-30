hash = {now:"",running:false,rules:[],prev:"",next:"",beforeNext:0};
hash.set = function(h) {
	window.location.hash = h;
}
hash.init = function() {
	hash.running = true;
	setInterval(function() {
		hash.now = window.location.hash.replace("#","");
		if(hash.prev != hash.now) {						
			if(typeof hash.beforeNext == "function") {
				hash.beforeNext.call();						
			}
			if(typeof hash.rules[hash.now] == "object" && typeof hash.rules[hash.now].onEnter == "function") {
				hash.rules[hash.now].onEnter.call();
				hash.beforeNext = hash.rules[hash.now].onExit;
				hash.prev = hash.now;
			}
		}
	},100);
};
hash.rule = function(r,i,o) {
	hash.rules[r] = {};
	hash.rules[r].onEnter = i;
	hash.rules[r].onExit = o;	
	if(!hash.running) {
		hash.init();
	}
};
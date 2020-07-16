(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"test2_atlas_1", frames: [[0,1010,1506,517],[0,0,1008,1008]]},
		{name:"test2_atlas_2", frames: [[784,1950,590,69],[1601,1310,146,250],[0,1127,1164,251],[1596,1119,223,189],[1387,1597,554,143],[1749,1310,158,225],[902,1380,697,215],[1601,491,344,322],[1166,1127,216,216],[0,1380,900,298],[0,1680,782,340],[1086,491,476,164],[1384,1127,210,216],[1625,1742,165,203],[1387,1742,236,267],[1601,815,329,302],[784,1680,601,268],[1086,0,853,489],[0,0,1084,669],[0,671,1506,454]]},
		{name:"test2_atlas_3", frames: [[559,497,57,178],[280,497,277,43],[636,460,63,189],[0,0,511,63],[701,460,83,143],[905,390,83,144],[818,390,85,144],[191,376,87,143],[98,376,91,141],[0,376,96,139],[532,358,102,137],[137,192,116,132],[422,358,108,135],[892,0,125,128],[0,190,135,124],[329,180,146,120],[505,122,171,110],[678,161,158,116],[329,65,174,113],[0,65,166,123],[168,65,159,125],[838,161,139,127],[0,517,83,143],[979,130,21,32],[338,441,56,52],[312,302,108,137],[692,290,310,48],[0,326,310,48],[692,340,310,48],[929,130,26,25],[636,390,180,68],[477,180,13,13],[786,536,218,45],[85,519,78,77],[280,441,56,53],[678,122,55,36],[165,521,65,84],[255,192,72,105],[1002,130,18,22],[1002,154,18,22],[477,279,213,77],[747,0,143,159],[513,0,232,120],[477,234,49,31],[422,302,49,49],[957,130,20,22],[892,130,35,22],[979,178,32,9],[232,542,58,50]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_153 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_149 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_154 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_148 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_151 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_145 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_144 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_143 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_146 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_142 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_141 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_140 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_139 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_137 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_138 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_136 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_135 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_134 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_132 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_133 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_131 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_130 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_128 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_147 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_123 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_125 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_127 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_122 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_124 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_156 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_150 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_116 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_117 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["test2_atlas_3"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(img.CachedBmp_152);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4437,375);


(lib.CachedBmp_78 = function() {
	this.initialize(ss["test2_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["test2_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(img.CachedBmp_103);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3551,549);


(lib.CachedBmp_89 = function() {
	this.initialize(ss["test2_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tie_02 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_154();
	this.instance.setTransform(0.8,1.25,0.2913,0.2913);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.8,1.3,18.4,55);


(lib.Tie_01 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_153();
	this.instance.setTransform(-0.2,0.25,0.2847,0.2847);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.2,0.3,16.3,50.7);


(lib.terra1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_152();
	this.instance.setTransform(-16,72.15,0.4909,0.4909);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16,72.2,2178.2,184.10000000000002);


(lib.sword = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_151();
	this.instance.setTransform(-32.8,-13.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sword, new cjs.Rectangle(-32.8,-13.2,255.5,31.5), null);


(lib.ShadowNinja = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_150();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,155,24);


(lib.shadow = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_149();
	this.instance.setTransform(0,0,0.4408,0.4408);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,122.1,19);


(lib.rock2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_148();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,295,34.5);


(lib.rock1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_147();
	this.instance.setTransform(0,0,0.1912,0.1912);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,222.6,48);


(lib.rightlegGirl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_146();
	this.instance.setTransform(-12.6,-11.45,0.2725,0.2725);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.rightlegGirl, new cjs.Rectangle(-12.6,-11.4,39.8,68.10000000000001), null);


(lib.rightleg_walkGirl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_126();
	this.instance.setTransform(-12.55,-11.45,0.4779,0.4779);

	this.instance_1 = new lib.CachedBmp_127();
	this.instance_1.setTransform(-12.55,-11.45,0.4779,0.4779);

	this.instance_2 = new lib.CachedBmp_128();
	this.instance_2.setTransform(-9.55,-16.8,0.4779,0.4779);

	this.instance_3 = new lib.CachedBmp_129();
	this.instance_3.setTransform(-7.2,-18.8,0.4779,0.4779);

	this.instance_4 = new lib.CachedBmp_130();
	this.instance_4.setTransform(-6.9,-19.35,0.4779,0.4779);

	this.instance_5 = new lib.CachedBmp_131();
	this.instance_5.setTransform(-7.2,-19.3,0.4779,0.4779);

	this.instance_6 = new lib.CachedBmp_132();
	this.instance_6.setTransform(-6.25,-18.4,0.4779,0.4779);

	this.instance_7 = new lib.CachedBmp_133();
	this.instance_7.setTransform(-7.05,-17.45,0.4779,0.4779);

	this.instance_8 = new lib.CachedBmp_134();
	this.instance_8.setTransform(-7.8,-16.6,0.4779,0.4779);

	this.instance_9 = new lib.CachedBmp_135();
	this.instance_9.setTransform(-8.55,-15.8,0.4779,0.4779);

	this.instance_10 = new lib.CachedBmp_136();
	this.instance_10.setTransform(-9.15,-15.15,0.4779,0.4779);

	this.instance_11 = new lib.CachedBmp_137();
	this.instance_11.setTransform(-9.7,-14.5,0.4779,0.4779);

	this.instance_12 = new lib.CachedBmp_138();
	this.instance_12.setTransform(-10.25,-13.95,0.4779,0.4779);

	this.instance_13 = new lib.CachedBmp_139();
	this.instance_13.setTransform(-10.65,-13.5,0.4779,0.4779);

	this.instance_14 = new lib.CachedBmp_140();
	this.instance_14.setTransform(-10.95,-13,0.4779,0.4779);

	this.instance_15 = new lib.CachedBmp_141();
	this.instance_15.setTransform(-11.3,-12.75,0.4779,0.4779);

	this.instance_16 = new lib.CachedBmp_142();
	this.instance_16.setTransform(-11.5,-12.45,0.4779,0.4779);

	this.instance_17 = new lib.CachedBmp_143();
	this.instance_17.setTransform(-11.7,-12.3,0.4779,0.4779);

	this.instance_18 = new lib.CachedBmp_144();
	this.instance_18.setTransform(-11.8,-12.2,0.4779,0.4779);

	this.instance_19 = new lib.CachedBmp_145();
	this.instance_19.setTransform(-12.55,-11.45,0.4779,0.4779);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.5,-19.3,88.5,76.2);


(lib.rightArmGirl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_124();
	this.instance.setTransform(-61.4,-13.7,0.3616,0.3616);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.CachedBmp_125();
	this.instance_1.setTransform(-56.55,35.65,0.3616,0.3616);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.rightArmGirl, new cjs.Rectangle(-61.4,-13.7,80.7,68.4), null);


(lib.Petal = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_123();
	this.instance.setTransform(0.8,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.8,0,10.5,16);


(lib.leftlegGirl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_111();
	this.instance.setTransform(-12.45,-14.95,0.2739,0.2739);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.leftlegGirl, new cjs.Rectangle(-12.4,-14.9,43.3,61.6), null);


(lib.Head_Tie = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_104();
	this.instance.setTransform(0,0,0.4972,0.4972);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38.8,38.3);


(lib.groundplane = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_103();
	this.instance.setTransform(0,11.9,0.3897,0.3897);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,11.9,1383.8,214);


(lib.button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.btn_txt = new cjs.Text("CONTINUE", "40px 'ui-font'", "#009933");
	this.btn_txt.name = "btn_txt";
	this.btn_txt.lineHeight = 51;
	this.btn_txt.lineWidth = 227;
	this.btn_txt.parent = this;
	this.btn_txt.setTransform(-113.9,-24.05);

	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(-118.95,-41,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.btn_txt}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.button, new cjs.Rectangle(-118.9,-41,238,82), null);


(lib.bunny_tail = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_101();
	this.instance.setTransform(0,0,0.423,0.423);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,23.7,22.4);


(lib.bunny_nose = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(0,0,0.4372,0.4372);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,24.1,15.8);


(lib.bunny_foot2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_99();
	this.instance.setTransform(0,0,0.3498,0.3498);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,22.8,29.4);


(lib.bunny_foot1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_98();
	this.instance.setTransform(0,0,0.2853,0.2853);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,20.6,30);


(lib.bunny_eye2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(0,0,0.4372,0.4372);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,7.9,9.6);


(lib.bunny_eye1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_96();
	this.instance.setTransform(0,0,0.4372,0.4372);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,7.9,9.6);


(lib.bunny_ear2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(0,0,0.3335,0.3335);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,70.1,72.1);


(lib.bunny_ear1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_94();
	this.instance.setTransform(0,0,0.4372,0.4372);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,72.2,88.8);


(lib.bunny_body = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(0,0,0.37,0.37);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,121.8,111.8);


(lib.bodyGirl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.instance = new lib.CachedBmp_90();
	this.instance.setTransform(-26.8,-35.15,0.3986,0.3986);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.CachedBmp_91();
	this.instance_1.setTransform(-43.3,3.6,0.3986,0.3986);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_1
	this.instance_2 = new lib.CachedBmp_92();
	this.instance_2.setTransform(-45.95,-50.45,0.3986,0.3986);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bodyGirl, new cjs.Rectangle(-45.9,-50.4,94,106.4), null);


(lib.bg = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Katman_1
	this.instance = new lib.CachedBmp_89();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg, new cjs.Rectangle(0,0,504,504), null);


(lib.backgroundImage = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(1030.4,138.1,0.4286,0.4286);

	this.instance_1 = new lib.CachedBmp_87();
	this.instance_1.setTransform(797.05,212.75,0.4286,0.4286);

	this.instance_2 = new lib.CachedBmp_86();
	this.instance_2.setTransform(691.9,42.3,0.4286,0.4286);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(691.9,42.3,596.1,221.89999999999998);


(lib.headGirl = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_8
	this.instance = new lib.CachedBmp_105();
	this.instance.setTransform(-58.15,-22.15,0.5,0.5);

	this.instance_1 = new lib.Petal("synched",0);
	this.instance_1.setTransform(-55.15,-19.6,0.8595,0.8595,-99.605,0,0,6.5,16.3);

	this.instance_2 = new lib.Petal("synched",0);
	this.instance_2.setTransform(-55.25,-19.65,0.8595,0.8595,-165.0465,0,0,6.6,16.4);

	this.instance_3 = new lib.Petal("synched",0);
	this.instance_3.setTransform(-55.3,-19.7,0.8596,0.8596,124.0035,0,0,6.4,16.6);

	this.instance_4 = new lib.Petal("synched",0);
	this.instance_4.setTransform(-55.05,-19.6,0.8596,0.8596,52.0033,0,0,6.2,16.3);

	this.instance_5 = new lib.Petal("synched",0);
	this.instance_5.setTransform(-55.15,-19.65,0.8596,0.8596,-19.9561,0,0,6.3,16.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_4
	this.instance_6 = new lib.CachedBmp_106();
	this.instance_6.setTransform(-58.05,-27.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_2
	this.instance_7 = new lib.CachedBmp_107();
	this.instance_7.setTransform(-57.45,-58.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_7
	this.instance_8 = new lib.CachedBmp_109();
	this.instance_8.setTransform(19.2,-12.1,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_109();
	this.instance_9.setTransform(-7.7,-9.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8}]}).wait(1));

	// layer1
	this.instance_10 = new lib.CachedBmp_110();
	this.instance_10.setTransform(-40.9,-18.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.headGirl, new cjs.Rectangle(-69.6,-58.9,120.6,108), null);


(lib.Bunny = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.bunny_foot1("synched",0);
	this.instance.setTransform(-770.75,55.5,1.1418,1.7522,0,78.905,80.7907,11.3,3);

	this.instance_1 = new lib.bunny_nose("synched",0);
	this.instance_1.setTransform(-665.05,32.05,1.1344,1.1436,0,-12.0392,-4.7307,12,7.9);

	this.instance_2 = new lib.bunny_eye2("synched",0);
	this.instance_2.setTransform(-664.1,15.9,1.1344,1.1436,0,-12.0392,-4.7307,4,4.8);

	this.instance_3 = new lib.bunny_eye1("synched",0);
	this.instance_3.setTransform(-678.65,17.95,1.1344,1.1436,0,-12.0392,-4.7307,4,4.7);

	this.instance_4 = new lib.bunny_ear2("synched",0);
	this.instance_4.setTransform(-703.6,-19,1.4991,0.9697,0,76.018,-143.8953,1.9,49.3);

	this.instance_5 = new lib.bunny_ear1("synched",0);
	this.instance_5.setTransform(-709.95,-31.7,1.1344,1.1436,0,-57.8902,-50.5834,67.8,80.4);

	this.instance_6 = new lib.bunny_foot1("synched",0);
	this.instance_6.setTransform(-701.25,69.65,1.1417,1.5735,0,43.6024,45.4895,10.2,15);

	this.instance_7 = new lib.bunny_foot2("synched",0);
	this.instance_7.setTransform(-689.15,69.65,1.1417,1.4292,0,49.847,51.7363,11.3,14.6);

	this.instance_8 = new lib.bunny_body("synched",0);
	this.instance_8.setTransform(-724.7,24.8,1.3512,0.9877,0,22.1423,6.3218,61.6,61.3);

	this.instance_9 = new lib.bunny_tail("synched",0);
	this.instance_9.setTransform(-804.1,43.35,1.1343,1.1821,0,-20.3199,-3.9764,19.9,7.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9,p:{skewX:-20.3199,skewY:-3.9764,x:-804.1,y:43.35,regX:19.9,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,scaleX:1.3512,skewX:22.1423,skewY:6.3218,x:-724.7,y:24.8,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:49.847,skewY:51.7363,x:-689.15,y:69.65,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:43.6024,skewY:45.4895,x:-701.25,y:69.65,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1344,skewX:-57.8902,skewY:-50.5834,x:-709.95,y:-31.7,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:76.018,skewY:-143.8953,x:-703.6,y:-19,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:-12.0392,skewY:-4.7307,x:-678.65,y:17.95,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-12.0392,skewY:-4.7307,x:-664.1,y:15.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0392,skewY:-4.7307,x:-665.05,y:32.05,regX:12,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1418,skewX:78.905,skewY:80.7907,x:-770.75,y:55.5,scaleY:1.7522,regX:11.3}}]},33).to({state:[{t:this.instance_9,p:{skewX:-20.843,skewY:-4.4987,x:-682.65,y:40.6,regX:19.9,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:21.616,skewY:5.7979,x:-603.4,y:21.45,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.3,scaleY:1.4291,skewX:-40.7656,skewY:-38.8753,x:-546.95,y:48.15,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-56.1785,skewY:-54.2911,x:-561.65,y:54.65,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-65.1621,skewY:-57.853,x:-589.35,y:-35.2,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.499,skewX:62.0297,skewY:-157.8856,x:-582.75,y:-22.6,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-12.5639,skewY:-5.2544,x:-557.45,y:14.05,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.6,skewX:-12.5639,skewY:-5.2544,x:-543.15,y:11.85,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.5639,skewY:-5.2544,x:-543.85,y:28,regX:12,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:78.3799,skewY:80.2666,x:-654.1,y:57.55,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:-585.65,y:44.65,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:-504.6,y:34.15,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:-451.55,y:66.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:-466.7,y:71.8,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:-484.45,y:-20.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:-479.55,y:-7.25,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:-458.3,y:31.9,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-6.3426,skewY:0.965,x:-443.8,y:31.35,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:-446.1,y:47.2,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:-559,y:64.65,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:-530.2,y:55.65,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:-449.8,y:70.35,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.3,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:-413,y:99.85,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:-428.2,y:97.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:-413.8,y:24.3,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:-413.15,y:38.65,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:-404.95,y:82.4,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.6,skewX:11.4039,skewY:18.7118,x:-390.8,y:86.3,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:-398.05,y:100.6,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:-520.05,y:69.3,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:-493.35,y:48.9,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:-400.85,y:134.7,regY:91.5,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:-410.45,y:98.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:-425.65,y:96.15,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:-381.05,y:25.25,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:-372.15,y:48.9,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:-405.45,y:94.9,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:18.6327,skewY:25.9412,x:-392,y:100.65,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:-401,y:113.45,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:-492.9,y:65.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:-485.2,y:47.15,regX:19.7,regY:7.5,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:-401.65,y:136.8,regY:91.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:-409.1,y:98.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:-423.95,y:95.6,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:-377.15,y:26.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:-369.1,y:50,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:20.5832,skewY:27.8909,x:-404.05,y:95.05,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:-390.9,y:101.15,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:-400.25,y:113.6,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:-489.05,y:64.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:-503.85,y:64.2,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:-401.65,y:135.05,regY:91.5,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:-416.45,y:98.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-18.56,skewY:-16.6725,x:-431.7,y:99,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:-398.75,y:22,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:-386.25,y:44.05,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:-412.3,y:89.85,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:-397.8,y:92.55,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:-405.7,y:105.8,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:-498.7,y:78.45,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:-521.85,y:96.9,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:60,scaleX:1.1647,skewX:0,skewY:0,x:-460.3,y:133.85,regY:111.3,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:-427.95,y:102.55,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:-438.6,y:100.75,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:-429.1,y:33.15,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:-416.35,y:39.55,regY:49.2,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:-426.85,y:88.25,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:-412.05,y:86.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:-415.95,y:102.25,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:-517.7,y:104.45,scaleY:1.6381,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:-510.7,y:115.35,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1343,skewX:0,skewY:0,x:-456.35,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:-415.15,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:-427.1,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:-437.95,y:29.6,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:-429.45,y:31.05,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:-427.75,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:-412.95,y:79.35,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:-417.25,y:95.35,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:-510.7,y:115.35,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1343,skewX:0,skewY:0,x:-456.35,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:-415.15,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:-427.1,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:-437.95,y:29.6,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:-429.45,y:31.05,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:-427.75,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:-412.95,y:79.35,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:-417.25,y:95.35,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},20).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:-510.7,y:115.35,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1343,skewX:0,skewY:0,x:-456.35,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:-415.15,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:-427.1,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:-437.95,y:29.6,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:-429.45,y:31.05,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:5,skewX:0,skewY:0,x:-427.75,y:80.3,regX:4,scaleX:1.1343,scaleY:0.1299,rotation:-4.9715}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:0,skewY:0,x:-412.95,y:79.35,scaleX:1.1343,scaleY:0.13}},{t:this.instance_1,p:{skewX:0,skewY:0,x:-417.25,y:95.35,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},27).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:-510.7,y:115.35,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1343,skewX:0,skewY:0,x:-456.35,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:-415.15,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:-427.1,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:-437.95,y:29.6,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:-429.45,y:31.05,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:-427.75,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:-412.95,y:79.35,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:-417.25,y:95.35,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:-513.45,y:115.35,regX:19.8,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1343,skewX:-7.3082,skewY:0,x:-456.35,y:136.45,regY:111.2,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:-417,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:-428.9,y:122.65,scaleY:1.1436,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:-451.75,y:29.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:-443.1,y:31,regY:49.1,regX:1.7,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:-434.95,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.2,regY:4.8,skewX:-7.3082,skewY:0,x:-420.2,y:79.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:-422.65,y:95.35,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},12).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:-512.1,y:115.35,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,scaleX:1.1957,skewX:11.1242,skewY:0,x:-446.4,y:81.6,regY:61.4,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:-417,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:-428.9,y:122.65,scaleY:1.1436,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:-442.65,y:23.75,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:-429.4,y:31,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:-417.05,y:74.95,regX:3.9,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:-403.2,y:70.15,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:-400.9,y:86,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:-449.9,y:107.1,regX:19.9,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:-381,y:63.35,regY:61.4,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:-332.75,y:93.7,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:-344.05,y:97.85,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:-386,y:5.1,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:-375.8,y:15,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:-339.85,y:41.55,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-31.5014,skewY:-24.1944,x:-327,y:34.7,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:-322.5,y:50.2,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:-414.45,y:107.6,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:-369.85,y:70,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.6,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:-297.3,y:32.9,regY:61.3,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.3,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:-236,y:45.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:-248.85,y:55.5,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:-296.7,y:-25.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:-287.35,y:-14.7,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:-254.1,y:15,regX:4.2,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:-240.7,y:9.55,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:-237.7,y:25.35,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:-338.05,y:79.9,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:-304.3,y:44.65,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:-223.25,y:34.15,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:-170.25,y:66.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:-185.4,y:71.8,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:-203.15,y:-20.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:-198.2,y:-7.25,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:-177,y:31.9,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-6.3426,skewY:0.965,x:-162.35,y:31.4,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:-164.85,y:47.2,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:-277.7,y:64.65,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:-249,y:55.6,regX:19.7,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:-168.4,y:70.4,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.3,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:-131.55,y:99.85,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:-146.9,y:97.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:-132.5,y:24.3,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:-131.9,y:38.65,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:-123.7,y:82.4,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.6,skewX:11.4039,skewY:18.7118,x:-109.45,y:86.3,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:-116.65,y:100.65,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:-238.75,y:69.3,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:-212.05,y:48.9,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:-119.5,y:134.7,regY:91.5,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:-129.1,y:98.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:-144.35,y:96.15,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:-99.7,y:25.25,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:-90.8,y:48.9,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:-124.15,y:94.9,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:18.6327,skewY:25.9412,x:-110.7,y:100.55,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:-119.7,y:113.45,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:-211.55,y:65.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:-203.9,y:47.15,regX:19.7,regY:7.5,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:-120.3,y:136.8,regY:91.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:-127.9,y:98.2,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:-142.65,y:95.6,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:-95.8,y:26.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:-87.85,y:50.05,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:20.5832,skewY:27.8909,x:-122.7,y:95.05,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:-109.55,y:101.15,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:-118.85,y:113.65,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:-207.7,y:64.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:-222.6,y:64.25,regX:19.6,regY:7.8,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:-120.35,y:135.05,regY:91.5,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:-135.15,y:98.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-18.56,skewY:-16.6725,x:-150.4,y:99,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:-117.45,y:22,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:-104.95,y:44.05,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:-130.95,y:89.85,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:-116.5,y:92.55,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:-124.4,y:105.8,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:-217.35,y:78.45,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:-240.5,y:96.9,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1647,skewX:0,skewY:0,x:-179.05,y:133.85,regY:111.3,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:-146.65,y:102.55,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:-157.25,y:100.75,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:-147.8,y:33.15,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:-135,y:39.55,regY:49.2,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:-145.55,y:88.25,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:-130.85,y:86.4,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:-134.6,y:102.25,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:-236.4,y:104.45,scaleY:1.6381,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:-229.35,y:115.35,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1343,skewX:0,skewY:0,x:-175.05,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.4,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:-133.7,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:-145.75,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:-156.6,y:29.6,regX:68,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:-148.1,y:31.05,regY:49.2,regX:1.9,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:-146.45,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:-131.65,y:79.35,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:-135.9,y:95.35,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:-233.2,y:115.35,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1343,skewX:-7.3082,skewY:0,x:-176.05,y:136.45,regY:111.2,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:-136.85,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:-148.7,y:122.65,scaleY:1.1436,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:-171.55,y:29.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:-162.9,y:30.9,regY:49,regX:1.7,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:-154.8,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.2,regY:4.8,skewX:-7.3082,skewY:0,x:-140.05,y:79.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:-142.5,y:95.35,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},18).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:-231.95,y:115.35,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,scaleX:1.1957,skewX:11.1242,skewY:0,x:-166.25,y:81.6,regY:61.4,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:-136.85,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:-148.7,y:122.65,scaleY:1.1436,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:-162.4,y:23.75,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:-149.15,y:31,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:-136.8,y:74.9,regX:4,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:-123,y:70.15,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:-120.75,y:86,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:-169.75,y:107.15,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:-100.85,y:63.35,regY:61.4,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.4,regY:14.5,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:-52.4,y:93.65,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:-63.9,y:97.85,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.6,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:-105.75,y:5.15,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:-95.6,y:15,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:-59.7,y:41.55,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:-46.8,y:34.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:-42.3,y:50.2,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:-134.3,y:107.6,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:-89.65,y:70,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:-17,y:32.9,regY:61.3,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.3,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:44.15,y:45.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3,skewX:-69.6605,skewY:-67.7731,x:31.25,y:55.55,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:-16.45,y:-25.35,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:-7.2,y:-14.7,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:25.95,y:15.1,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:39.45,y:9.6,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:42.4,y:25.4,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:-57.9,y:79.9,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:-24.15,y:44.65,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:56.95,y:34.15,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:109.95,y:66.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3,skewX:-49.9574,skewY:-48.0683,x:94.7,y:71.7,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:77.05,y:-20.7,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:81.95,y:-7.25,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:103.2,y:31.9,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-6.3426,skewY:0.965,x:117.75,y:31.35,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:115.4,y:47.2,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:2.55,y:64.65,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:31.3,y:55.65,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:111.7,y:70.45,regY:61.4,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.3,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:148.5,y:99.85,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:133.3,y:97.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:147.7,y:24.3,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:148.35,y:38.65,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:156.45,y:82.4,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.6,skewX:11.4039,skewY:18.7118,x:170.7,y:86.3,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:163.45,y:100.6,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:41.5,y:69.3,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:68.25,y:48.8,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:160.7,y:134.7,regY:91.5,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:151,y:98.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:135.85,y:96.15,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:180.55,y:25.3,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:189.35,y:48.9,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:156,y:94.9,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:18.6327,skewY:25.9412,x:169.5,y:100.65,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:160.55,y:113.5,regX:12.2,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:68.65,y:65.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:76.25,y:47.25,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:159.85,y:136.8,regY:91.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:152.4,y:98.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:137.5,y:95.6,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:184.4,y:26.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:192.4,y:50,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:20.5832,skewY:27.8909,x:157.4,y:95,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:170.6,y:101.15,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:161.3,y:113.6,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:72.45,y:64.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:57.55,y:64.25,regX:19.6,regY:7.8,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:159.8,y:135.05,regY:91.5,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:145.05,y:98.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:129.75,y:99,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:162.75,y:22,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:175.1,y:44.05,regY:49.6,regX:1.9,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:149.15,y:89.85,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:163.65,y:92.55,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:155.8,y:105.8,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:62.85,y:78.45,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:39.65,y:96.9,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1647,skewX:0,skewY:0,x:101.15,y:133.85,regY:111.3,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.3,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:133.7,y:102.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:122.9,y:100.75,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:132.4,y:33.15,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:145.15,y:39.55,regY:49.2,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:134.65,y:88.25,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.1,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:149.45,y:86.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:145.6,y:102.25,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:43.8,y:104.45,scaleY:1.6381,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:50.85,y:115.35,regX:19.9,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1343,skewX:0,skewY:0,x:105.15,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:146.4,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:134.4,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:123.45,y:29.6,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:132,y:31.05,regY:49.2,regX:1.8,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:133.75,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:148.55,y:79.35,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:144.3,y:95.35,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:45.8,y:115.35,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1343,skewX:-7.3082,skewY:0,x:102.95,y:136.45,regY:111.2,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:142.2,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:130.45,y:122.65,scaleY:1.1436,regX:10.3}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:107.45,y:29.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:116.25,y:30.95,regY:49.1,regX:1.8,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:124.3,y:80.3,regX:4.1,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-7.3082,skewY:0,x:138.85,y:79.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:136.55,y:95.35,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},20).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:47.25,y:115.35,regX:19.9,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,scaleX:1.1957,skewX:11.1242,skewY:0,x:112.8,y:81.6,regY:61.4,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:142.2,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:130.45,y:122.65,scaleY:1.1436,regX:10.3}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:116.6,y:23.75,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:129.85,y:31,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:142.2,y:74.95,regX:3.9,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:156.15,y:70.1,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:158.25,y:86,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:109.3,y:107.15,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:178.25,y:63.35,regY:61.4,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:226.5,y:93.7,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:215.2,y:97.85,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:173.25,y:5.1,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:183.4,y:15,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:219.35,y:41.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:232.25,y:34.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:236.8,y:50.2,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:144.75,y:107.6,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:189.5,y:70.1,regX:19.9,regY:7.8,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:262.05,y:32.9,regY:61.3,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:323.15,y:45.7,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:310.4,y:55.5,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:262.55,y:-25.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:271.8,y:-14.7,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:305,y:15.1,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:318.55,y:9.55,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:321.45,y:25.4,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:221.1,y:79.8,scaleY:1.7522,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:254.9,y:44.65,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:335.9,y:34.1,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:389.05,y:66.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:373.85,y:71.8,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:356.05,y:-20.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:361,y:-7.25,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:382.25,y:31.9,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-6.3426,skewY:0.965,x:396.75,y:31.35,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:394.55,y:47.2,regX:12.2,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:281.6,y:64.65,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:310.4,y:55.65,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:390.85,y:70.4,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.3,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:427.65,y:99.85,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:412.4,y:97.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:426.75,y:24.3,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:427.4,y:38.6,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:435.65,y:82.4,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:449.75,y:86.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:442.5,y:100.6,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:320.5,y:69.3,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:347.3,y:48.8,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:439.8,y:134.6,regY:91.4,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:430.1,y:98.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:414.85,y:96.15,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:459.5,y:25.25,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:468.5,y:48.9,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:435.1,y:94.9,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:18.6327,skewY:25.9412,x:448.55,y:100.65,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:439.55,y:113.45,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:347.7,y:65.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:355.3,y:47.25,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:438.85,y:136.8,regY:91.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:431.45,y:98.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:416.55,y:95.6,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:463.45,y:26.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:471.35,y:50.05,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:20.5832,skewY:27.8909,x:436.45,y:95.15,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:449.7,y:101.15,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:440.35,y:113.6,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:351.55,y:64.05,scaleY:1.7523,regX:11.4}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:336.65,y:64.2,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:438.9,y:135.05,regY:91.5,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:424.1,y:98.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:408.8,y:99,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:441.8,y:22,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:454.3,y:44.05,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:428.2,y:89.85,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:442.75,y:92.55,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:434.8,y:105.8,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:341.9,y:78.45,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:318.6,y:96.9,regX:19.6,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1647,skewX:0,skewY:0,x:380.25,y:133.85,regY:111.3,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.3,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:412.75,y:102.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:401.95,y:100.75,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:411.45,y:33.15,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:424.1,y:39.5,regY:49.1,regX:2,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:413.8,y:88.25,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:428.4,y:86.4,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:424.7,y:102.25,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:322.85,y:104.45,scaleY:1.6381,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:329.85,y:115.35,regX:19.8,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1343,skewX:0,skewY:0,x:384.25,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:425.45,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:413.5,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:402.55,y:29.6,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:411.1,y:31.05,regY:49.2,regX:1.8,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:412.8,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:427.55,y:79.35,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:423.25,y:95.35,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:324.95,y:115.35,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1343,skewX:-7.3082,skewY:0,x:382,y:136.45,regY:111.2,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:421.25,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:409.4,y:122.65,scaleY:1.1436,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:386.65,y:29.55,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:395.2,y:30.9,regY:49,regX:1.7,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:403.35,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.2,regY:4.8,skewX:-7.3082,skewY:0,x:418.1,y:79.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:415.75,y:95.35,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},2).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:326.2,y:115.35,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,scaleX:1.1957,skewX:11.1242,skewY:0,x:391.9,y:81.6,regY:61.4,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:421.25,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:409.4,y:122.65,scaleY:1.1436,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:395.7,y:23.75,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:408.95,y:31,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:421.3,y:74.9,regX:4,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:435.15,y:70.1,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:437.35,y:86,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:388.45,y:107.1,regX:19.9,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:457.3,y:63.35,regY:61.4,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:505.55,y:93.7,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.3,regY:15,skewX:24.1382,skewY:26.0267,x:494.3,y:97.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:452.25,y:5.1,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:462.5,y:15,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:498.35,y:41.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:511.3,y:34.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:515.8,y:50.2,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:423.85,y:107.6,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:468.55,y:70.1,regX:19.9,regY:7.8,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:541.15,y:32.9,regY:61.3,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.3,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:602.3,y:45.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:589.45,y:55.5,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:541.7,y:-25.45,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:550.9,y:-14.7,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:584.1,y:15.1,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:597.5,y:9.6,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:600.5,y:25.4,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:500.15,y:79.8,scaleY:1.7522,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:533.95,y:44.65,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:614.95,y:34.1,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:668.1,y:66.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:652.9,y:71.8,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:635.15,y:-20.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:640.1,y:-7.25,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:661.3,y:31.9,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-6.3426,skewY:0.965,x:675.95,y:31.4,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:673.5,y:47.2,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:560.7,y:64.65,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:589.3,y:55.6,regX:19.7,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:669.9,y:70.4,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.3,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:706.8,y:99.9,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:691.45,y:97.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:705.75,y:24.3,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:706.35,y:38.65,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:714.6,y:82.4,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:728.75,y:86.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:721.55,y:100.6,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:599.55,y:69.3,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:626.35,y:48.8,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:718.8,y:134.7,regY:91.5,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:709.15,y:98.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-9.5427,skewY:-7.657,x:694,y:96.15,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:738.6,y:25.25,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:747.5,y:48.9,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.6,skewX:18.6327,skewY:25.9412,x:714.1,y:94.8,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:18.6327,skewY:25.9412,x:727.55,y:100.55,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:718.6,y:113.45,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:626.75,y:65.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:634.35,y:47.25,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:717.95,y:136.8,regY:91.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:710.5,y:98.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:695.6,y:95.6,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:742.55,y:26.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:750.4,y:50.05,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:20.5832,skewY:27.8909,x:715.5,y:95.15,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:728.75,y:101.15,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:719.45,y:113.6,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:630.55,y:64.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:615.65,y:64.25,regX:19.6,regY:7.8,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:717.9,y:135.05,regY:91.5,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:703.2,y:98.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:687.9,y:99,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:720.8,y:22,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:733.3,y:44.05,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:707.35,y:89.85,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:721.75,y:92.55,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:713.85,y:105.8,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:620.95,y:78.45,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:597.7,y:96.9,regX:19.6,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1647,skewX:0,skewY:0,x:659.2,y:133.8,regY:111.3,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.3,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:691.75,y:102.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:681,y:100.75,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:690.5,y:33.15,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:703.2,y:39.45,regY:49.1,regX:2.1,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:692.75,y:88.25,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:707.45,y:86.4,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:703.75,y:102.25,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:601.9,y:104.45,scaleY:1.6381,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:608.9,y:115.35,regX:19.8,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1343,skewX:0,skewY:0,x:663.35,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:704.5,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:692.5,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:681.6,y:29.6,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:690.05,y:31.05,regY:49.2,regX:1.7,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:691.85,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:706.6,y:79.35,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:702.3,y:95.35,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:603.4,y:115.35,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1343,skewX:-7.3082,skewY:0,x:660.55,y:136.45,regY:111.2,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:699.8,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:688.05,y:122.65,scaleY:1.1436,regX:10.3}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:665.05,y:29.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:673.85,y:30.95,regY:49.1,regX:1.8,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:681.9,y:80.3,regX:4.1,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-7.3082,skewY:0,x:696.45,y:79.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:694.15,y:95.35,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},33).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:604.85,y:115.35,regX:19.9,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,scaleX:1.1957,skewX:11.1242,skewY:0,x:670.4,y:81.6,regY:61.4,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:699.8,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:688.05,y:122.65,scaleY:1.1436,regX:10.3}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:674.2,y:23.75,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:687.45,y:31,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:699.8,y:74.95,regX:3.9,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:713.75,y:70.1,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:715.85,y:86,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:666.9,y:107.15,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:735.85,y:63.35,regY:61.4,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:784.1,y:93.7,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.2,regY:15,skewX:24.1382,skewY:26.0267,x:772.8,y:97.85,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:730.85,y:5.1,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:741,y:15,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:776.95,y:41.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:789.85,y:34.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:794.4,y:50.2,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:702.35,y:107.6,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:747.1,y:70.1,regX:19.9,regY:7.8,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:819.65,y:32.9,regY:61.3,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.2,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:880.75,y:45.7,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:868,y:55.5,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:820.15,y:-25.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:829.4,y:-14.7,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:862.6,y:15.1,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:876.15,y:9.55,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:879.05,y:25.4,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:778.7,y:79.8,scaleY:1.7522,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:812.5,y:44.65,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:893.5,y:34.1,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:946.65,y:66.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:931.45,y:71.8,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:913.65,y:-20.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:918.6,y:-7.25,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:939.85,y:31.9,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.8,skewX:-6.3426,skewY:0.965,x:954.35,y:31.35,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:952.15,y:47.2,regX:12.2,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:839.2,y:64.65,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:868,y:55.65,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:948.45,y:70.4,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.3,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:985.25,y:99.85,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:970,y:97.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:984.35,y:24.3,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:985,y:38.6,regY:49.2,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:993.25,y:82.4,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:1007.35,y:86.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:1000.1,y:100.6,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:878.1,y:69.3,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:6.8414,skewY:23.188,x:904.9,y:48.8,regX:19.8,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0865,skewX:49.3082,skewY:41.9135,x:997.4,y:134.6,regY:91.4,scaleY:1.0967,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.2,scaleY:1.4291,skewX:5.8659,skewY:7.7576,x:987.7,y:98.4,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-9.5427,skewY:-7.657,x:972.45,y:96.15,scaleY:1.5735,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:41.8371,skewY:-145.4698,x:1017.1,y:25.25,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-30.8368,skewY:7.1607,x:1026.1,y:48.9,regY:49.1,regX:2.1,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:18.6327,skewY:25.9412,x:992.7,y:94.9,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:18.6327,skewY:25.9412,x:1006.15,y:100.65,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:18.6327,skewY:25.9412,x:997.15,y:113.45,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-16.4859,skewY:-14.5964,x:905.3,y:65.1,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:21.5435,skewY:37.8892,x:912.9,y:47.25,regX:19.7,regY:7.6,scaleY:1.182,scaleX:1.1343}},{t:this.instance_8,p:{regX:122,scaleX:1.0455,skewX:51.2579,skewY:43.8629,x:996.45,y:136.8,regY:91.5,scaleY:1.1459,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.1,scaleY:1.4292,skewX:7.8177,skewY:9.7093,x:989.05,y:98.1,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-7.5929,skewY:-5.7049,x:974.15,y:95.6,scaleY:1.5736,scaleX:1.1418}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:52.0122,skewY:-135.2938,x:1021.05,y:26.4,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-17.6369,skewY:20.3591,x:1028.95,y:50.05,regY:49.2,regX:2,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.7,skewX:20.5832,skewY:27.8909,x:994.05,y:95.15,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:20.5832,skewY:27.8909,x:1007.3,y:101.15,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:20.5832,skewY:27.8909,x:997.95,y:113.6,regX:12,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-7.3184,skewY:-5.4328,x:909.15,y:64.05,scaleY:1.7523,regX:11.4}}]},2).to({state:[{t:this.instance_9,p:{skewX:2.6057,skewY:18.9519,x:894.25,y:64.2,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:121.9,scaleX:1.1008,skewX:40.2896,skewY:32.8975,x:996.5,y:135.05,regY:91.5,scaleY:1.0953,rotation:0}},{t:this.instance_7,p:{regX:7.1,regY:2.1,scaleY:1.4291,skewX:-3.1497,skewY:-1.2575,x:981.7,y:98.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.1,regY:3.1,skewX:-18.56,skewY:-16.6725,x:966.4,y:99,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:26.0905,skewY:-161.2177,x:999.4,y:22,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4591,skewX:-16.7091,skewY:-0.0869,x:1011.9,y:44.05,regY:49.6,regX:2,scaleY:0.7976}},{t:this.instance_3,p:{regY:4.5,skewX:6.179,skewY:13.4874,x:985.8,y:89.85,regX:3.9,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:6.179,skewY:13.4874,x:1000.35,y:92.55,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:6.179,skewY:13.4874,x:992.4,y:105.8,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:2.9,scaleX:1.1417,skewX:-10.3341,skewY:-8.4496,x:899.5,y:78.45,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-15.5821,skewY:0.7615,x:876.2,y:96.9,regX:19.6,regY:7.7,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1647,skewX:0,skewY:0,x:937.85,y:133.85,regY:111.3,scaleY:1.114,rotation:6.2368}},{t:this.instance_7,p:{regX:7.2,regY:2.3,scaleY:1.4291,skewX:-21.3388,skewY:-19.4457,x:970.35,y:102.6,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-26.7599,skewY:-24.8696,x:959.55,y:100.75,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.4,scaleX:1.1343,skewX:24.0401,skewY:31.3466,x:969.05,y:33.15,regX:67.7,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.217,skewX:-17.2733,skewY:-15.3668,x:981.7,y:39.5,regY:49.1,regX:2,scaleY:0.9856}},{t:this.instance_3,p:{regY:4.5,skewX:-12.0106,skewY:-4.7023,x:971.4,y:88.25,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.7,skewX:-12.0106,skewY:-4.7023,x:986,y:86.4,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-12.0106,skewY:-4.7023,x:982.3,y:102.25,regX:12.2,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3,scaleX:1.1417,skewX:-47.2442,skewY:-45.3579,x:880.45,y:104.45,scaleY:1.6381,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:0,skewY:0,x:887.45,y:115.35,regX:19.8,regY:7.7,scaleY:1.1343,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.8,scaleX:1.1343,skewX:0,skewY:0,x:941.85,y:136.45,regY:111.2,scaleY:1.1343,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1343,skewX:0,skewY:0,x:983.05,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:0,skewY:0,x:971.1,y:122.65,scaleY:1.1343,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:0,skewY:0,x:960.15,y:29.6,regX:67.9,scaleY:1.1343}},{t:this.instance_4,p:{scaleX:1.1343,skewX:0,skewY:0,x:968.7,y:31.05,regY:49.2,regX:1.8,scaleY:1.1343}},{t:this.instance_3,p:{regY:4.8,skewX:0,skewY:0,x:970.4,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1343,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:0,skewY:0,x:985.15,y:79.35,scaleX:1.1343,scaleY:1.1343}},{t:this.instance_1,p:{skewX:0,skewY:0,x:980.85,y:95.35,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1343}}]},2).to({state:[{t:this.instance_9,p:{skewX:-7.3082,skewY:0,x:882.55,y:115.35,regX:19.9,regY:7.7,scaleY:1.1436,scaleX:1.1343}},{t:this.instance_8,p:{regX:59.9,scaleX:1.1343,skewX:-7.3082,skewY:0,x:939.6,y:136.45,regY:111.2,scaleY:1.1436,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:978.85,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:967,y:122.65,scaleY:1.1436,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-16.771,skewY:-9.4613,x:944.25,y:29.55,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.1252,skewX:-15.5308,skewY:-15.9047,x:952.8,y:30.9,regY:49,regX:1.7,scaleY:1.1436}},{t:this.instance_3,p:{regY:4.8,skewX:-7.3082,skewY:0,x:960.95,y:80.3,regX:4,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4.2,regY:4.8,skewX:-7.3082,skewY:0,x:975.7,y:79.35,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-7.3082,skewY:0,x:973.35,y:95.35,regX:12.1,regY:7.8,scaleX:1.1343,scaleY:1.1436}}]},2).to({state:[{t:this.instance_9,p:{skewX:-16.3408,skewY:0,x:883.8,y:115.35,regX:19.7,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.6,scaleX:1.1957,skewX:11.1242,skewY:0,x:949.5,y:81.6,regY:61.4,scaleY:1.0752,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.7,scaleY:1.1436,skewX:-7.3082,skewY:0,x:978.85,y:121.4,scaleX:1.1343}},{t:this.instance,p:{regY:15.1,scaleX:1.1343,skewX:-7.3082,skewY:0,x:967,y:122.65,scaleY:1.1436,regX:10.2}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9352,skewY:-38.629,x:953.3,y:23.75,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.158,skewX:-48.1064,skewY:-54.9052,x:966.55,y:31,regY:49.1,regX:1.8,scaleY:1.119}},{t:this.instance_3,p:{regY:4.8,skewX:-23.0553,skewY:-15.7445,x:978.9,y:74.9,regX:4,scaleX:1.1343,scaleY:1.1437,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-23.0553,skewY:-15.7445,x:992.75,y:70.1,scaleX:1.1343,scaleY:1.1437}},{t:this.instance_1,p:{skewX:-23.0553,skewY:-15.7445,x:994.95,y:86,regX:12,regY:7.8,scaleX:1.1343,scaleY:1.1437}}]},2).to({state:[{t:this.instance_9,p:{skewX:-39.7821,skewY:-23.4393,x:941.55,y:107.1,regX:19.9,regY:7.6,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.8,scaleX:1.3513,skewX:2.6793,skewY:-13.14,x:1014.9,y:63.35,regY:61.4,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:11.3,regY:14.6,scaleY:1.4292,skewX:30.3853,skewY:32.2733,x:1063.15,y:93.7,scaleX:1.1417}},{t:this.instance_6,p:{regX:10.3,regY:15,skewX:24.1382,skewY:26.0267,x:1051.9,y:97.9,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-77.3545,skewY:-70.044,x:1009.85,y:5.1,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:56.551,skewY:-163.3585,x:1020.1,y:15,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.9,skewX:-31.5014,skewY:-24.1944,x:1055.95,y:41.6,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-31.5014,skewY:-24.1944,x:1068.9,y:34.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-31.5014,skewY:-24.1944,x:1073.4,y:50.2,regX:12.1,regY:7.9,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:59.4426,skewY:61.3292,x:981.45,y:107.6,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:-34.3252,skewY:-17.9814,x:1026.15,y:70.1,regX:19.9,regY:7.8,scaleY:1.1821,scaleX:1.1344}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:8.1349,skewY:-7.6852,x:1098.75,y:32.9,regY:61.3,scaleY:0.9878,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.3,scaleY:1.4291,skewX:-54.246,skewY:-52.3582,x:1159.9,y:45.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.2,regY:3.1,skewX:-69.6605,skewY:-67.7731,x:1147.05,y:55.5,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-78.6419,skewY:-71.3355,x:1099.3,y:-25.45,regX:67.8,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:48.5468,skewY:-171.3665,x:1108.5,y:-14.7,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-26.0478,skewY:-18.7372,x:1141.7,y:15.1,regX:4,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:3.9,regY:4.7,skewX:-26.0478,skewY:-18.7372,x:1155.1,y:9.6,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-26.0478,skewY:-18.7372,x:1158.1,y:25.4,regX:12,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:64.8989,skewY:66.7873,x:1057.75,y:79.8,scaleY:1.7522,regX:11.2}}]},2).to({state:[{t:this.instance_9,p:{skewX:-14.6221,skewY:1.7206,x:1091.55,y:44.65,regX:19.8,regY:7.7,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.7,scaleX:1.3513,skewX:27.8386,skewY:12.0185,x:1172.55,y:34.1,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7,regY:2.1,scaleY:1.4291,skewX:-34.5461,skewY:-32.6536,x:1225.7,y:66.75,scaleX:1.1417}},{t:this.instance_6,p:{regX:11.3,regY:3.1,skewX:-49.9574,skewY:-48.0683,x:1210.5,y:71.8,scaleY:1.5736,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-63.6893,skewY:-56.3813,x:1192.75,y:-20.6,regX:67.9,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:61.546,skewY:-158.3652,x:1197.7,y:-7.25,regY:49.3,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:-6.3426,skewY:0.965,x:1218.9,y:31.9,regX:3.9,scaleX:1.1344,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.8,skewX:-6.3426,skewY:0.965,x:1233.55,y:31.4,scaleX:1.1344,scaleY:1.1436}},{t:this.instance_1,p:{skewX:-6.3426,skewY:0.965,x:1231.1,y:47.2,regX:12.1,regY:7.8,scaleX:1.1344,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1418,skewX:84.6014,skewY:86.4862,x:1118.3,y:64.65,scaleY:1.7522,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:1146.9,y:55.6,regX:19.7,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:1227.5,y:70.4,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.3,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:1264.4,y:99.9,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:1249.05,y:97.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:1263.35,y:24.3,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:1263.95,y:38.65,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:1272.2,y:82.4,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:1286.35,y:86.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:1279.15,y:100.6,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:1157.15,y:69.3,scaleY:1.7523,regX:11.3}}]},2).to({state:[{t:this.instance_9,p:{skewX:3.1242,skewY:19.467,x:1146.9,y:55.6,regX:19.7,regY:7.6,scaleY:1.1821,scaleX:1.1343}},{t:this.instance_8,p:{regX:61.9,scaleX:1.3513,skewX:45.5871,skewY:29.7652,x:1227.5,y:70.4,regY:61.3,scaleY:0.9877,rotation:0}},{t:this.instance_7,p:{regX:7.2,regY:2.3,scaleY:1.4291,skewX:2.1484,skewY:4.0395,x:1264.4,y:99.9,scaleX:1.1418}},{t:this.instance_6,p:{regX:11.2,regY:3,skewX:-13.2633,skewY:-11.3736,x:1249.05,y:97.2,scaleY:1.5735,scaleX:1.1417}},{t:this.instance_5,p:{regY:80.5,scaleX:1.1343,skewX:-45.9417,skewY:-38.6347,x:1263.35,y:24.3,regX:68,scaleY:1.1436}},{t:this.instance_4,p:{scaleX:1.4991,skewX:79.2927,skewY:-140.6179,x:1263.95,y:38.65,regY:49.4,regX:1.9,scaleY:0.9697}},{t:this.instance_3,p:{regY:4.8,skewX:11.4039,skewY:18.7118,x:1272.2,y:82.4,regX:3.8,scaleX:1.1343,scaleY:1.1436,rotation:0}},{t:this.instance_2,p:{regX:4,regY:4.6,skewX:11.4039,skewY:18.7118,x:1286.35,y:86.25,scaleX:1.1343,scaleY:1.1436}},{t:this.instance_1,p:{skewX:11.4039,skewY:18.7118,x:1279.15,y:100.6,regX:12.1,regY:7.7,scaleX:1.1343,scaleY:1.1436}},{t:this.instance,p:{regY:3.1,scaleX:1.1417,skewX:-31.6945,skewY:-29.8106,x:1157.15,y:69.3,scaleY:1.7523,regX:11.3}}]},1).to({state:[]},1).wait(27));

	// Layer_2
	this.instance_10 = new lib.shadow("synched",0);
	this.instance_10.setTransform(-742.95,131.9,1.1343,1.1343,0,0,0,61.1,9.5);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(33).to({_off:false},0).wait(2).to({x:-606.8},0).wait(2).to({x:-516.05},0).wait(2).to({x:-461.6},0).wait(30).to({startPosition:0},0).wait(45).to({regX:61,x:-402.7},0).wait(2).to({x:-310.8},0).wait(2).to({x:-233.7},0).wait(2).to({regX:60.9,x:-174.75},0).wait(32).to({regX:61,x:-121.4},0).wait(2).to({regX:61.1,x:-27.2},0).wait(2).to({regX:61,x:40.8},0).wait(2).to({regX:60.9,x:102},0).wait(34).to({regX:61,x:159.95},0).wait(2).to({x:240.45},0).wait(2).to({x:324.4},0).wait(2).to({x:382.25},0).wait(16).to({x:436.7},0).wait(2).to({x:538.8},0).wait(2).to({regX:61.1,x:597.85},0).wait(2).to({regX:61,x:655.05},0).wait(47).to({x:717.55},0).wait(2).to({x:798.05},0).wait(2).to({x:882},0).wait(2).to({x:939.85},0).wait(16).to({x:994.3},0).wait(2).to({x:1096.4},0).wait(2).to({regX:61.1,x:1155.45},0).wait(2).to({regX:61,x:1223.45},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(27));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-836.7,-90.7,2177.7,242.60000000000002);


(lib.NinjaGirlwalk = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// head
	this.head = new lib.headGirl();
	this.head.name = "head";
	this.head.setTransform(83.95,-86.5,1,1,0,0,0,56,56);

	this.timeline.addTween(cjs.Tween.get(this.head).wait(1).to({regX:-9.3,regY:-5,x:17.85,y:-148.35},0).wait(1).to({x:17.3,y:-149.05},0).wait(1).to({x:16.95,y:-149.45},0).wait(1).to({regX:56,regY:56,x:82.15,y:-88.6},0).wait(1).to({regX:-9.3,regY:-5,x:17.25,y:-148.4},0).wait(1).to({x:17.65,y:-147.35},0).wait(1).to({x:18.05,y:-146.35},0).wait(1).to({x:18.4,y:-145.45},0).wait(1).to({x:18.7,y:-144.65},0).wait(1).to({x:18.95,y:-143.95},0).wait(1).to({x:19.2,y:-143.3},0).wait(1).to({x:19.4,y:-142.75},0).wait(1).to({regX:56,regY:56,x:84.9,y:-81.3},0).wait(1).to({regX:-9.3,regY:-5,x:19.55,y:-142.35},0).wait(1).to({y:-142.65},0).wait(1).to({x:19.45,y:-143.2},0).wait(1).to({x:19.35,y:-144},0).wait(1).to({x:19.25,y:-145.15},0).wait(1).to({regX:56,regY:56,x:84.4,y:-85.55},0).wait(1));

	// Layer_2
	this.instance = new lib.Head_Tie("synched",0);
	this.instance.setTransform(-17.15,-150.25,1,1,0,0,0,41.8,28.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:19.4,regY:19.1,scaleX:1.0024,skewX:-4.4441,skewY:-7.0248,x:-41.2,y:-159.95},0).wait(1).to({scaleX:1.0042,skewX:-7.8415,skewY:-12.3951,x:-42.25,y:-160.05},0).wait(1).to({scaleX:1.0053,skewX:-9.8388,skewY:-15.5523,x:-42.8},0).wait(1).to({regX:41.8,regY:28.6,scaleX:1.0056,skewX:-10.4636,skewY:-16.5399,x:-19.65,y:-157.05},0).wait(1).to({regX:19.4,regY:19.1,scaleX:1.005,skewX:-6.7937,skewY:-11.4308,x:-42.45,y:-159.4},0).wait(1).to({scaleX:1.0044,scaleY:0.9999,skewX:-3.4175,skewY:-6.7307,x:-41.75,y:-158.9},0).wait(1).to({scaleX:1.0039,scaleY:0.9998,skewX:-0.3391,skewY:-2.4451,x:-41.05,y:-158.4},0).wait(1).to({scaleX:1.0034,skewX:2.4457,skewY:1.4317,x:-40.25,y:-157.9},0).wait(1).to({scaleX:1.003,scaleY:0.9997,rotation:4.9468,skewX:0,skewY:0,x:-39.45,y:-157.5},0).wait(1).to({scaleX:1.0025,rotation:0,skewX:7.1782,skewY:8.0201,x:-38.75,y:-157.05},0).wait(1).to({scaleX:1.0022,skewX:9.1558,skewY:10.7732,x:-38,y:-156.65},0).wait(1).to({scaleX:1.0019,scaleY:0.9996,skewX:10.8964,skewY:13.1964,x:-37.3,y:-156.3},0).wait(1).to({regX:41.8,regY:28.5,scaleX:1.0016,skewX:12.4171,skewY:15.3133,x:-17.1,y:-140.9},0).wait(1).to({regX:19.4,regY:19.1,skewX:12.1477,skewY:14.9812,x:-36.75,y:-156.05},0).wait(1).to({scaleX:1.0015,skewX:11.276,skewY:13.9061,x:-37.05,y:-156.35},0).wait(1).to({scaleX:1.0013,scaleY:0.9997,skewX:9.6965,skewY:11.9582,x:-37.45,y:-156.85},0).wait(1).to({scaleX:1.001,scaleY:0.9998,skewX:7.3049,skewY:9.0088,x:-38.05,y:-157.55},0).wait(1).to({scaleX:1.0005,scaleY:0.9999,skewX:4.0427,skewY:4.9856,x:-38.75,y:-158.5},0).wait(1).to({regX:41.8,regY:28.7,scaleX:1,scaleY:1,skewX:0,skewY:0,x:-17.15,y:-150.25},0).wait(1));

	// right_arm
	this.rightarm = new lib.rightArmGirl();
	this.rightarm.name = "rightarm";
	this.rightarm.setTransform(-27.45,-126.7,1,1,0,0,0,-2,0.3);

	this.timeline.addTween(cjs.Tween.get(this.rightarm).to({regX:-2.1,regY:0.1,scaleY:1.0173,skewX:17.1394,skewY:6.5312,x:-17.8,y:-113.9},9,cjs.Ease.cubicInOut).wait(1).to({regX:-21.1,regY:20.5,scaleY:1.0171,skewX:16.9365,skewY:6.4558,x:-42.75,y:-96.3},0).wait(1).to({scaleY:1.0167,skewX:16.4778,skewY:6.2853,x:-42.85,y:-96.55},0).wait(1).to({scaleY:1.0158,skewX:15.6497,skewY:5.9776,x:-43.1,y:-97},0).wait(1).to({scaleY:1.0144,skewX:14.2495,skewY:5.4574,x:-43.4,y:-97.8},0).wait(1).to({scaleY:1.012,skewX:11.9148,skewY:4.5899,x:-44,y:-99.15},0).wait(1).to({scaleY:1.0083,skewX:8.3506,skewY:3.2655,x:-44.75,y:-101.25},0).wait(1).to({scaleY:1.0046,skewX:4.7382,skewY:1.9232,x:-45.6,y:-103.5},0).wait(1).to({scaleY:1.0022,skewX:2.3849,skewY:1.0488,x:-46.1,y:-104.95},0).wait(1).to({scaleY:1.0007,skewX:1.0224,skewY:0.5425,x:-46.4,y:-105.85},0).wait(1).to({regX:-2,regY:0.1,scaleY:1,rotation:0.2588,skewX:0,skewY:0,x:-27.5,y:-126.7},0).wait(1));

	// leftArm
	this.leftarm = new lib.rightArmGirl();
	this.leftarm.name = "leftarm";
	this.leftarm.setTransform(30.55,-117.7,1,1,0,0,180,-0.1,0.3);

	this.timeline.addTween(cjs.Tween.get(this.leftarm).to({regY:0.2,scaleY:1.0028,skewX:-7.3397,skewY:176.9815,x:38.85,y:-107.2},9,cjs.Ease.cubicInOut).wait(1).to({regX:-21.1,regY:20.5,skewX:-7.252,skewY:177.0172,x:62.25,y:-88.2},0).wait(1).to({scaleY:1.0027,skewX:-7.0538,skewY:177.098,x:61.9,y:-88.45},0).wait(1).to({scaleY:1.0026,skewX:-6.696,skewY:177.2438,x:61.45,y:-88.9},0).wait(1).to({scaleY:1.0024,skewX:-6.0911,skewY:177.4903,x:60.6,y:-89.65},0).wait(1).to({scaleY:1.002,skewX:-5.0824,skewY:177.9014,x:59.05,y:-90.95},0).wait(1).to({scaleY:1.0013,skewX:-3.5424,skewY:178.5289,x:56.8,y:-92.9},0).wait(1).to({scaleY:1.0007,skewX:-1.9817,skewY:179.165,x:54.5,y:-94.95},0).wait(1).to({scaleY:1.0003,skewX:-0.9649,skewY:179.5793,x:53.05,y:-96.25},0).wait(1).to({scaleY:1.0001,skewX:-0.3762,skewY:179.8192,x:52.2,y:-97},0).wait(1).to({regX:-0.1,regY:0.3,scaleX:0.9999,scaleY:0.9999,skewX:-0.0463,skewY:179.9537,x:30.7,y:-117.7},0).wait(1));

	// Tie_01
	this.instance_1 = new lib.Tie_01("synched",0);
	this.instance_1.setTransform(19.35,-65.9,1,1,0,0,0,12.3,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:12.2,rotation:2.4924,x:25.2,y:-61.1},9,cjs.Ease.cubicInOut).to({regX:12.3,rotation:0,x:19.35,y:-65.9},10,cjs.Ease.cubicInOut).wait(1));

	// Tie_02
	this.instance_2 = new lib.Tie_02("synched",0);
	this.instance_2.setTransform(23.65,-65.6,1,1,0,0,0,6,8.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:6.1,regY:8.2,rotation:-3.1962,x:29.65,y:-60.9},9,cjs.Ease.cubicInOut).to({regX:6,regY:8.3,rotation:0,x:23.65,y:-65.6},10,cjs.Ease.cubicInOut).wait(1));

	// body
	this.body = new lib.bodyGirl();
	this.body.name = "body";
	this.body.setTransform(0,-42.3,1,1,0,0,0,0,47.2);

	this.timeline.addTween(cjs.Tween.get(this.body).to({regY:47.1,scaleX:1.0499,scaleY:0.9363,skewX:3.4252,x:3.1,y:-39.1},9,cjs.Ease.cubicInOut).wait(1).to({regX:1.1,regY:2.8,scaleX:1.0493,scaleY:0.9371,skewX:3.3841,x:6.65,y:-80.55},0).wait(1).to({scaleX:1.0479,scaleY:0.9388,skewX:3.291,x:6.5,y:-80.75},0).wait(1).to({scaleX:1.0455,scaleY:0.9419,skewX:3.123,x:6.25,y:-81},0).wait(1).to({scaleX:1.0413,scaleY:0.9472,skewX:2.8389,x:5.75,y:-81.5},0).wait(1).to({scaleX:1.0344,scaleY:0.956,skewX:2.3651,x:5.05,y:-82.4},0).wait(1).to({scaleX:1.0239,scaleY:0.9695,skewX:1.6419,x:3.85,y:-83.7},0).wait(1).to({scaleX:1.0132,scaleY:0.9831,skewX:0.9089,x:2.6,y:-85},0).wait(1).to({scaleX:1.0063,scaleY:0.992,skewX:0.4314,x:1.8,y:-85.85},0).wait(1).to({scaleX:1.0023,scaleY:0.9971,skewX:0.1549,x:1.35,y:-86.35},0).wait(1).to({regX:0,regY:47.2,scaleX:1,scaleY:1,skewX:0,x:0,y:-42.3},0).wait(1));

	// rightleg
	this.instance_3 = new lib.rightleg_walkGirl("synched",0);
	this.instance_3.setTransform(-52.2,4.45,1,1.0436,0,32.4324,29.6796,9.3,47.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:31.7,regY:18.8,scaleY:1.0428,skewX:32.4932,skewY:29.6771,x:-16.7,y:-9.6,startPosition:1},0).wait(1).to({scaleX:0.9999,scaleY:1.0408,skewX:32.6518,skewY:29.6704,y:-9.3,startPosition:2},0).wait(1).to({scaleX:0.9996,scaleY:1.0368,skewX:32.9796,skewY:29.6567,x:-16.75,y:-8.75,startPosition:3},0).wait(1).to({scaleX:0.9992,scaleY:1.0288,skewX:33.6269,skewY:29.6297,x:-16.9,y:-7.6,startPosition:4},0).wait(1).to({regX:9.3,regY:47.5,scaleX:0.9986,scaleY:1.0172,skewX:34.5673,skewY:29.5904,x:-53.1,y:7.1,startPosition:5},0).wait(1).to({regX:31.7,regY:18.8,scaleX:0.9994,scaleY:1.0105,skewX:35.199,skewY:29.6414,x:-15.9,y:-6.15,startPosition:6},0).wait(1).to({scaleX:0.9998,scaleY:1.0073,skewX:35.5029,skewY:29.666,x:-15.35,y:-6.2,startPosition:7},0).wait(1).to({scaleX:1,scaleY:1.0058,skewX:35.6363,skewY:29.6767,x:-15.05,y:-6.25,startPosition:8},0).wait(1).to({regX:9.3,regY:47.5,scaleY:1.0055,skewX:35.6718,skewY:29.6796,x:-51.4,y:6,startPosition:9},0).wait(1).to({regX:31.7,regY:18.8,scaleY:1.0059,skewX:35.6329,x:-15.1,y:-6.4,startPosition:10},0).wait(1).to({scaleY:1.007,skewX:35.5448,x:-15.15,y:-6.45,startPosition:11},0).wait(1).to({scaleY:1.0088,skewX:35.3859,x:-15.25,y:-6.65,startPosition:12},0).wait(1).to({scaleY:1.012,skewX:35.1172,x:-15.35,y:-6.9,startPosition:13},0).wait(1).to({scaleY:1.0173,skewX:34.6692,x:-15.6,y:-7.35,startPosition:14},0).wait(1).to({scaleY:1.0253,skewX:33.9852,x:-15.9,y:-8.1,startPosition:15},0).wait(1).to({scaleY:1.0334,skewX:33.292,x:-16.25,y:-8.8,startPosition:16},0).wait(1).to({scaleY:1.0388,skewX:32.8404,x:-16.5,y:-9.3,startPosition:17},0).wait(1).to({scaleY:1.0418,skewX:32.579,x:-16.6,y:-9.6,startPosition:18},0).wait(1).to({regX:9.3,regY:47.5,scaleY:1.0436,skewX:32.4324,x:-52.2,y:4.45,startPosition:19},0).wait(1));

	// leftLeg
	this.instance_4 = new lib.rightleg_walkGirl("synched",9);
	this.instance_4.setTransform(37.5,-50.6,0.9515,1.0461,0,33.9534,36.1804,17,-15.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({skewX:24.2383,skewY:26.4636,x:24.05,y:-54.55,startPosition:18},9,cjs.Ease.cubicInOut).wait(1).to({regX:31.7,regY:18.8,scaleX:0.9514,skewX:24.3384,skewY:26.5643,x:21.7,y:-15.25,startPosition:19},0).wait(1).to({scaleY:1.046,skewX:24.5649,skewY:26.792,x:21.65,y:-15.15,startPosition:0},0).wait(1).to({scaleX:0.9513,scaleY:1.0459,skewX:24.9737,skewY:27.2031,x:21.75,y:-15.05,startPosition:1},0).wait(1).to({scaleX:0.951,scaleY:1.0457,skewX:25.6649,skewY:27.8982,x:21.95,y:-14.85,startPosition:2},0).wait(1).to({scaleX:0.9507,scaleY:1.0452,skewX:26.8174,skewY:29.0572,x:22.15,y:-14.45,startPosition:3},0).wait(1).to({regX:17.1,regY:-15.8,scaleX:0.9501,scaleY:1.0446,skewX:28.5769,skewY:30.8266,x:27.8,y:-52.85,startPosition:4},0).wait(1).to({regX:31.7,regY:18.8,scaleX:0.9507,scaleY:1.0453,skewX:30.4111,skewY:32.6497,x:23.35,y:-13.5,startPosition:5},0).wait(1).to({scaleX:0.9511,scaleY:1.0457,skewX:31.6059,skewY:33.8374,x:23.95,y:-13.15,startPosition:6},0).wait(1).to({scaleX:0.9513,scaleY:1.046,skewX:32.2978,skewY:34.525,x:24.35,y:-13.05,startPosition:7},0).wait(1).to({regX:17,regY:-15.9,scaleX:0.9515,scaleY:1.0461,skewX:32.6855,skewY:34.9103,x:32.7,y:-51.45,startPosition:8},0).wait(1));

	// sword
	this.sword = new lib.sword();
	this.sword.name = "sword";
	this.sword.setTransform(3.05,-109.85,1,1,38.2073,0,0,116.5,5);

	this.timeline.addTween(cjs.Tween.get(this.sword).to({rotation:32.2331,x:15.1,y:-105.85},9,cjs.Ease.cubicInOut).wait(1).to({regX:94.9,regY:2.5,rotation:32.3049,x:-2,y:-119.6},0).wait(1).to({rotation:32.4672,x:-2.25,y:-119.7},0).wait(1).to({rotation:32.7603,x:-2.75,y:-120},0).wait(1).to({rotation:33.2559,x:-3.65,y:-120.45},0).wait(1).to({rotation:34.0821,x:-5.1,y:-121.3},0).wait(1).to({rotation:35.3435,x:-7.35,y:-122.45},0).wait(1).to({rotation:36.622,x:-9.6,y:-123.7},0).wait(1).to({rotation:37.4549,x:-10.95,y:-124.5},0).wait(1).to({rotation:37.9371,x:-11.85,y:-124.95},0).wait(1).to({regX:116.5,regY:5,rotation:38.2073,x:3.05,y:-109.85},0).wait(1));

	// Shadow
	this.instance_5 = new lib.CachedBmp_122();
	this.instance_5.setTransform(-85.65,-7.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.4,-216.5,237.10000000000002,246.8);


(lib.NinjaGirljump = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// head
	this.head = new lib.headGirl();
	this.head.name = "head";
	this.head.setTransform(-4.55,-117.1,1,1,0,0,0,-32.5,25.4);

	this.timeline.addTween(cjs.Tween.get(this.head).wait(1).to({regX:-9.3,regY:-5,rotation:2.5445,x:19.7,y:-123.65},0).wait(1).to({rotation:4.4896,x:20.55,y:-105.4},0).wait(1).to({rotation:5.6331,x:21,y:-94.65},0).wait(1).to({regX:-32.5,regY:25.3,rotation:5.9909,x:-5.15,y:-63.55},0).to({regX:-32.4,scaleX:0.9984,scaleY:0.9984,rotation:3.6574,x:-23.2,y:-152.3},1,cjs.Ease.get(1)).to({regX:-32.3,regY:25.2,scaleX:0.9972,scaleY:0.9972,rotation:-12.8966,x:-25.75,y:-212.8},1).to({regX:-32.4,scaleX:0.9963,scaleY:0.9963,rotation:-63.2003,x:-16.2,y:-252.85},1).wait(1).to({regX:-9.3,regY:-5,scaleX:0.9973,scaleY:0.9973,rotation:-104.352,x:-43.15,y:-300.35},0).wait(1).to({scaleX:0.998,scaleY:0.998,rotation:-136.3589,x:-39.6,y:-305.15},0).wait(1).to({regX:-32.3,regY:25.2,scaleX:0.9986,scaleY:0.9986,rotation:-159.221,x:2.2,y:-329.25},0).wait(1).to({regX:-9.3,regY:-5,scaleX:0.9996,scaleY:0.9996,rotation:-196.1636,x:-17,y:-316.15},0).wait(1).to({regX:-32.4,regY:25.4,scaleX:1,scaleY:1,rotation:-208.4778,x:-5.2,y:-358.95},0).to({regY:25.5,scaleX:0.9999,scaleY:0.9999,rotation:-213.184,x:-8.3,y:-359},1,cjs.Ease.get(-1)).wait(1).to({regX:-9.3,regY:-5,rotation:-222.36,x:-4.6,y:-305.7},0).wait(1).to({rotation:-237.6533,x:5.75,y:-282.8},0).wait(1).to({scaleX:1,scaleY:1,rotation:-259.064,x:18.4,y:-254.95},0).wait(1).to({rotation:-286.592,x:29.4,y:-224.6},0).wait(1).to({rotation:-320.2373,x:31.7,y:-191.3},0).wait(1).to({regX:-32.5,regY:25.4,rotation:-360,x:-4.55,y:-117.1},0).to({y:-77.1},4,cjs.Ease.cubicOut).to({y:-117.1},4,cjs.Ease.get(1)).wait(5));

	// Layer_2
	this.instance = new lib.Head_Tie("synched",0);
	this.instance.setTransform(-17.15,-150.25,1,1,0,0,0,41.8,28.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:19.4,regY:19.1,skewX:7.9597,skewY:7.6442,x:-36.7,y:-140.85},0).wait(1).to({skewX:14.0447,skewY:13.4879,x:-34.35,y:-126.2},0).wait(1).to({skewX:17.622,skewY:16.9235,x:-32.8,y:-117.5},0).wait(1).to({regX:41.6,regY:28.5,skewX:18.741,skewY:17.9981,x:-14.15,y:-98.85},0).to({regY:28.4,scaleX:0.9988,scaleY:0.9988,skewX:-84.7774,skewY:-85.5279,x:-42,y:-181.75},1,cjs.Ease.get(1)).to({regX:41.7,scaleX:0.9984,scaleY:0.9984,skewX:-102.8064,skewY:-103.5579,x:-9.8,y:-215.3},1).to({regX:41.8,scaleX:0.9975,scaleY:0.9975,skewX:-118.0987,skewY:-118.8501,x:-5.7,y:-243.55},1).wait(1).to({regX:19.4,regY:19.1,scaleX:0.9984,scaleY:0.9983,skewX:-130.7603,skewY:-131.509,x:5.4,y:-243.75},0).wait(1).to({scaleX:0.9991,scaleY:0.999,skewX:-140.6083,skewY:-141.3548,x:11.85,y:-263.35},0).wait(1).to({scaleX:0.9996,scaleY:0.9995,skewX:-147.6425,skewY:-148.3875,x:16.25,y:-277.75},0).wait(1).to({scaleX:0.9999,scaleY:0.9998,skewX:-151.8631,skewY:-152.6071,x:18.8,y:-286.45},0).wait(1).to({regX:41.6,regY:28.5,scaleX:1,scaleY:0.9999,skewX:-153.2699,skewY:-154.0136,x:3.75,y:-307.55},0).to({regY:28.6,scaleX:0.9986,scaleY:0.9985,skewX:-159.156,skewY:-159.9028,x:8.5,y:-306.8},1,cjs.Ease.get(-1)).wait(1).to({regX:19.4,regY:19.1,scaleX:0.9987,scaleY:0.9986,skewX:-149.2087,skewY:-149.9089,x:21.2,y:-277.75},0).wait(1).to({scaleX:0.9988,scaleY:0.9987,skewX:-132.63,skewY:-133.2524,x:12.45,y:-258.1},0).wait(1).to({scaleX:0.999,scaleY:0.999,skewX:-109.4197,skewY:-109.9332,x:-0.85,y:-233.85},0).wait(1).to({scaleX:0.9993,scaleY:0.9993,skewX:-79.578,skewY:-79.9514,x:-17.45,y:-208.4},0).wait(1).to({scaleX:0.9996,scaleY:0.9996,skewX:-43.1047,skewY:-43.307,x:-32.8,y:-184.3},0).wait(1).to({regX:41.8,regY:28.7,scaleX:1,scaleY:1,skewX:0,skewY:0,x:-17.15,y:-150.25},0).to({regX:41.9,regY:28.6,scaleX:0.9999,scaleY:0.9999,rotation:-50.0227,x:-19.8,y:-116.6},4,cjs.Ease.cubicOut).to({regX:41.8,regY:28.7,scaleX:1,scaleY:1,rotation:0,x:-16.75,y:-149.45},8,cjs.Ease.cubicOut).wait(1));

	// right_arm
	this.rightarm = new lib.rightArmGirl();
	this.rightarm.name = "rightarm";
	this.rightarm.setTransform(-27.45,-126.7,1,1,0,0,0,-2,0.3);

	this.timeline.addTween(cjs.Tween.get(this.rightarm).to({regX:-2.1,regY:0.1,scaleY:1.0173,skewX:26.6027,skewY:15.9934,x:-17.7,y:-104.35},4,cjs.Ease.cubicInOut).to({regY:-0.1,scaleX:0.9987,scaleY:1.0165,skewX:-29.2816,skewY:-40.0167,x:-18.25,y:-161.05},1,cjs.Ease.get(1)).to({regX:-2,scaleX:0.998,scaleY:1.0153,skewX:-60.1636,skewY:-70.9284,x:-39.55,y:-215},1).to({regX:-2.1,scaleX:0.9981,scaleY:1.0156,skewX:-44.986,skewY:-55.5422,x:-41,y:-256.1},1).wait(1).to({regX:-21.1,regY:20.5,scaleX:0.9988,scaleY:1.0162,skewX:-81.1381,skewY:-91.7134,x:-1.05,y:-261},0).wait(1).to({scaleX:0.9993,scaleY:1.0167,skewX:-109.2564,skewY:-119.8465,x:21.45,y:-294.65},0).wait(1).to({scaleX:0.9997,scaleY:1.017,skewX:-129.3409,skewY:-139.9416,x:33.2,y:-320.35},0).wait(1).to({scaleX:0.9999,scaleY:1.0172,skewX:-141.3915,skewY:-151.9986,x:38.55,y:-335.8},0).wait(1).to({regX:-2.1,regY:0.1,scaleX:1,scaleY:1.0173,skewX:-145.4084,skewY:-156.0176,x:10.7,y:-331.35},0).to({regX:-2.2,scaleX:0.9986,scaleY:1.0153,skewX:-151.392,skewY:-161.8967,x:11.45,y:-330.25},1,cjs.Ease.get(-1)).wait(1).to({regX:-21.1,regY:20.5,scaleX:0.9987,scaleY:1.0143,skewX:-141.93,skewY:-151.7782,x:38.3,y:-324.85},0).wait(1).to({scaleX:0.9988,scaleY:1.0128,skewX:-126.16,skewY:-134.9139,x:34.9,y:-295.15},0).wait(1).to({scaleX:0.999,scaleY:1.0105,skewX:-104.082,skewY:-111.304,x:26.1,y:-254.1},0).wait(1).to({scaleX:0.9993,scaleY:1.0077,skewX:-75.696,skewY:-80.9484,x:8.9,y:-204.8},0).wait(1).to({scaleX:0.9996,scaleY:1.0041,skewX:-41.002,skewY:-43.847,x:-17.15,y:-153.35},0).wait(1).to({regX:-2,regY:0.3,scaleX:1,scaleY:1,skewX:0,skewY:0,x:-27.45,y:-126.7},0).to({regY:0.1,scaleX:0.9999,scaleY:0.9999,rotation:23.2411,x:-27.5,y:-101.7},4,cjs.Ease.cubicOut).to({scaleX:1,scaleY:1,rotation:0.2588,y:-126.7},4,cjs.Ease.get(1)).wait(4).to({rotation:0.2588},0).wait(1));

	// leftArm
	this.leftarm = new lib.rightArmGirl();
	this.leftarm.name = "leftarm";
	this.leftarm.setTransform(30.55,-117.7,1,1,0,0,180,-0.1,0.3);

	this.timeline.addTween(cjs.Tween.get(this.leftarm).to({regY:0.2,scaleY:1.0028,skewX:-17.315,skewY:167.0062,x:38.85,y:-97.6},4,cjs.Ease.cubicInOut).to({scaleX:0.9984,scaleY:1.0013,skewX:25.0545,skewY:209.3345,x:13.75,y:-149.6},1,cjs.Ease.get(1)).to({regY:0.1,scaleX:0.9976,scaleY:1.0003,skewX:35.7522,skewY:220.0237,x:23.5,y:-220.6},1).to({regY:0,scaleX:0.9978,skewX:3.4781,skewY:187.9289,x:-4.55,y:-281.75},1).wait(1).to({regY:-0.1,scaleX:0.9974,scaleY:0.9999,skewX:0.3944,skewY:184.8805,x:-20.65,y:-325.25},0).wait(1).to({regX:-0.2,scaleX:0.9979,scaleY:1.0008,skewX:-63.2248,skewY:121.2516,x:-48.35,y:-346.65},0).wait(1).to({regY:0,scaleX:0.9981,skewX:-122.5651,skewY:61.9098,x:-41.55,y:-335.55},0).wait(1).to({regX:-0.4,regY:-0.1,scaleY:1.0007,skewX:-138.0537,skewY:46.4204,x:-41.75,y:-339.4},0).wait(1).to({regX:-0.1,regY:0.2,scaleX:0.9999,scaleY:1.0028,skewX:-146.1404,skewY:38.1808,x:-41.4,y:-342},0).to({regY:0.4,scaleX:0.9995,scaleY:1.002,skewX:-185.9509,skewY:-1.6981,x:-42.8,y:-336.05},1,cjs.Ease.get(-1)).wait(1).to({regY:0.5,scaleX:0.9987,scaleY:1.1213,skewX:-216.5156,skewY:-32.5124,x:-44.05,y:-322.55},0).wait(1).to({regX:0,scaleX:1.0353,scaleY:1.3091,skewX:-262.0579,skewY:-66.2531,x:-39.4,y:-299.8},0).wait(1).to({regX:0.1,regY:0.4,scaleX:1.0055,scaleY:1.1904,skewX:-300.7576,skewY:-112.9319,x:-22.1,y:-242.7},0).wait(1).to({regX:-0.1,scaleX:0.9996,scaleY:1.0008,skewX:-326.0749,skewY:-144.0432,x:12.85,y:-188.7},0).wait(1).to({skewX:-348.0613,skewY:-166.0291,x:27.05,y:-141},0).wait(1).to({regY:0.3,scaleX:1,scaleY:1,skewX:-360,skewY:-180,x:30.55,y:-117.7},0).to({regY:0.2,scaleX:0.9999,scaleY:0.9999,skewX:-381.5309,skewY:-201.5309,x:30.65,y:-92.8},4,cjs.Ease.cubicOut).to({regY:0.3,skewX:-360.0463,skewY:-180.0463,x:30.7,y:-117.7},4,cjs.Ease.get(1)).wait(5));

	// Tie_01
	this.instance_1 = new lib.Tie_01("synched",0);
	this.instance_1.setTransform(19.35,-65.9,1,1,0,0,0,12.3,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleY:1.0012,skewX:-0.3056,skewY:2.4924,x:22.25,y:-51.55},4,cjs.Ease.cubicInOut).to({regY:7.7,scaleX:0.9984,scaleY:1.7561,skewX:-6.1728,skewY:-3.4014,x:7.4,y:-129.3},1,cjs.Ease.get(1)).to({scaleX:0.9971,scaleY:1.5532,skewX:-50.3619,skewY:-47.4087,x:19.7,y:-198.25},1).to({scaleX:0.9977,scaleY:1.3843,skewX:-87.7182,skewY:-84.7409,x:6.95,y:-256.65},1).wait(1).to({regX:7.9,regY:25.6,scaleX:0.9985,scaleY:1.2464,skewX:-118.174,skewY:-115.2615,x:18.3,y:-310.85},0).wait(1).to({scaleX:0.9992,scaleY:1.1391,skewX:-141.8619,skewY:-138.9997,x:4.65,y:-354.6},0).wait(1).to({scaleX:0.9996,scaleY:1.0625,skewX:-158.7818,skewY:-155.9556,x:-6.05,y:-383.8},0).wait(1).to({scaleX:0.9999,scaleY:1.0165,skewX:-168.9337,skewY:-166.1291,x:-12.6,y:-400.6},0).wait(1).to({regX:12.3,regY:7.9,scaleX:1,scaleY:1.0012,skewX:-172.3177,skewY:-169.5203,x:-21.45,y:-389.15},0).to({regX:12.4,scaleX:0.9992,scaleY:1.0005,skewX:-177.9215,skewY:-175.1705,x:-27.4,y:-380.2},1,cjs.Ease.get(-1)).wait(1).to({regX:7.9,regY:25.6,scaleX:0.9993,scaleY:1.0004,skewX:-166.8014,skewY:-164.2224,x:-16.1,y:-376.55},0).wait(1).to({skewX:-148.2679,skewY:-145.9754,x:-6.6,y:-340.35},0).wait(1).to({scaleX:0.9995,scaleY:1.0003,skewX:-122.321,skewY:-120.4297,x:4.45,y:-287.55},0).wait(1).to({scaleX:0.9996,scaleY:1.0002,skewX:-88.9607,skewY:-87.5853,x:13.5,y:-218.25},0).wait(1).to({scaleX:0.9998,scaleY:1.0001,skewX:-48.1871,skewY:-47.442,x:16.85,y:-135.9},0).wait(1).to({regX:12.3,regY:7.9,scaleX:1,scaleY:1,skewX:0,skewY:0,x:19.35,y:-65.9},0).to({y:-45.9},4,cjs.Ease.cubicOut).to({y:-65.9},4,cjs.Ease.get(1)).wait(4).to({startPosition:0},0).wait(1));

	// Tie_02
	this.instance_2 = new lib.Tie_02("synched",0);
	this.instance_2.setTransform(23.65,-65.6,1,1,0,0,0,6,8.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:6.2,regY:8.2,scaleY:1.0012,skewX:-5.9384,skewY:-3.1962,x:27.65,y:-51.1},4,cjs.Ease.cubicInOut).to({regX:6.3,regY:8.1,scaleX:0.9984,scaleY:1.7165,skewX:-9.3522,skewY:-6.5956,x:9.95,y:-127.75},1,cjs.Ease.get(1)).to({regX:6.4,scaleX:0.9971,scaleY:1.5243,skewX:-54.1447,skewY:-51.3858,x:20.3,y:-197.5},1).to({scaleX:0.9979,scaleY:1.3642,skewX:-91.805,skewY:-89.2422,x:5.95,y:-256.5},1).wait(1).to({regX:10,regY:28.8,scaleX:0.9987,scaleY:1.2335,skewX:-122.8172,skewY:-120.1898,x:13.85,y:-321.65},0).wait(1).to({scaleX:0.9992,scaleY:1.1318,skewX:-146.9378,skewY:-144.2601,x:-5.1,y:-363.9},0).wait(1).to({scaleX:0.9997,scaleY:1.0592,skewX:-164.1668,skewY:-161.4533,x:-19,y:-391.2},0).wait(1).to({scaleX:0.9999,scaleY:1.0157,skewX:-174.5042,skewY:-171.7691,x:-27,y:-406.45},0).wait(1).to({regX:6.2,regY:8.2,scaleX:1,scaleY:1.0011,skewX:-177.95,skewY:-175.2078,x:-26.75,y:-390.35},0).to({regX:6.3,regY:8.3,scaleX:0.9995,scaleY:1.0008,skewX:-183.4309,skewY:-180.6954,x:-32.7,y:-380.7},1,cjs.Ease.get(-1)).wait(1).to({regX:10,regY:28.8,scaleX:0.9996,scaleY:1.0007,skewX:-194.4665,skewY:-191.9019,x:-37.9,y:-380.1},0).wait(1).to({scaleY:1.0006,skewX:-212.8591,skewY:-210.5795,x:-37.6,y:-343.5},0).wait(1).to({scaleX:0.9997,scaleY:1.0005,skewX:-238.6088,skewY:-236.7281,x:-34.65,y:-289.8},0).wait(1).to({scaleX:0.9998,scaleY:1.0004,skewX:-271.7155,skewY:-270.3477,x:-25.05,y:-218.85},0).wait(1).to({scaleX:0.9999,scaleY:1.0002,skewX:-312.1792,skewY:-311.4383,x:-4.4,y:-134.35},0).wait(1).to({regX:6,regY:8.3,scaleX:1,scaleY:1,skewX:-360,skewY:-360,x:23.65,y:-65.6},0).to({y:-45.6},4,cjs.Ease.cubicOut).to({y:-65.6},4,cjs.Ease.get(1)).wait(4).to({startPosition:0},0).wait(1));

	// body
	this.body = new lib.bodyGirl();
	this.body.name = "body";
	this.body.setTransform(0,-42.3,1,1,0,0,0,0,47.2);

	this.timeline.addTween(cjs.Tween.get(this.body).to({regY:47.1,scaleX:1.1253,scaleY:0.9017,skewX:3.4246,x:3.1,y:-29.5},4,cjs.Ease.cubicInOut).to({regX:-0.1,scaleX:1.0602,scaleY:1.1614,skewX:-4.4005,skewY:-7.895,x:2.5,y:-68.2},1,cjs.Ease.get(1)).to({regX:0,regY:46.9,scaleX:1.1223,scaleY:1.1236,skewX:-37.4966,skewY:-40.9995,x:21.4,y:-161.3},1).to({regX:-0.1,regY:47,scaleX:1.1228,scaleY:1.2545,skewX:-39.3528,skewY:-42.8512,x:15.4,y:-220.35},1).wait(1).to({regX:0,scaleX:1.1236,scaleY:1.1272,skewX:-85.9688,skewY:-89.4616,x:32.2,y:-291.9},0).wait(1).to({regX:-0.1,scaleX:1.1226,scaleY:1.0271,skewX:-122.0694,skewY:-125.5657,x:22.4,y:-351.75},0).wait(1).to({regY:47.1,scaleX:1.1233,scaleY:0.9567,skewX:-147.9247,skewY:-151.4178,x:3,y:-378.25},0).wait(1).to({regX:0,scaleX:1.1243,scaleY:0.9149,skewX:-163.4655,skewY:-166.9516,x:1.05,y:-400.8},0).wait(1).to({scaleX:1.1253,scaleY:0.9017,skewX:-168.5881,skewY:-172.0122,x:-3.15,y:-408.35},0).to({regX:0.1,scaleX:1.122,scaleY:0.9029,skewX:-174.19,skewY:-177.6585,x:-7.6,y:-401.55},1,cjs.Ease.get(-1)).to({regY:47.2,scaleX:1.1135,scaleY:0.9081,skewX:-180.9214,skewY:-184.1776,x:-10.4,y:-384.25},1).wait(1).to({scaleX:1.0995,scaleY:0.9173,skewX:-200.7916,skewY:-203.5842,x:-16.55,y:-346.25},0).wait(1).to({scaleX:1.0814,scaleY:0.9311,skewX:-228.651,skewY:-231.1306,x:-22,y:-293.05},0).wait(1).to({scaleX:1.0603,scaleY:0.9507,skewX:-264.4976,skewY:-266.2455,x:-34.25,y:-224.65},0).wait(1).to({scaleX:1.0311,scaleY:0.9718,skewX:-308.3249,skewY:-309.1259,x:-27.5,y:-124.4},0).wait(1).to({regX:0,scaleX:1,scaleY:1,skewX:-360,skewY:-360,x:0,y:-42.3},0).to({regX:0.1,scaleX:1.1782,scaleY:0.9181,x:2.5,y:-22.25},4,cjs.Ease.cubicOut).to({regX:0,scaleX:1,scaleY:1,x:0,y:-42.3},4,cjs.Ease.get(1)).wait(5));

	// rightleg
	this.rightleg = new lib.rightlegGirl();
	this.rightleg.name = "rightleg";
	this.rightleg.setTransform(-52.2,2.85,1,1.0436,0,32.4324,29.6796,9.3,47.5);

	this.timeline.addTween(cjs.Tween.get(this.rightleg).to({regY:47.4,scaleX:1.1376,scaleY:1.0108,skewX:38.723,skewY:29.6797,x:-52},4,cjs.Ease.cubicInOut).to({regX:9,regY:47,scaleX:1.1344,scaleY:1.8351,skewX:12.1609,skewY:52.6301,x:-39.35,y:-19.65},1,cjs.Ease.get(1)).to({regX:9.1,regY:46.8,scaleX:1.1275,scaleY:1.383,skewX:-0.1252,skewY:142.359,x:-9.4,y:-88.45},1).to({regX:9.3,regY:47.4,scaleX:1.1376,scaleY:1.6441,skewX:-4.0703,skewY:-15.5764,x:4.85,y:-121.35},1).wait(1).to({regX:7.3,regY:22.6,scaleY:1.4161,skewX:-50.5889,skewY:-61.2083,x:-3.6,y:-253.8},0).wait(1).to({scaleY:1.2388,skewX:-86.77,skewY:-96.6998,x:9.6,y:-320.1},0).wait(1).to({scaleY:1.1122,skewX:-112.6136,skewY:-122.0509,x:26.6,y:-370.35},0).wait(1).to({scaleY:1.0361,skewX:-128.1198,skewY:-137.2615,x:38.85,y:-402.85},0).wait(1).to({regX:9.3,regY:47.4,scaleY:1.0108,skewX:-133.2885,skewY:-142.3317,x:59.65,y:-432.65},0).to({regX:9.2,regY:47.5,scaleX:1.1329,scaleY:1.0098,skewX:-138.845,skewY:-147.8533,x:43.2,y:-433.05},1,cjs.Ease.get(-1)).wait(1).to({regX:7.3,regY:22.6,scaleX:1.1246,scaleY:1.0119,skewX:-128.1402,skewY:-136.7575,x:18.95,y:-388.7},0).wait(1).to({scaleX:1.1108,scaleY:1.0154,skewX:-110.2988,skewY:-118.2645,x:4.6,y:-349.75},0).wait(1).to({scaleX:1.0914,scaleY:1.0204,skewX:-85.3208,skewY:-92.3742,x:-11.8,y:-296.75},0).wait(1).to({scaleX:1.0665,scaleY:1.0267,skewX:-53.2063,skewY:-59.0868,x:-25.95,y:-228.65},0).wait(1).to({scaleX:1.036,scaleY:1.0344,skewX:-13.9552,skewY:-18.4022,x:-34.35,y:-139.55},0).wait(1).to({regX:9.3,regY:47.5,scaleX:1,scaleY:1.0436,skewX:32.4324,skewY:29.6796,x:-52.2,y:2.85},0).to({scaleY:1.079,skewX:44.662},4,cjs.Ease.cubicOut).to({scaleY:1.0436,skewX:32.4324},4,cjs.Ease.get(1)).wait(5));

	// leftLeg
	this.leftleg = new lib.leftlegGirl();
	this.leftleg.name = "leftleg";
	this.leftleg.setTransform(39.85,7.45,0.9515,1.0462,0,-2.2268,0,14.3,46.6);

	this.timeline.addTween(cjs.Tween.get(this.leftleg).to({regY:46.7,scaleX:1.1216,scaleY:0.8044,skewX:10.2346,x:40,y:7.6},4,cjs.Ease.cubicInOut).to({regY:46.5,scaleX:0.879,scaleY:1.8255,skewX:-3.8477,skewY:-14.1269,x:36.85,y:-23.4},1,cjs.Ease.get(1)).to({scaleX:0.9419,scaleY:1.5519,skewX:-7.9664,skewY:-18.4417,x:29.5,y:-108.1},1).to({regX:14.4,scaleX:0.9955,scaleY:1.5801,skewX:-11.447,skewY:-21.9514,x:26.85,y:-134.45},1).wait(1).to({regX:-2.3,regY:-15.5,scaleX:1.04,scaleY:1.2992,skewX:-17.98,skewY:-28.2909,x:-5.4,y:-283.75},0).wait(1).to({regX:-2.6,regY:-16.5,scaleX:1.0747,scaleY:1.3414,skewX:-107.5571,skewY:-117.8505,x:-8.65,y:-297.1},0).wait(1).to({regX:14.5,regY:46.5,scaleX:1.0997,scaleY:1.3458,skewX:-157.3568,skewY:-167.8342,x:-19.65,y:-430.4},0).wait(1).to({regX:14.6,regY:46.6,scaleX:1.1157,scaleY:1.4141,skewX:-164.8835,skewY:-175.1528,x:-28.75,y:-435.7},0).wait(1).to({regX:-2.8,regY:-12,scaleX:1.1156,scaleY:1.4382,skewX:-168.3216,skewY:-178.5908,x:-31,y:-354.95},0).to({regX:-2.7,skewX:-172.0673,skewY:-182.336,x:-31.1},1,cjs.Ease.get(-1)).wait(1).to({regX:9.2,regY:15.9,skewX:-180.3313,skewY:-190.5999,x:-45,y:-368.6},0).wait(1).to({regX:-2.6,regY:-12,skewX:-198.5122,skewY:-208.7806,x:-33.2,y:-278},0).to({regX:-2.7,regY:-11.9,scaleX:1.0958,scaleY:1.393,skewX:-260.2962,skewY:-269.3011,x:-25.15,y:-246.85},1).wait(1).to({regX:9.2,regY:15.9,scaleX:1.0629,scaleY:1.314,skewX:-283.5436,skewY:-289.9868,x:-41.5,y:-168.4},0).wait(1).to({scaleX:1.0148,scaleY:1.1983,skewX:-317.5204,skewY:-320.2198,x:-1.95,y:-71.8},0).wait(1).to({regX:14.3,regY:46.6,scaleX:0.9515,scaleY:1.0462,skewX:-362.2268,skewY:-360,x:39.85,y:7.45},0).to({regX:14.4,scaleY:0.9535,skewX:-353.794,x:39.95},4,cjs.Ease.cubicOut).to({regX:14.3,scaleY:1.0462,skewX:-362.2268,x:39.85},4,cjs.Ease.get(1)).wait(5));

	// sword
	this.sword = new lib.sword();
	this.sword.name = "sword";
	this.sword.setTransform(3.05,-109.85,1,1,38.2073,0,0,116.5,5);

	this.timeline.addTween(cjs.Tween.get(this.sword).to({rotation:32.2331,x:15.1,y:-86.75},4,cjs.Ease.cubicInOut).to({scaleX:0.9995,scaleY:0.9995,rotation:-43.7425,x:6.95,y:-149.3},1,cjs.Ease.get(1)).to({scaleX:0.9985,scaleY:0.9985,rotation:-86.9383,x:9,y:-240.3},1).to({scaleX:0.9982,scaleY:0.9982,rotation:-103.0293,x:0.3,y:-274.9},1).wait(1).to({regX:94.9,regY:2.5,scaleX:0.9988,scaleY:0.9988,rotation:-116.2591,x:0.6,y:-282.6},0).wait(1).to({scaleX:0.9993,scaleY:0.9993,rotation:-126.549,x:-1.3,y:-306.25},0).wait(1).to({scaleX:0.9997,scaleY:0.9997,rotation:-133.8989,x:-2.9,y:-323.45},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-138.3088,x:-3.95,y:-333.85},0).wait(1).to({regX:116.5,regY:5.1,scaleX:1,scaleY:1,rotation:-139.7788,x:-19.25,y:-353.35},0).to({regY:5.2,scaleX:0.9983,scaleY:0.9983,rotation:-145.1126,x:-20.25,y:-346.85},1,cjs.Ease.get(-1)).wait(1).to({regX:94.9,regY:2.5,scaleX:0.9984,scaleY:0.9984,rotation:-155.2033,x:-0.35,y:-321.8},0).wait(1).to({scaleX:0.9985,scaleY:0.9985,rotation:-172.0212,x:4.55,y:-305},0).wait(1).to({scaleX:0.9988,scaleY:0.9988,rotation:-195.5662,x:8.5,y:-282.2},0).wait(1).to({scaleX:0.9991,scaleY:0.9991,rotation:-225.8384,x:8.25,y:-251.95},0).wait(1).to({scaleX:0.9995,scaleY:0.9995,rotation:-262.8378,x:2,y:-209.65},0).wait(1).to({regX:116.4,regY:5,scaleX:1,scaleY:1,rotation:-306.5642,x:3.05,y:-129.9},0).to({rotation:-334.2424,x:3,y:-69.9},4,cjs.Ease.cubicOut).to({regX:116.5,rotation:-321.7927,x:3.05,y:-109.85},8,cjs.Ease.cubicOut).wait(1));

	// Shadow
	this.instance_3 = new lib.ShadowNinja("synched",0);
	this.instance_3.setTransform(-8.05,4.3,1,1,0,0,0,77.6,12);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:77.5,regY:12.1,scaleX:0.5612,scaleY:0.5612,x:-8.1,y:4.4,alpha:0.5},9,cjs.Ease.get(1)).to({regX:77.6,regY:12,scaleX:1,scaleY:1,x:-8.05,y:4.3,alpha:1},10,cjs.Ease.get(-1)).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-137.2,-451.5,272.7,471.7);


(lib.NinjaGirlIdle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{idle:0});

	// head
	this.head = new lib.headGirl();
	this.head.name = "head";
	this.head.setTransform(83.95,-86.5,1,1,0,0,0,56,56);

	this.timeline.addTween(cjs.Tween.get(this.head).wait(1).to({regX:-9.3,regY:-5,x:17.85,y:-148.35},0).wait(1).to({x:17.3,y:-149.05},0).wait(1).to({x:16.95,y:-149.45},0).wait(1).to({regX:56,regY:56,x:82.15,y:-88.6},0).wait(1).to({regX:-9.3,regY:-5,x:17.25,y:-148.4},0).wait(1).to({x:17.65,y:-147.35},0).wait(1).to({x:18.05,y:-146.35},0).wait(1).to({x:18.4,y:-145.45},0).wait(1).to({x:18.7,y:-144.65},0).wait(1).to({x:18.95,y:-143.95},0).wait(1).to({x:19.2,y:-143.3},0).wait(1).to({x:19.4,y:-142.75},0).wait(1).to({regX:56,regY:56,x:84.9,y:-81.3},0).wait(1).to({regX:-9.3,regY:-5,x:19.55,y:-142.35},0).wait(1).to({y:-142.65},0).wait(1).to({x:19.45,y:-143.2},0).wait(1).to({x:19.35,y:-144},0).wait(1).to({x:19.25,y:-145.15},0).wait(1).to({regX:56,regY:56,x:84.4,y:-85.55},0).wait(1));

	// Layer_2
	this.instance = new lib.Head_Tie("synched",0);
	this.instance.setTransform(-17.15,-150.25,1,1,0,0,0,41.8,28.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:19.4,regY:19.1,skewX:0.7498,skewY:0.4344,x:-40.1,y:-160.85},0).wait(1).to({skewX:1.3231,skewY:0.7666,x:-40.55,y:-161.65},0).wait(1).to({skewX:1.6601,skewY:0.9618,x:-40.8,y:-162.05},0).wait(1).to({regX:41.8,regY:28.5,skewX:1.7655,skewY:1.0229,x:-18.75,y:-152.3},0).wait(1).to({regX:19.4,regY:19.1,scaleX:1.0004,rotation:2.642,skewX:0,skewY:0,x:-40.35,y:-161.15},0).wait(1).to({scaleX:1.0008,rotation:0,skewX:3.4483,skewY:4.1373,x:-39.9,y:-160.35},0).wait(1).to({scaleX:1.0011,skewX:4.1836,skewY:5.498,x:-39.45,y:-159.6},0).wait(1).to({scaleX:1.0014,skewX:4.8487,skewY:6.7289,x:-39.05,y:-158.85},0).wait(1).to({scaleX:1.0016,skewX:5.446,skewY:7.8344,x:-38.7,y:-158.25},0).wait(1).to({scaleX:1.0018,skewX:5.979,skewY:8.8207,x:-38.4,y:-157.7},0).wait(1).to({scaleX:1.002,skewX:6.4513,skewY:9.6948,x:-38.1,y:-157.2},0).wait(1).to({scaleX:1.0022,skewX:6.867,skewY:10.4642,x:-37.85,y:-156.75},0).wait(1).to({regX:41.7,regY:28.6,scaleX:1.0023,skewX:7.2302,skewY:11.1363,x:-16.8,y:-142.75},0).wait(1).to({regX:19.4,regY:19.1,skewX:7.0734,skewY:10.8948,x:-37.55,y:-156.5},0).wait(1).to({scaleX:1.0021,skewX:6.5658,skewY:10.1129,x:-37.7,y:-156.7},0).wait(1).to({scaleX:1.0018,skewX:5.6461,skewY:8.6964,x:-37.95,y:-157},0).wait(1).to({scaleX:1.0014,skewX:4.2535,skewY:6.5514,x:-38.2,y:-157.5},0).wait(1).to({scaleX:1.0007,skewX:2.354,skewY:3.6257,x:-38.6,y:-158.1},0).wait(1).to({regX:41.8,regY:28.7,scaleX:1,skewX:0,skewY:0,x:-16.75,y:-149.45},0).wait(1));

	// right_arm
	this.rightarm = new lib.rightArmGirl();
	this.rightarm.name = "rightarm";
	this.rightarm.setTransform(-27.45,-126.7,1,1,0,0,0,-2,0.3);

	this.timeline.addTween(cjs.Tween.get(this.rightarm).to({regX:-2.1,regY:0.1,scaleY:1.0173,skewX:17.1394,skewY:6.5312,x:-17.8,y:-113.9},9,cjs.Ease.cubicInOut).wait(1).to({regX:-21.1,regY:20.5,scaleY:1.0171,skewX:16.9365,skewY:6.4558,x:-42.75,y:-96.3},0).wait(1).to({scaleY:1.0167,skewX:16.4778,skewY:6.2853,x:-42.85,y:-96.55},0).wait(1).to({scaleY:1.0158,skewX:15.6497,skewY:5.9776,x:-43.1,y:-97},0).wait(1).to({scaleY:1.0144,skewX:14.2495,skewY:5.4574,x:-43.4,y:-97.8},0).wait(1).to({scaleY:1.012,skewX:11.9148,skewY:4.5899,x:-44,y:-99.15},0).wait(1).to({scaleY:1.0083,skewX:8.3506,skewY:3.2655,x:-44.75,y:-101.25},0).wait(1).to({scaleY:1.0046,skewX:4.7382,skewY:1.9232,x:-45.6,y:-103.5},0).wait(1).to({scaleY:1.0022,skewX:2.3849,skewY:1.0488,x:-46.1,y:-104.95},0).wait(1).to({scaleY:1.0007,skewX:1.0224,skewY:0.5425,x:-46.4,y:-105.85},0).wait(1).to({regX:-2,regY:0.1,scaleY:1,rotation:0.2588,skewX:0,skewY:0,x:-27.5,y:-126.7},0).wait(1));

	// leftArm
	this.leftarm = new lib.rightArmGirl();
	this.leftarm.name = "leftarm";
	this.leftarm.setTransform(30.55,-117.7,1,1,0,0,180,-0.1,0.3);

	this.timeline.addTween(cjs.Tween.get(this.leftarm).to({regY:0.2,scaleY:1.0028,skewX:-7.3397,skewY:176.9815,x:38.85,y:-107.2},9,cjs.Ease.cubicInOut).wait(1).to({regX:-21.1,regY:20.5,skewX:-7.252,skewY:177.0172,x:62.25,y:-88.2},0).wait(1).to({scaleY:1.0027,skewX:-7.0538,skewY:177.098,x:61.9,y:-88.45},0).wait(1).to({scaleY:1.0026,skewX:-6.696,skewY:177.2438,x:61.45,y:-88.9},0).wait(1).to({scaleY:1.0024,skewX:-6.0911,skewY:177.4903,x:60.6,y:-89.65},0).wait(1).to({scaleY:1.002,skewX:-5.0824,skewY:177.9014,x:59.05,y:-90.95},0).wait(1).to({scaleY:1.0013,skewX:-3.5424,skewY:178.5289,x:56.8,y:-92.9},0).wait(1).to({scaleY:1.0007,skewX:-1.9817,skewY:179.165,x:54.5,y:-94.95},0).wait(1).to({scaleY:1.0003,skewX:-0.9649,skewY:179.5793,x:53.05,y:-96.25},0).wait(1).to({scaleY:1.0001,skewX:-0.3762,skewY:179.8192,x:52.2,y:-97},0).wait(1).to({regX:-0.1,regY:0.3,scaleX:0.9999,scaleY:0.9999,skewX:-0.0463,skewY:179.9537,x:30.7,y:-117.7},0).wait(1));

	// Tie_01
	this.instance_1 = new lib.Tie_01("synched",0);
	this.instance_1.setTransform(19.35,-65.9,1,1,0,0,0,12.3,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleY:1.0012,skewX:-0.3056,skewY:2.4924,x:22.25,y:-61.1},9,cjs.Ease.cubicInOut).to({scaleY:1,skewX:0,skewY:0,x:19.35,y:-65.9},10,cjs.Ease.cubicInOut).wait(1));

	// Tie_02
	this.instance_2 = new lib.Tie_02("synched",0);
	this.instance_2.setTransform(23.65,-65.6,1,1,0,0,0,6,8.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:6.2,regY:8.2,scaleY:1.0012,skewX:-5.9384,skewY:-3.1962,x:27.65,y:-60.65},9,cjs.Ease.cubicInOut).to({regX:6,regY:8.3,scaleY:1,skewX:0,skewY:0,x:23.65,y:-65.6},10,cjs.Ease.cubicInOut).wait(1));

	// body
	this.body = new lib.bodyGirl();
	this.body.name = "body";
	this.body.setTransform(0,-42.3,1,1,0,0,0,0,47.2);

	this.timeline.addTween(cjs.Tween.get(this.body).to({regY:47.1,scaleX:1.0499,scaleY:0.9363,skewX:3.4252,x:3.1,y:-39.1},9,cjs.Ease.cubicInOut).wait(1).to({regX:1.1,regY:2.8,scaleX:1.0493,scaleY:0.9371,skewX:3.3841,x:6.65,y:-80.55},0).wait(1).to({scaleX:1.0479,scaleY:0.9388,skewX:3.291,x:6.5,y:-80.75},0).wait(1).to({scaleX:1.0455,scaleY:0.9419,skewX:3.123,x:6.25,y:-81},0).wait(1).to({scaleX:1.0413,scaleY:0.9472,skewX:2.8389,x:5.75,y:-81.5},0).wait(1).to({scaleX:1.0344,scaleY:0.956,skewX:2.3651,x:5.05,y:-82.4},0).wait(1).to({scaleX:1.0239,scaleY:0.9695,skewX:1.6419,x:3.85,y:-83.7},0).wait(1).to({scaleX:1.0132,scaleY:0.9831,skewX:0.9089,x:2.6,y:-85},0).wait(1).to({scaleX:1.0063,scaleY:0.992,skewX:0.4314,x:1.8,y:-85.85},0).wait(1).to({scaleX:1.0023,scaleY:0.9971,skewX:0.1549,x:1.35,y:-86.35},0).wait(1).to({regX:0,regY:47.2,scaleX:1,scaleY:1,skewX:0,x:0,y:-42.3},0).wait(1));

	// rightleg
	this.rightleg = new lib.rightlegGirl();
	this.rightleg.name = "rightleg";
	this.rightleg.setTransform(-52.2,2.85,1,1.0436,0,32.4324,29.6796,9.3,47.5);

	this.timeline.addTween(cjs.Tween.get(this.rightleg).to({scaleY:1.0055,skewX:35.6718,y:2.8},9,cjs.Ease.cubicInOut).wait(1).to({regX:7.3,regY:22.6,scaleY:1.0059,skewX:35.6329,x:-39.35,y:-18.5},0).wait(1).to({scaleY:1.007,skewX:35.5448,y:-18.6},0).wait(1).to({scaleY:1.0088,skewX:35.3859,x:-39.4,y:-18.65},0).wait(1).to({scaleY:1.012,skewX:35.1172,x:-39.45,y:-18.8},0).wait(1).to({scaleY:1.0173,skewX:34.6692,x:-39.55,y:-19},0).wait(1).to({scaleY:1.0253,skewX:33.9852,x:-39.65,y:-19.35},0).wait(1).to({scaleY:1.0334,skewX:33.292,x:-39.8,y:-19.7},0).wait(1).to({scaleY:1.0388,skewX:32.8404,x:-39.95,y:-19.9},0).wait(1).to({scaleY:1.0418,skewX:32.579,x:-40,y:-20},0).wait(1).to({regX:9.3,regY:47.5,scaleY:1.0436,skewX:32.4324,x:-52.2,y:2.85},0).wait(1));

	// leftLeg
	this.leftleg = new lib.leftlegGirl();
	this.leftleg.name = "leftleg";
	this.leftleg.setTransform(39.85,7.45,0.9515,1.0462,0,-2.2268,0,14.3,46.6);

	this.timeline.addTween(cjs.Tween.get(this.leftleg).to({regY:46.7,scaleX:1,scaleY:0.8855,skewX:6.3623,x:39.9,y:7.6},9,cjs.Ease.cubicInOut).wait(1).to({regX:9.2,regY:15.9,scaleX:0.9994,scaleY:0.8874,skewX:6.2591,x:37.75,y:-19.5},0).wait(1).to({scaleX:0.9981,scaleY:0.8918,skewX:6.0257,x:37.7,y:-19.7},0).wait(1).to({scaleX:0.9957,scaleY:0.8997,skewX:5.6043,x:37.5,y:-19.95},0).wait(1).to({scaleX:0.9917,scaleY:0.913,skewX:4.8919,x:37.2,y:-20.45},0).wait(1).to({scaleX:0.985,scaleY:0.9353,skewX:3.704,x:36.7,y:-21.15},0).wait(1).to({scaleX:0.9748,scaleY:0.9692,skewX:1.8904,x:35.85,y:-22.3},0).wait(1).to({scaleX:0.9644,scaleY:1.0036,skewX:0.0524,x:34.9,y:-23.4},0).wait(1).to({scaleX:0.9576,scaleY:1.026,skewX:-1.145,x:34.3,y:-24.1},0).wait(1).to({scaleX:0.9537,scaleY:1.0389,skewX:-1.8383,x:33.9,y:-24.5},0).wait(1).to({regX:14.3,regY:46.6,scaleX:0.9515,scaleY:1.0462,skewX:-2.2268,x:39.85,y:7.45},0).wait(1));

	// sword
	this.sword = new lib.sword();
	this.sword.name = "sword";
	this.sword.setTransform(3.05,-109.85,1,1,38.2073,0,0,116.5,5);

	this.timeline.addTween(cjs.Tween.get(this.sword).to({rotation:32.2331,x:15.1,y:-105.85},9,cjs.Ease.cubicInOut).wait(1).to({regX:94.9,regY:2.5,rotation:32.3049,x:-2,y:-119.6},0).wait(1).to({rotation:32.4672,x:-2.25,y:-119.7},0).wait(1).to({rotation:32.7603,x:-2.75,y:-120},0).wait(1).to({rotation:33.2559,x:-3.65,y:-120.45},0).wait(1).to({rotation:34.0821,x:-5.1,y:-121.3},0).wait(1).to({rotation:35.3435,x:-7.35,y:-122.45},0).wait(1).to({rotation:36.622,x:-9.6,y:-123.7},0).wait(1).to({rotation:37.4549,x:-10.95,y:-124.5},0).wait(1).to({rotation:37.9371,x:-11.85,y:-124.95},0).wait(1).to({regX:116.5,regY:5,rotation:38.2073,x:3.05,y:-109.85},0).wait(1));

	// Shadow
	this.instance_3 = new lib.CachedBmp_150();
	this.instance_3.setTransform(-85.65,-7.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(20));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.4,-216.5,237.10000000000002,236.4);


(lib.NinjaGirlcrouch = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// head
	this.head = new lib.headGirl();
	this.head.name = "head";
	this.head.setTransform(0.55,-128.2,1,1,0,0,0,-27.4,14.3);

	this.timeline.addTween(cjs.Tween.get(this.head).wait(1).to({regX:-9.3,regY:-5,rotation:0.0944,x:18.75,y:-147.1},0).wait(1).to({rotation:0.4145,x:19.15,y:-145.8},0).wait(1).to({rotation:1.0399,x:19.95,y:-143.35},0).wait(1).to({rotation:2.1074,x:21.25,y:-139.1},0).wait(1).to({rotation:3.8856,x:23.45,y:-132.05},0).wait(1).to({rotation:7.0215,x:27.25,y:-119.45},0).wait(1).to({rotation:13.0127,x:34.5,y:-95.35},0).wait(1).to({rotation:17.6803,x:39.85,y:-76.45},0).wait(1).to({regX:-27.4,regY:14.2,rotation:18.5372,x:17.55,y:-60.5},0).to({regX:-27.2,regY:14.1,scaleX:0.9985,scaleY:0.9985,rotation:16.8532,x:17.65,y:-66.4},15,cjs.Ease.cubicInOut).to({regX:-27.4,regY:14.3,scaleX:1,scaleY:1,rotation:0,x:0.55,y:-128.2},10,cjs.Ease.cubicInOut).wait(1));

	// Layer_2
	this.instance = new lib.Head_Tie("synched",0);
	this.instance.setTransform(-17.15,-150.25,1,1,0,0,0,41.8,28.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:19.4,regY:19.1,rotation:0.5159,x:-39.3,y:-159.75},0).wait(1).to({rotation:2.2664,x:-38.6,y:-159.4},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:5.6864,x:-37.15,y:-158.7},0).wait(1).to({scaleX:0.9998,scaleY:0.9998,rotation:11.5233,x:-34.45,y:-157.4},0).wait(1).to({regX:41.8,regY:28.6,scaleX:0.9996,scaleY:0.9996,rotation:21.2466,x:-12.1,y:-137.85},0).wait(1).to({regX:19.4,regY:19.1,scaleX:0.9997,scaleY:0.9997,rotation:23.1199,x:-24.9,y:-145.3},0).wait(1).to({scaleX:0.9998,scaleY:0.9998,rotation:26.6989,x:-16.1,y:-127.05},0).wait(1).to({scaleX:1,scaleY:1,rotation:29.4872,x:-9.2,y:-112.75},0).wait(1).to({regX:41.7,regY:28.7,rotation:29.9992,x:6.6,y:-90.75},0).to({regX:41.6,regY:28.6,scaleX:0.9986,scaleY:0.9986,rotation:-13.1489,y:-91.2},5,cjs.Ease.cubicOut).wait(1).to({regX:19.4,regY:19.1,scaleX:0.9988,scaleY:0.9988,rotation:-10.8614,x:-16.9,y:-96.5},0).wait(1).to({scaleX:0.9991,scaleY:0.9991,rotation:-7.5326,x:-16.6,y:-98.2},0).wait(1).to({scaleX:0.9993,scaleY:0.9993,rotation:-3.5903,x:-16.1,y:-100.1},0).wait(1).to({scaleX:0.9996,scaleY:0.9996,rotation:-0.336,x:-15.6,y:-101.65},0).wait(1).to({scaleX:0.9998,scaleY:0.9998,rotation:1.8455,x:-15.2,y:-102.75},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:3.2454,x:-15,y:-103.4},0).wait(1).to({scaleX:1,scaleY:1,rotation:4.1281,x:-14.75,y:-103.8},0).wait(1).to({rotation:4.6564,x:-14.7,y:-104.05},0).wait(1).to({rotation:4.9292,x:-14.65,y:-104.15},0).wait(1).to({regX:41.7,regY:28.6,rotation:5.0099,x:6.7,y:-92.85},0).wait(1).to({regX:19.4,regY:19.1,rotation:3.7319,x:-15.3,y:-104.65},0).wait(1).to({rotation:0.5709,x:-16.7,y:-105.5},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-5.6123,x:-19.3,y:-107.2},0).wait(1).to({regX:41.7,regY:28.6,scaleX:0.9998,scaleY:0.9998,rotation:-17.1445,x:0.7,y:-107.65},0).wait(1).to({regX:19.4,regY:19.1,rotation:-11.4133,x:-29,y:-126.8},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:-5.7748,x:-34.3,y:-143.1},0).wait(1).to({scaleX:1,scaleY:1,rotation:-2.5775,x:-37.15,y:-152.3},0).wait(1).to({rotation:-0.9525,x:-38.6,y:-157},0).wait(1).to({rotation:-0.205,x:-39.25,y:-159.15},0).wait(1).to({regX:41.8,regY:28.7,rotation:0,x:-17.15,y:-150.25},0).wait(1));

	// right_arm
	this.rightarm = new lib.rightArmGirl();
	this.rightarm.name = "rightarm";
	this.rightarm.setTransform(-27.45,-126.7,1,1,0,0,0,-2,0.3);

	this.timeline.addTween(cjs.Tween.get(this.rightarm).to({regX:-2.2,regY:-0.1,scaleX:0.9999,scaleY:1.0039,skewX:1.4528,skewY:6.5314,x:-9.55,y:-84.55},9,cjs.Ease.cubicInOut).to({regX:-2.3,regY:-0.2,scaleX:0.9995,scaleY:1.0037,skewX:9.5379,skewY:14.7469,x:-9.6,y:-84.7},15,cjs.Ease.cubicInOut).to({regX:-2,regY:0.1,scaleX:1,scaleY:1,rotation:0.2588,skewX:0,skewY:0,x:-27.5,y:-126.7},10,cjs.Ease.cubicInOut).wait(1));

	// leftArm
	this.leftarm = new lib.rightArmGirl();
	this.leftarm.name = "leftarm";
	this.leftarm.setTransform(30.55,-117.7,1,1,0,0,180,-0.1,0.3);

	this.timeline.addTween(cjs.Tween.get(this.leftarm).to({regY:0.1,scaleY:1.0001,skewX:70.8189,skewY:251.9803,x:46.25,y:-85.2},9,cjs.Ease.cubicInOut).to({regX:-0.2,scaleX:0.9989,scaleY:0.9991,skewX:64.202,skewY:245.2443,y:-85.15},15,cjs.Ease.cubicInOut).to({regX:-0.1,regY:0.3,scaleX:0.9999,scaleY:0.9999,skewX:-0.0463,skewY:179.9537,x:30.7,y:-117.7},10,cjs.Ease.cubicInOut).wait(1));

	// Tie_01
	this.instance_1 = new lib.Tie_01("synched",0);
	this.instance_1.setTransform(19.35,-65.9,1,1,0,0,0,12.3,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:12.2,rotation:2.4924,x:15.65,y:-42.65},9,cjs.Ease.cubicInOut).to({scaleX:0.9999,scaleY:0.9999,rotation:2.3107,x:15.7,y:-42.7},15,cjs.Ease.cubicInOut).to({regX:12.3,scaleX:1,scaleY:1,rotation:0,x:19.35,y:-65.9},10,cjs.Ease.cubicInOut).wait(1));

	// Tie_02
	this.instance_2 = new lib.Tie_02("synched",0);
	this.instance_2.setTransform(23.65,-65.6,1,1,0,0,0,6,8.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:6.1,regY:8.2,rotation:-3.1962,x:20.1,y:-42.45},9,cjs.Ease.cubicInOut).to({scaleX:0.9998,scaleY:0.9998,rotation:-3.0497,y:-42.4},15,cjs.Ease.cubicInOut).to({regX:6,regY:8.3,scaleX:1,scaleY:1,rotation:0,x:23.65,y:-65.6},10,cjs.Ease.cubicInOut).wait(1));

	// body
	this.body = new lib.bodyGirl();
	this.body.name = "body";
	this.body.setTransform(0,-42.3,1,1,0,0,0,0,47.2);

	this.timeline.addTween(cjs.Tween.get(this.body).to({regX:0.1,regY:47.1,scaleX:1.1134,scaleY:0.8722,skewX:7.9919,x:3.15,y:-20.55},9,cjs.Ease.cubicInOut).to({regY:47,scaleX:1.111,scaleY:0.9138,skewX:7.814,x:3.2,y:-20.6},15,cjs.Ease.cubicInOut).to({regX:0,regY:47.2,scaleX:1,scaleY:1,skewX:0,x:0,y:-42.3},10,cjs.Ease.cubicInOut).wait(1));

	// rightleg
	this.rightleg = new lib.rightlegGirl();
	this.rightleg.name = "rightleg";
	this.rightleg.setTransform(-52.2,2.85,1,1.0436,0,32.4324,29.6796,9.3,47.5);

	this.timeline.addTween(cjs.Tween.get(this.rightleg).to({scaleY:1.084,skewX:45.6131,y:2.8},9,cjs.Ease.cubicInOut).to({regY:47.4,scaleX:0.9985,scaleY:1.07,skewX:43.1821,skewY:29.5924},15,cjs.Ease.cubicInOut).to({regY:47.5,scaleX:1,scaleY:1.0436,skewX:32.4324,skewY:29.6796,y:2.85},10,cjs.Ease.cubicInOut).wait(1));

	// leftLeg
	this.leftleg = new lib.leftlegGirl();
	this.leftleg.name = "leftleg";
	this.leftleg.setTransform(39.85,7.45,0.9515,1.0462,0,-2.2268,0,14.3,46.6);

	this.timeline.addTween(cjs.Tween.get(this.leftleg).to({regX:14.5,regY:46.5,scaleX:1.0657,scaleY:0.8663,skewX:-8.7155,x:40,y:7.4},9,cjs.Ease.cubicInOut).to({regX:14.6,regY:46.4,scaleX:1.0656,scaleY:0.8604,skewX:-5.6445,x:40.1,y:7.45},15,cjs.Ease.cubicInOut).to({regX:14.3,regY:46.6,scaleX:0.9515,scaleY:1.0462,skewX:-2.2268,x:39.85},10,cjs.Ease.cubicInOut).wait(1));

	// sword
	this.sword = new lib.sword();
	this.sword.name = "sword";
	this.sword.setTransform(3.05,-109.85,1,1,38.2073,0,0,116.5,5);

	this.timeline.addTween(cjs.Tween.get(this.sword).to({regX:116.4,scaleX:0.9999,scaleY:0.9999,rotation:20.5483,x:26.85,y:-69.15},9,cjs.Ease.cubicInOut).to({regX:116.3,scaleX:0.9988,scaleY:0.9988,rotation:19.0854,x:26.9,y:-71.45},15,cjs.Ease.cubicInOut).to({regX:116.5,scaleX:1,scaleY:1,rotation:38.2073,x:3.05,y:-109.85},10,cjs.Ease.cubicInOut).wait(1));

	// Shadow
	this.instance_3 = new lib.CachedBmp_122();
	this.instance_3.setTransform(-85.65,-7.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(35));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-122.5,-216.5,255.9,236.4);


(lib.NinjaGirlattack = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_6
	this.instance = new lib.CachedBmp_112();
	this.instance.setTransform(-237.15,-318.7,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_113();
	this.instance_1.setTransform(119.9,-178.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},18).to({state:[{t:this.instance_1}]},1).to({state:[]},1).wait(7));

	// Layer_5
	this.instance_2 = new lib.CachedBmp_114();
	this.instance_2.setTransform(-250.9,-325.65,0.5,0.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(18).to({_off:false},0).to({_off:true},1).wait(8));

	// head
	this.head = new lib.headGirl();
	this.head.name = "head";
	this.head.setTransform(83.95,-86.5,1,1,0,0,0,56,56);

	this.timeline.addTween(cjs.Tween.get(this.head).wait(1).to({regX:-9.3,regY:-5,x:17.65,y:-148.6},0).wait(1).to({x:17,y:-149.35},0).wait(1).to({regX:56,regY:56,x:82.15,y:-88.6},0).wait(1).to({regX:-9.3,regY:-5,rotation:5.8132,x:19.6,y:-144.3},0).wait(1).to({rotation:10.5205,x:22.25,y:-139.55},0).wait(1).to({rotation:14.192,x:24.65,y:-135.55},0).wait(1).to({regX:56,regY:56,rotation:16.959,x:71.15,y:-54.85},0).wait(1).to({regX:-9.3,regY:-5,scaleX:0.9999,scaleY:0.9999,rotation:14.6837,x:23.05,y:-133.95},0).wait(1).to({scaleX:0.9997,scaleY:0.9997,rotation:7.5062,x:12.9,y:-138.6},0).wait(1).to({regX:56,regY:56,scaleX:0.9991,scaleY:0.9991,rotation:-5.1452,x:67.65,y:-89.45},0).to({regY:55.9,rotation:-7.3814,x:63.1,y:-92.6},3,cjs.Ease.get(0.98)).to({regX:56.1,rotation:-3.1466,x:66.9,y:-86.45},3,cjs.Ease.get(-1)).wait(1).to({rotation:1.3075,x:70.8,y:-80},0).wait(1).to({regX:56,rotation:24.3499,x:91.65,y:-17.65},0).wait(3).to({scaleX:0.9998,scaleY:0.9998,rotation:4.8686,x:86,y:-72},4).to({_off:true},1).wait(1));

	// Layer_2
	this.instance_3 = new lib.Head_Tie("synched",0);
	this.instance_3.setTransform(-17.15,-150.25,1,1,0,0,0,41.8,28.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:19.4,regY:19.1,skewX:0.9651,skewY:0.5592,x:-40.25,y:-161.15},0).wait(1).to({skewX:1.5746,skewY:0.9123,x:-40.7,y:-162},0).wait(1).to({regX:41.8,regY:28.5,skewX:1.7655,skewY:1.0229,x:-18.75,y:-152.3},0).wait(1).to({regX:19.4,regY:19.1,scaleX:1.0008,skewX:9.4522,skewY:10.3034,x:-35.6,y:-162.5},0).wait(1).to({scaleX:1.0015,skewX:15.6762,skewY:17.8178,x:-30.9,y:-162.6},0).wait(1).to({scaleX:1.0019,skewX:20.5305,skewY:23.6786,x:-27.05,y:-162.55},0).wait(1).to({regX:41.6,regY:28.6,scaleX:1.0023,skewX:24.1887,skewY:28.0952,x:-8.15,y:-143.3},0).wait(1).to({regX:19.4,regY:19.1,scaleX:1.0021,scaleY:0.9999,skewX:21.8413,skewY:25.7273,x:-27.85,y:-161.6},0).wait(1).to({scaleX:1.0016,scaleY:0.9995,skewX:14.4364,skewY:18.2577,x:-40,y:-158.85},0).wait(1).to({regX:41.5,regY:28.4,scaleX:1.0007,scaleY:0.9988,skewX:1.3841,skewY:5.0913,x:-38.75,y:-142},0).to({scaleY:0.9987,skewX:-0.8535,skewY:2.8528,x:-45.2,y:-140.9},3,cjs.Ease.get(0.98)).to({scaleY:0.9988,skewX:3.3817,skewY:7.0877,x:-37.55,y:-142.6},3,cjs.Ease.get(-1)).wait(1).to({regX:41.4,scaleY:0.9987,skewX:7.8362,skewY:11.5421,x:-29.05,y:-144.15},0).wait(1).to({regX:41.5,scaleY:0.9988,skewX:30.8785,skewY:34.5852,x:25,y:-115.7},0).wait(3).to({skewX:30.8785},0).to({regX:41.4,scaleX:1.0001,scaleY:0.9997,skewX:6.1756,skewY:6.9159,x:-8.45,y:-142.8},4).to({_off:true},1).wait(1));

	// right_arm
	this.rightarm = new lib.rightArmGirl();
	this.rightarm.name = "rightarm";
	this.rightarm.setTransform(-27.45,-126.7,1,1,0,0,0,-2,0.3);

	this.timeline.addTween(cjs.Tween.get(this.rightarm).to({regX:-2.1,regY:0.1,scaleX:0.9999,scaleY:1.0355,skewX:85.2425,skewY:70.1927,x:-12.75,y:-126.9},5,cjs.Ease.quartIn).wait(1).to({regX:-21.1,regY:20.5,scaleX:1.0058,scaleY:1.0298,skewX:86.3262,skewY:72.6808,x:-39.45,y:-143.65},0).wait(1).to({scaleX:1.0345,scaleY:1.0018,skewX:91.6638,skewY:84.9359,x:-35.5,y:-146.6},0).wait(1).to({regX:-2.1,regY:0.2,scaleX:1.0621,scaleY:0.9749,skewX:96.8119,skewY:96.7558,x:-13.85,y:-126.1},0).to({regX:-2.5,regY:0.4,scaleX:1.0667,scaleY:0.9713,skewX:97.7757,skewY:98.5395,x:-25.8,y:-126.2},1).to({regX:-2.4,regY:0.3,scaleX:1.3286,skewX:90.8236,skewY:93.3092,x:-41.85,y:-132.7},1,cjs.Ease.get(-1)).to({regX:-2.5,skewX:80.6056,skewY:83.0901,x:-50.85,y:-130.95},3,cjs.Ease.get(0.98)).to({regY:0.4,scaleX:1.3285,skewX:78.1313,skewY:80.616,x:-46,y:-132.3},3,cjs.Ease.get(-1)).wait(1).to({regX:-2.6,scaleY:0.9712,skewX:105.295,skewY:107.7788,x:-25.4,y:-135.95},0).wait(1).to({regX:-2.1,regY:0.8,scaleX:1.3826,scaleY:0.9752,skewX:281.2822,skewY:275.8952,x:36.85,y:-83.65},0).wait(3).to({scaleX:1.0764,scaleY:0.995,skewX:344.4647,skewY:343.3887,x:-14.6,y:-117.95},4).to({_off:true},1).wait(1));

	// sword
	this.sword = new lib.sword();
	this.sword.name = "sword";
	this.sword.setTransform(-42.3,-182,0.9957,0.9957,0,138.8776,-41.1224,10.5,-0.6);
	this.sword._off = true;

	this.timeline.addTween(cjs.Tween.get(this.sword).wait(8).to({_off:false},0).wait(1).to({regX:10.7,skewX:89.7919,skewY:-90.2081,x:-48.05,y:-177.6},0).wait(1).to({regX:10.6,regY:-0.7,skewX:13.6291,skewY:-166.3709,x:-77.4,y:-202.55},0).to({regX:10.7,skewX:-10.7902,skewY:-190.7902,x:-98.25,y:-193.25},3,cjs.Ease.get(0.98)).to({regX:10.8,regY:-0.8,scaleX:0.9956,scaleY:0.9956,skewX:-13.2649,skewY:-193.2649,x:-96.05,y:-192.6},3,cjs.Ease.get(-1)).wait(1).to({skewX:0.4101,skewY:-179.5899,x:-47.45,y:-208.1},0).wait(1).to({regY:-0.6,skewX:-170.5696,skewY:-350.5696,x:79.65,y:-8.2},0).wait(3).to({skewY:-350.5696},0).wait(1).to({skewX:-181.8004,skewY:-361.8004,x:42.9,y:-15.55},0).wait(1).to({skewX:-186.5051,skewY:-366.5051,x:6.2,y:-31.75},0).wait(1).to({x:-22,y:-45.7},0).to({_off:true},1).wait(2));

	// leftArm
	this.leftarm = new lib.rightArmGirl();
	this.leftarm.name = "leftarm";
	this.leftarm.setTransform(30.55,-117.7,1,1,0,0,180,-0.1,0.3);

	this.timeline.addTween(cjs.Tween.get(this.leftarm).to({regY:0.2,scaleY:1.0028,skewX:-75.8119,skewY:108.5096,x:38.8,y:-107.2},4,cjs.Ease.cubicIn).to({regY:0.4,scaleX:0.9985,scaleY:1.0015,skewX:-182.3525,skewY:173.3689,x:9.4,y:-129.55},1,cjs.Ease.get(-1)).wait(1).to({regX:-21.1,regY:20.5,skewX:-196.8349,skewY:158.8867,x:22.85,y:-156.6},0).wait(1).to({scaleX:0.9984,scaleY:1.0014,skewX:-223.0432,skewY:132.6786,x:9.15,y:-160.3},0).wait(1).to({regX:-0.2,regY:0.1,skewX:-269.3408,skewY:86.3812,x:8.05,y:-131},0).wait(1).to({regX:-21.1,regY:20.5,scaleX:1.0256,scaleY:1.0015,skewX:-268.6621,skewY:87.3096,x:-19.4,y:-155.25},0).wait(1).to({regX:-0.4,regY:0.4,scaleX:1.1378,skewX:-265.863,skewY:91.1381,x:-23,y:-143.25},0).to({regX:-0.5,skewX:-276.082,skewY:80.9192,x:-34.2,y:-144.65},3,cjs.Ease.get(0.98)).to({scaleX:1.1377,skewX:-278.5554,skewY:78.4443,x:-29.85,y:-146.7},3,cjs.Ease.get(-1)).wait(1).to({regX:-0.6,skewX:-251.3922,skewY:105.6078,x:-4.5,y:-141.4},0).wait(1).to({regX:-0.4,regY:0.6,scaleX:1.1051,scaleY:1.0326,skewX:-81.1766,skewY:274.488,x:42.55,y:-76.25},0).wait(3).to({skewX:-81.1766},0).to({regX:-0.1,regY:0.3,scaleX:0.9999,scaleY:0.9999,skewX:1.2075,skewY:181.2075,x:38.05,y:-73.6},1).wait(1).to({skewX:10.1639,skewY:190.1639,x:30.7,y:-88.3},0).to({regY:0.2,skewX:3.3568,skewY:183.3568,x:30.8,y:-108.1},2).to({_off:true},1).wait(1));

	// Tie_01
	this.instance_4 = new lib.Tie_01("synched",0);
	this.instance_4.setTransform(19.35,-65.9,1,1,0,0,0,12.3,7.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({scaleY:1.0012,skewX:-0.3056,skewY:2.4924,x:22.25,y:-61.1},5,cjs.Ease.cubicInOut).wait(1).to({regX:7.9,regY:25.6,skewX:-0.4418,skewY:2.3043,x:17.25,y:-43.7},0).wait(1).to({scaleY:1.0011,skewX:-0.7786,skewY:1.839,x:15.65,y:-44},0).wait(1).to({scaleY:1.001,skewX:-1.4375,skewY:0.9287,x:12.5,y:-44.65},0).wait(1).to({scaleY:1.0009,skewX:-2.6664,skewY:-0.769,x:6.65,y:-45.8},0).wait(1).to({regX:12.3,regY:7.8,scaleX:0.9999,scaleY:1.0006,skewX:-4.7545,skewY:-3.6538,x:-0.55,y:-65.85},0).to({regY:7.9,scaleY:1.0005,skewX:-0.0384,skewY:1.0624,x:-3.55,y:-65.75},3,cjs.Ease.get(0.98)).to({scaleY:1.0006,skewX:0.2779,skewY:1.3781,x:-1.1,y:-64.3},3,cjs.Ease.get(-1)).wait(1).to({skewX:4.7317,skewY:5.8323,x:1.3,y:-63.6},0).wait(1).to({regX:12.4,regY:7.8,scaleY:1.0005,skewX:37.3676,skewY:38.4675,x:24.75,y:-51.15},0).to({regX:12.5,skewX:17.4028,skewY:18.503,x:23.05,y:-52.15},3,cjs.Ease.get(-1)).to({scaleY:1.0001,skewX:3.4806,skewY:3.7,x:20.2,y:-63.15},4).to({_off:true},1).wait(1));

	// Tie_02
	this.instance_5 = new lib.Tie_02("synched",0);
	this.instance_5.setTransform(23.65,-65.6,1,1,0,0,0,6,8.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({regX:6.2,regY:8.2,scaleY:1.0012,skewX:-5.9384,skewY:-3.1962,x:27.65,y:-60.65},5,cjs.Ease.cubicInOut).wait(1).to({regX:10,regY:28.8,scaleY:1.0011,skewX:-6.1396,skewY:-3.4421,x:32.95,y:-40.5},0).wait(1).to({skewX:-6.6372,skewY:-4.0502,x:31.35,y:-40.9},0).wait(1).to({scaleY:1.001,skewX:-7.6106,skewY:-5.2399,x:28.2,y:-41.75},0).wait(1).to({scaleY:1.0008,skewX:-9.426,skewY:-7.4586,x:22.45,y:-43.3},0).wait(1).to({regX:6.2,regY:8.1,scaleX:0.9999,scaleY:1.0004,skewX:-12.5108,skewY:-11.2287,x:4.5,y:-65.45},0).to({skewX:-2.8055,skewY:-1.5251,x:1.45},3,cjs.Ease.get(0.98)).to({regX:6.1,skewX:-2.4889,skewY:-1.2085,x:3.8,y:-63.95},3,cjs.Ease.get(-1)).wait(1).to({regX:6,skewX:1.965,skewY:3.2456,x:6.05,y:-62.9},0).wait(1).to({regX:6.2,skewX:19.6555,skewY:20.9361,x:29.15,y:-48.85},0).to({regX:6.3,skewX:8.193,skewY:9.474,x:29.5,y:-51.5},3,cjs.Ease.get(-1)).to({scaleX:1,scaleY:1,skewX:1.6403,skewY:1.8958,x:24.95,y:-62.8},4).to({_off:true},1).wait(1));

	// body
	this.body = new lib.bodyGirl();
	this.body.name = "body";
	this.body.setTransform(0,-42.3,1,1,0,0,0,0,47.2);

	this.timeline.addTween(cjs.Tween.get(this.body).to({regY:47.1,scaleX:1.0499,scaleY:0.9363,skewX:3.4252,x:3.1,y:-39.1},5,cjs.Ease.cubicInOut).wait(1).to({regX:1.1,regY:2.8,scaleX:1.0493,scaleY:0.937,skewX:2.859,skewY:-0.5218,x:5.7,y:-80.55},0).wait(1).to({scaleX:1.0479,scaleY:0.9388,skewX:1.5787,skewY:-1.7014,x:3.4,y:-80.65},0).wait(1).to({scaleX:1.0455,scaleY:0.9419,skewX:-0.7325,skewY:-3.831,x:-0.7,y:-80.8},0).wait(1).to({scaleX:1.0413,scaleY:0.9471,skewX:-4.6404,skewY:-7.4317,x:-7.8,y:-80.95},0).wait(1).to({regX:0,regY:47.1,scaleX:1.0344,scaleY:0.9558,skewX:-11.1564,skewY:-13.4356,x:-12.55,y:-38.9},0).to({regX:-0.1,skewX:-13.3938,skewY:-15.6723,x:-15.1,y:-38.8},3,cjs.Ease.get(0.98)).to({scaleX:1.0343,skewX:-9.1586,skewY:-11.4374,y:-38.6},3,cjs.Ease.get(-1)).wait(1).to({skewX:-4.7032,skewY:-6.982,x:-14.65,y:-38.75},0).wait(1).to({regY:47,scaleX:1.0763,scaleY:0.9766,skewX:20.34,skewY:8.2806,x:3.2,y:-32.85},0).wait(3).to({scaleX:1.0152,scaleY:0.9953,skewX:4.0679,skewY:1.6562,x:0.55,y:-40.45},4).to({_off:true},1).wait(1));

	// rightleg
	this.rightleg = new lib.rightlegGirl();
	this.rightleg.name = "rightleg";
	this.rightleg.setTransform(-52.2,2.85,1,1.0436,0,32.4324,29.6796,9.3,47.5);

	this.timeline.addTween(cjs.Tween.get(this.rightleg).to({scaleY:1.0055,skewX:35.6718,y:2.8},5,cjs.Ease.cubicInOut).wait(1).to({regX:7.3,regY:22.6,scaleY:1.006,skewX:35.1591,skewY:29.6762,x:-39.5,y:-18.65},0).wait(1).to({scaleX:0.9998,scaleY:1.0073,skewX:34,skewY:29.6684,x:-39.95,y:-19},0).wait(1).to({scaleX:0.9996,scaleY:1.0095,skewX:31.9075,skewY:29.6545,x:-40.65,y:-19.5},0).wait(1).to({scaleX:0.9992,scaleY:1.0133,skewX:28.3695,skewY:29.6309,x:-42.05,y:-20.35},0).wait(1).to({regX:9.2,regY:47.5,scaleX:0.9986,scaleY:1.0197,skewX:22.4701,skewY:29.5915,x:-52.3,y:2.9},0).to({regX:9.1,scaleY:1.0689,skewX:10.7766,x:-52.35},3,cjs.Ease.get(0.98)).wait(5).to({regX:9,regY:47.3,scaleY:1.0217,skewX:37.5797,y:2.65},0).wait(3).to({regX:8.8,scaleX:0.9997,scaleY:1.0391,skewX:33.4632,skewY:29.6618,x:-52.4,y:2.8},4).to({_off:true},1).wait(1));

	// leftLeg
	this.leftleg = new lib.leftlegGirl();
	this.leftleg.name = "leftleg";
	this.leftleg.setTransform(39.85,7.45,0.9515,1.0462,0,-2.2268,0,14.3,46.6);

	this.timeline.addTween(cjs.Tween.get(this.leftleg).to({regY:46.7,scaleX:1,scaleY:0.8855,skewX:6.3623,x:39.9,y:7.6},5,cjs.Ease.cubicInOut).wait(1).to({regX:9.2,regY:15.9,scaleX:0.9994,scaleY:0.8886,skewX:5.5497,x:37.45,y:-19.65},0).wait(1).to({scaleX:0.9981,scaleY:0.8955,skewX:3.7126,x:36.65,y:-19.9},0).wait(1).to({scaleX:0.9957,scaleY:0.908,skewX:0.3962,x:35,y:-20.35},0).wait(1).to({scaleX:0.9917,scaleY:0.9291,skewX:-5.2114,x:32.25,y:-20.9},0).wait(1).to({regX:14.3,regY:46.6,scaleX:0.985,scaleY:0.9642,skewX:-14.5614,x:39.9,y:7.55},0).to({regX:14.6,scaleY:1.0817,skewX:-19.0282,x:40.15,y:7.6},3,cjs.Ease.get(0.98)).wait(5).to({scaleY:1.0495,skewX:-12.9971},0).wait(3).to({regX:14.7,scaleX:0.9582,scaleY:1.0468,skewX:-4.3797,x:40.05},4).to({_off:true},1).wait(1));

	// sword
	this.sword_1 = new lib.sword();
	this.sword_1.name = "sword_1";
	this.sword_1.setTransform(3.05,-109.85,1,1,38.2073,0,0,116.5,5);

	this.timeline.addTween(cjs.Tween.get(this.sword_1).to({rotation:28.9888,x:15.15,y:-105.95},5,cjs.Ease.cubicInOut).to({regX:10.4,regY:-0.7,scaleX:0.9985,scaleY:0.9985,rotation:19.614,x:-71.4,y:-167.4},1,cjs.Ease.get(-1)).to({regX:10.3,scaleX:0.9976,scaleY:0.9976,rotation:3.8187,x:-68.1,y:-178.3},1).to({_off:true},1).wait(17).to({_off:false,regX:116.4,regY:5,scaleX:1,scaleY:1,rotation:15.2331,x:32.35,y:-102.55},0).to({_off:true},1).wait(1));

	// Layer_7
	this.instance_6 = new lib.CachedBmp_115();
	this.instance_6.setTransform(78.7,-22.5,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_116();
	this.instance_7.setTransform(58.75,-29.65,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_117();
	this.instance_8.setTransform(14.6,-39.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},18).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[]},1).to({state:[]},4).wait(2));

	// Shadow
	this.instance_9 = new lib.CachedBmp_150();
	this.instance_9.setTransform(-85.65,-7.7,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_156();
	this.instance_10.setTransform(-85.65,-7.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).to({state:[{t:this.instance_10}]},25).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-307.9,-388.7,772.5,498.29999999999995);


// stage content:
(lib.test2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(621));

	// Katman_4
	this.title_txt = new cjs.Text("NINJA GIRL", "40px 'ui-font'");
	this.title_txt.name = "title_txt";
	this.title_txt.lineHeight = 51;
	this.title_txt.parent = this;
	this.title_txt.setTransform(138.05,61.4);

	this.btn = new lib.button();
	this.btn.name = "btn";
	this.btn.setTransform(251.9,442,1,1,0,0,0,-3.1,-2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.btn},{t:this.title_txt}]}).wait(621));

	// Katman_1
	this.instance = new lib.Bunny("synched",0);
	this.instance.setTransform(259.35,410.7,0.5305,0.5305,0,0,0,16.7,30.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(51).to({_off:false},0).to({_off:true},255).wait(315));

	// Katman_2
	this.instance_1 = new lib.NinjaGirlIdle("synched",0);
	this.instance_1.setTransform(240.25,266.3,0.7345,0.7345,0,0,0,-17.5,-103.5);

	this.instance_2 = new lib.NinjaGirlcrouch("synched",0);
	this.instance_2.setTransform(240.25,266.3,0.7345,0.7345,0,0,0,-17.5,-103.5);

	this.instance_3 = new lib.NinjaGirlwalk("synched",0);
	this.instance_3.setTransform(240.25,266.3,0.7345,0.7345,0,0,0,-17.5,-103.5);

	this.instance_4 = new lib.NinjaGirlattack("synched",0,false);
	this.instance_4.setTransform(240.25,266.3,0.7345,0.7345,0,0,0,-17.5,-103.5);

	this.instance_5 = new lib.NinjaGirljump("synched",0);
	this.instance_5.setTransform(240.25,266.3,0.7345,0.7345,0,0,0,-17.5,-103.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},59).to({state:[{t:this.instance_3}]},36).to({state:[{t:this.instance_4}]},117).to({state:[{t:this.instance_1}]},26).to({state:[{t:this.instance_1}]},60).to({state:[{t:this.instance_2}]},59).to({state:[{t:this.instance_3}]},36).to({state:[{t:this.instance_4}]},117).to({state:[{t:this.instance_1}]},26).to({state:[{t:this.instance_5}]},21).wait(64));

	// Katman_3
	this.instance_6 = new lib.Bunny("synched",0);
	this.instance_6.setTransform(315.95,285.85,0.3293,0.3293,0,0,180,16.4,30.9);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(184).to({_off:false},0).to({_off:true},297).wait(140));

	// Katman_5
	this.instance_7 = new lib.rock1("synched",0);
	this.instance_7.setTransform(39.6,438.05,0.2009,0.37,0,-16.835,177.1359,47.9,1.1);
	this.instance_7.alpha = 0.25;

	this.instance_8 = new lib.rock1("synched",0);
	this.instance_8.setTransform(22.45,337.15,0.2287,0.5706,0,7.7704,-171.1158,48.1,1.3);
	this.instance_8.alpha = 0.25;

	this.instance_9 = new lib.CachedBmp_85();
	this.instance_9.setTransform(9.35,323.75,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_84();
	this.instance_10.setTransform(131.85,354.4,0.5,0.5);

	this.instance_11 = new lib.rock1("synched",0);
	this.instance_11.setTransform(114.45,394.9,0.2951,2.6145,0,71.7506,0,112.2,22.9);
	this.instance_11.alpha = 0.25;

	this.instance_12 = new lib.CachedBmp_83();
	this.instance_12.setTransform(363.9,405.7,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_82();
	this.instance_13.setTransform(33.3,427.85,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_81();
	this.instance_14.setTransform(459.85,306.65,0.5,0.5);

	this.instance_15 = new lib.rock2("synched",0);
	this.instance_15.setTransform(463.65,310.85,0.3634,0.3633,0,0,1.2967,9.1,1.1);
	this.instance_15.alpha = 0.25;

	this.instance_16 = new lib.CachedBmp_80();
	this.instance_16.setTransform(374.25,409.35,0.5,0.5);

	this.instance_17 = new lib.rock1("synched",0);
	this.instance_17.setTransform(391.95,432,0.3633,1.024,0,36.9109,0,48.1,1);
	this.instance_17.alpha = 0.25;

	this.instance_18 = new lib.terra1("synched",0);
	this.instance_18.setTransform(222.7,510.6,0.3633,1.0185,0,0,0,998.4,157.8);
	this.instance_18.alpha = 0.5898;

	this.instance_19 = new lib.terra1("synched",0);
	this.instance_19.setTransform(238.7,371.35,0.3634,0.4361,0,0,-0.5029,998.2,158);
	this.instance_19.alpha = 0.5898;

	this.instance_20 = new lib.CachedBmp_79();
	this.instance_20.setTransform(-107.3,288.05,0.5,0.5);

	this.instance_21 = new lib.backgroundImage("synched",0);
	this.instance_21.setTransform(-133.25,147.1,1.1666,1.1666,0,0,0,647.4,123.6);

	this.instance_22 = new lib.groundplane("synched",0);
	this.instance_22.setTransform(291,419.75,0.5694,1.2831,0,0,0,691.9,113);
	this.instance_22.alpha = 0.7695;

	this.instance_23 = new lib.CachedBmp_78();
	this.instance_23.setTransform(-108.75,288.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7}]}).wait(621));

	// Katman_6
	this.instance_24 = new lib.bg();
	this.instance_24.setTransform(252.05,252.05,1,1,0,0,0,252.1,252.1);

	this.title_txt_1 = new cjs.Text("NINJA GIRL", "40px 'uni-font'");
	this.title_txt_1.name = "title_txt_1";
	this.title_txt_1.lineHeight = 51;
	this.title_txt_1.parent = this;
	this.title_txt_1.setTransform(128,81.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.title_txt_1},{t:this.instance_24}]}).wait(621));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(56.6,250,655.3,360.9);
// library properties:
lib.properties = {
	id: '970A9189C42E104AB20AD7ACF63D34F4',
	width: 500,
	height: 500,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:require("./images/CachedBmp_152.png"), id:"CachedBmp_152"},
		{src:require("./images/CachedBmp_103.png"), id:"CachedBmp_103"},
		{src:require("./images/test2_atlas_1.png"), id:"test2_atlas_1"},
		{src:require("./images/test2_atlas_2.png"), id:"test2_atlas_2"},
		{src:require("./images/test2_atlas_3.png"), id:"test2_atlas_3"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['970A9189C42E104AB20AD7ACF63D34F4'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
//var createjs, AdobeAn;
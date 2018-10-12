module.exports.loop = function () {

    //MEMORY CLEANUP
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }

    //RESPAWNS
    for (let spawnName in Game.spawns) {
        // run spawn logic
        Game.spawns[spawnName].spawnCreepsIfNecessary();
    }
    Game.spawns['Spawn1'].room.visual.clear();
    for (let name in Game.creeps) {
        // run creep logic
        Game.creeps[name].runRole();
    }
    spawning = Game.spawns.Spawn1.spawning;
    if(spawning != undefined && SHOWTXT){
        Game.spawns.Spawn1.room.visual.text(spawning.name + " (" + (100 - Math.floor(spawning.remainingTime * 100 / spawning.needTime)) + "%" + ")", 20, 15,{font:0.6, align: 'left'});
    }
}

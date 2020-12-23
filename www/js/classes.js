class Fighter extends Character {
  constructor(name, type) {
    this.name = name;
	this.uid = Math.random().toString(36).substr(2, 9);
	this.type = type;
	this.description = '';
	this.karma = 0;
	this.fame = 0;
	this.position = 0;
	this.str = 0;
	this.int = 0;
	this.dex = 0;
	this.hits = 0;
	this.mana = 0;
	this.stam = 0;
	this.skills = {};
  }
}

class Player extends Character {
	constructor(name) {
		super(name, 't_player');
	}
}

class Npc extends Character {
	constructor(name) {
		super(name, 't_npc');
	}	
}

class Monster extends Character {
	constructor(name) {
		super(name, 't_monster');
	}	
}
var skills = {
	swordmanship: 0,
	parrying: 0
}

class Character {
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
	this.luk = 0;
  }
}

class Player extends Character {
	constructor(name) {
		super(name, 't_player');
		this.str = 100;
		this.int = 100;
		this.dex = 100;
		this.hits = 100;
		this.mana = 100;
		this.stam = 100;
		this.skills.swordmanship = 100;
		this.skills.parrying = 100;
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
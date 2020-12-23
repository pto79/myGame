class Item {
  constructor(name, owner, type) {
    this.name = name;
	this.uid = Math.random().toString(36).substr(2, 9);
	this.link = owner;
	this.type = type;
	this.value = 1;
	this.description = '';
  }
}

class Weapon extends Item {
	constructor(name, power, durability, owner) {
		super(name, owner, 'i_weapon');
		this.power = power;
		this.durability = durability;
		this.value = 10;
	}
	
	use() {
		this.durability = this.durability - 1;
	}
}
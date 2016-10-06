/**
 * @author soean / https://github.com/sonst/
 */
var EnviType = new EnviTypeImpl();

function EnviTypeImpl(){
  this.Building = new EnumDefBuilding();
  this.Way = new EnumDefWay();
}

function EnumDefBuilding(){
  this.NORMAL   = 'Type.Building.NORMAL';
  this.BAR      = 'Type.Building.BAR';
  this.OFFICIAL = 'Type.Building.NORMAL';
  this.SIGHT    = 'Type.Building.SIGHT';
};

function EnumDefWay(){
  this.PEDESTRIAN = 'Type.Way.PEDESTRIAN';
  this.CYCLE      = 'Type.Way.CYCLE';
  this.VEHICLE    = 'Type.Way.VEHICLE';
  this.PEDESTRIAN = 'Type.Way.PEDESTRIAN';
  this.SHIPPING   = 'Type.Way.SHIPPING';
};

function EnumDefPoi(){

};

module.exports = EnviType;

/* This agent exchange position if position is already occuped
 */

class Hunter extends Agent {

  constructor(x, y, env, style) {
    style = "url('../images/hunter.gif')";
    super(x, y, env, style);
  };

  decide() {
    if(! (this._env.getTick() % this.constructor.speedModulo )) {
      var around = this._env.getAround(this._pos);
      var free = around.free;
      var min = this._env._plan[this._pos.x][this._pos.y].distance;
      var positionMin = this._pos;
      for (var index in free) {
        var position = free[index];
        if (!min) {
          min = this._env._plan[position.x][position.y].distance;
        }
        else {
          if (this._env._plan[position.x][position.y].distance < min) {
            min = this._env._plan[position.x][position.y].distance;
            positionMin = position;
          }
        }
      }
      this._move(positionMin);
    }
  };

  _move(pos) {
    this._env.moveAgent(this, pos);
    this.lastPos = this._pos;
    this._pos = pos;
  };
}

Hunter.speedModulo = config.hunter.speedModulo || 3;

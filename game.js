"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RobotInAGrid =
/*#__PURE__*/
function () {
  function RobotInAGrid(nbRows, nbColumns, forbiddenCells) {
    _classCallCheck(this, RobotInAGrid);

    this.nbRows = nbRows;
    this.nbColumns = nbColumns;
    this.generateGrid(forbiddenCells);
  }

  _createClass(RobotInAGrid, [{
    key: "generateGrid",
    value: function generateGrid() {
      var _this = this;

      var forbiddenCells = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var rows = new Array(this.nbRows).fill(null);
      rows = rows.map(function (_) {
        return new Array(_this.nbColumns + 1).fill(1);
      }); // add right and bottom padding

      rows.forEach(function (row) {
        return row[_this.nbColumns] = 0;
      });
      rows.push(new Array(this.nbColumns + 1).fill(0)); // add forbidden cells

      forbiddenCells.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            x = _ref2[0],
            y = _ref2[1];

        return rows[y][x] = 0;
      });
      this.grid = rows;
    }
  }, {
    key: "isTravalableCell",
    value: function isTravalableCell(x, y) {
      return Boolean(this.grid[y][x]);
    }
  }, {
    key: "findPath",
    value: function findPath() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (!this.isTravalableCell(x, y)) {
        return null;
      }

      path = [].concat(_toConsumableArray(path), [[x, y]]);

      if (this.isFinishCell(x, y)) {
        return path;
      }

      var rightPath = this.findPath(x + 1, y, path);
      var bottomPath = this.findPath(x, y + 1, path);

      if (rightPath && bottomPath) {
        return rightPath.length < bottomPath.length ? rightPath : bottomPath;
      } else if (rightPath) {
        return rightPath;
      } else {
        return bottomPath;
      }
    }
  }, {
    key: "isFinishCell",
    value: function isFinishCell(x, y) {
      return y === this.nbRows - 1 && x === this.nbColumns - 1;
    }
  }]);

  return RobotInAGrid;
}();

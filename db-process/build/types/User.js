"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(object) {
        this.id = object.id;
        this.name = object.name;
        this.email = object.email;
        this.group = object.group;
    }
    /**
     * Partial update with the values in the user passed by parameter.
     * @param user with data used to update this user.
     * @returns this with the update values.
     */
    User.prototype.update = function (user) {
        if (user.id) {
            this.id = user.id;
        }
        if (user.name) {
            this.name = user.name;
        }
        if (user.email) {
            this.email = user.email;
        }
        if (user.group) {
            this.group = user.group;
        }
        return this;
    };
    return User;
}());
exports["default"] = User;
//# sourceMappingURL=User.js.map
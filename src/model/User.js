class User {
    constructor( obj ) {
        this.userId = null;
        this.name = obj.name;
        this.emailId = obj.emailId;
        this.contactNo = obj.contactNo;
        this.password = obj.password;
    }
}
module.exports = User;
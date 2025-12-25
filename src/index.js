function hasAdminAccess(user) {
    return user.permission === "ADMIN";
}
/* TEST */
function assert(condition, message) {
    if (!condition) {
        throw new Error("❌ " + message);
    }
}
var adminUser = {
    id: "1",
    name: "Admin",
    email: "admin@test.com",
    birthDay: new Date("2000-01-01"),
    permission: "ADMIN",
};
assert(hasAdminAccess(adminUser) === true, "ADMIN should have access");
var normalUser = {
    id: "2",
    name: "User",
    email: "user@test.com",
    birthDay: new Date("2000-01-01"),
    permission: "USER",
};
assert(hasAdminAccess(normalUser) === false, "USER should not have access");
console.log("✅ All tests passed");

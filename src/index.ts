type Permission = "ADMIN" | "USER" | "GUEST";

interface User{
    id: string,
    name: string,
    email: string,
    birthDay: Date,
    permission: Permission
}

function hasAdminAccess(user: User): boolean{
    return user.permission === "ADMIN";
}

/* TEST */

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error("❌ " + message)
  }
}

const adminUser: User = {
  id: "1",
  name: "Admin",
  email: "admin@test.com",
  birthDay: new Date("2000-01-01"),
  permission: "ADMIN",
}

assert(hasAdminAccess(adminUser) === true, "ADMIN should have access")

const normalUser: User = {
  id: "2",
  name: "User",
  email: "user@test.com",
  birthDay: new Date("2000-01-01"),
  permission: "USER",
}

assert(hasAdminAccess(normalUser) === false, "USER should not have access")

console.log("✅ All tests passed")

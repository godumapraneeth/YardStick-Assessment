export function requireRole(user,role){
    if(!user) return false;
    return user.role===role;
}
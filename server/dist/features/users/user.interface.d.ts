export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}
export type UserResponse = Omit<User, 'password'>;
//# sourceMappingURL=user.interface.d.ts.map
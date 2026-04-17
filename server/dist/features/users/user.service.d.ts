import { User } from './user.interface';
export declare class UserService {
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
    create(user: User): Promise<User>;
    private getUsers;
}
//# sourceMappingURL=user.service.d.ts.map
import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";
import bcrypt from "bcrypt";
import { IUser, IUserRepository } from "../../interfaces/userInterface";
import { queryWithLogging } from "./utils";

export class MySQLUserRepository implements IUserRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async findAll(): Promise<IUser[]> {
        const [rows] = await queryWithLogging<RowDataPacket[]>(
            this.pool,
            "SELECT id, name, email, role FROM users"
        );
        return rows as IUser[];
    }

    async findById(id: string): Promise<IUser | null> {
        const [rows] = await queryWithLogging<(IUser & RowDataPacket)[]>(
            this.pool,
            "SELECT id, name, email, role, password FROM users WHERE id = ?",
            [id]
        );
        return rows[0] || null;
    }


    async findByEmail(email: string): Promise<IUser | null> {
        const [rows] = await queryWithLogging<(RowDataPacket & IUser)[]>(
            this.pool,
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        return rows[0] || null;
    }

    async create(user: Omit<IUser, "id">): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const [result] = await queryWithLogging<ResultSetHeader>(
            this.pool,
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [user.name, user.email, hashedPassword, user.role]
        );

        const insertId = result.insertId;
        return {
            id: insertId.toString(),
            name: user.name,
            email: user.email,
            password: hashedPassword,
            role: user.role,
        };

    }
}

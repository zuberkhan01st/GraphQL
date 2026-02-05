import { User } from '../models/User';

export class UserService {
    
    static async getAllUsers() {
        try {
            return await User.find()
                .sort({ createdAt: -1 })
                .lean();
        } catch (error) {
            throw new Error(`Failed to get users: ${error}`);
        }
    }

    static async getUserById(id: string) {
        try {
            return await User.findById(id).lean();
        } catch (error) {
            throw new Error(`Failed to get user: ${error}`);
        }
    }

    static async createUser(name: string, email: string) {
        try {
            const user = new User({ name, email });
            return await user.save();
        } catch (error: any) {
            if (error.code === 11000) {
                throw new Error('Email already exists');
            }
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }

    static async updateUser(id: string, name?: string, email?: string) {
        try {
            return await User.findByIdAndUpdate(
                id,
                { ...(name && { name }), ...(email && { email }) },
                { new: true, runValidators: true }
            ).lean();
        } catch (error: any) {
            if (error.code === 11000) {
                throw new Error('Email already exists');
            }
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    static async deleteUser(id: string) {
        try {
            const result = await User.findByIdAndDelete(id);
            return !!result;
        } catch (error) {
            throw new Error(`Failed to delete user: ${error}`);
        }
    }

    static async getUserByEmail(email: string) {
        try {
            return await User.findOne({ email }).lean();
        } catch (error) {
            throw new Error(`Failed to find user by email: ${error}`);
        }
    }
}

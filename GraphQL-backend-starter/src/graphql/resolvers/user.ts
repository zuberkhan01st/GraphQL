import { UserService } from "../../services/user.service";

export const userResolvers = {
    Query:{
        users : ()=> UserService.getAllUsers(),
        user: (_: any, args: {id: string}) => UserService.getUserById(args.id)
    }
    
}


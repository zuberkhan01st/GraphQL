export interface User{
    id: string;
    name: string;
    email: string;
}

export interface Post{
    id: string;
    title: string;
    content: string;
    authorId: string;
}

export interface CartItem{
    id: string;
    productId: string;
    quantity: number;
    userId: string;
}

export interface Context {
    user?: User;
}
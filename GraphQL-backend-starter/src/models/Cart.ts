import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    productId: string;
    quantity: number;
    price?: number; // Optional price field
    createdAt: Date;
    updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Reference to User model for population
            required: [true, 'User ID is required'],
            index: true,
        },
        productId: {
            type: String,
            required: [true, 'Product ID is required'],
            trim: true,
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be at least 1'],
            max: [1000, 'Quantity cannot exceed 1000'],
            default: 1,
        },
        price: {
            type: Number,
            min: [0, 'Price cannot be negative'],
        },
    },
    {
        timestamps: true,
        
    }
);

// Compound indexes for better performance
CartItemSchema.index({ userId: 1, productId: 1 }); // For finding user's specific product
CartItemSchema.index({ userId: 1, createdAt: -1 }); // For sorting user's cart by date

// Pre-save middleware
CartItemSchema.pre<ICartItem>('save', function (next) {
    // Example: Ensure quantity is always positive
    if (this.quantity < 1) {
        this.quantity = 1;
    }
   
});

// Instance methods
CartItemSchema.methods.updateQuantity = function (newQuantity: number) {
    this.quantity = newQuantity;
    return this.save();
};

// Static methods
CartItemSchema.statics.findByUserId = function (userId: string) {
    return this.find({ userId });
};

export const CartItem = mongoose.model<ICartItem>('CartItem', CartItemSchema);
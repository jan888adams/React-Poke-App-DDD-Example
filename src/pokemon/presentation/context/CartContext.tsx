import { createContext } from "react";
import { CartService } from "../../../pokemon/application/services/CartService";

export const CartContext = createContext<CartService | null>(null);

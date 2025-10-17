import { createContext } from "react";
import { EventEmitter } from "../../../shared/application/events/EventEmitter";
import { CartEvent } from "../../application/events/CartEvent";

export const CartContext = createContext<EventEmitter<CartEvent> | null>(null);

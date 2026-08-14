import { Message   } from "../model/user";

export interface ApiResponse{
    success: boolean;
    message: String;
    isAcceptingMessages?:boolean
    messages?: Array<Message>
}
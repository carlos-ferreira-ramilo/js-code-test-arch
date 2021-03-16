import { Socket } from "socket.io";

export default class DbInstanceDto {
  id: string;
  socket: Socket;
  up: boolean;
  secondary: Socket;

  constructor(id: string, socket: Socket, up: boolean, secondary: Socket) {
    this.id = id;
    this.socket = socket;
    this.up = up;
    this.secondary = secondary;
  }
}

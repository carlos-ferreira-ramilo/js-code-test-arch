import { Socket } from "socket.io";

export default class DbInstanceDto {
  id: String;
  socket: Socket;
  up: boolean;

  constructor(id: String, socket: Socket, up: boolean) {
    this.id = id;
    this.socket = socket;
    this.up = up;
  }
}

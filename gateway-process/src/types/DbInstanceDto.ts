import { Socket } from "socket.io";

export default class DbInstanceDto {
  constructor(
    public id: string,
    public socket: Socket,
    public up: boolean,
    public secondary: Socket
  ) {
    this.id = id;
    this.socket = socket;
    this.up = up;
    this.secondary = secondary;
  }
}

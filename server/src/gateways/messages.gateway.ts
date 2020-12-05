import { Logger } from "@nestjs/common";
import { WebSocketGateway } from "@nestjs/websockets/decorators/socket-gateway.decorator";
import { SubscribeMessage } from "@nestjs/websockets/decorators/subscribe-message.decorator";
import { OnGatewayDisconnect } from "@nestjs/websockets/interfaces/hooks/on-gateway-disconnect.interface";
import { Socket } from "socket.io";


@WebSocketGateway()
export class MessagesGateway implements OnGatewayDisconnect {

  nicknames: Map<string, string> = new Map();

  handleDisconnect(client: Socket) {
    client.server.emit('users-changed', { user: this.nicknames[client.id], event: 'left' });
    this.nicknames.delete(client.id);
  }

  @SubscribeMessage('set-nickname')
  setNickname(client: Socket, nickname: string) {
    this.nicknames[client.id] = nickname;
    Logger.log(client.id + ' aka ' + this.nicknames[client.id] + ' joins the room');
    client.server.emit('users-changed', { user: nickname, event: 'joined' });
  }

  @SubscribeMessage('add-message')
  addMessage(client: Socket, message) {
    Logger.log(client.id + ' aka ' + this.nicknames[client.id] + ' sends: ' + message.text);
    client.server.emit('message', { text: message.text, from: this.nicknames[client.id], created: new Date() });
  }
}